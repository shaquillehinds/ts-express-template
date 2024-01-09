import { HttpRequest, Logging } from "@google-cloud/logging";
import { google } from "@google-cloud/logging/build/protos/protos";
import { LogEntry } from "@google-cloud/logging/build/src/entry";
import { Request, Response } from "express";

const logging = new Logging({
  credentials: JSON.parse(process.env.SERVICE_ACCOUNT_CREDENTIALS),
});

const log = logging.log("core-restful-service-gateway");

export type GLogOpts = {
  severity?: keyof typeof google.logging.type.LogSeverity;
  json?: google.protobuf.IStruct;
  labels?: { [key: string]: string };
  httpRequest?: HttpRequest;
};

const glog = (text: string, opts?: GLogOpts) => {
  const metadata: LogEntry = {
    resource: {
      type: "cloud_run_revision",
      labels: {
        service_name: "Core Restful Service Gateway",
        revision_name: "Core Restful Service Gateway",
      },
    },
    severity: opts?.severity,
    jsonPayload: opts?.json,
    httpRequest: opts?.httpRequest,
    labels: { service: "Core Restful Service Gateway", ...opts?.labels },
  };

  const entry = log.entry(metadata, text);
  log.write(entry).catch((err) => console.error(errMsg(err)));
};

export function glogRequest({
  error,
  req,
  labels,
  statusCode,
}: {
  error: unknown;
  req: Request;
  res: Response;
  statusCode?: number;
  labels?: { [key: string]: string };
}) {
  const message = errMsg(error);
  if (process.env.NODE_ENV === "test") return;
  const cleanBody = req.body.password
    ? { ...req.body, password: "REDACTED" }
    : req.body;
  let headers = req.headers || req.header || req.rawHeaders;
  if (typeof headers === "string") headers = JSON.parse(headers);
  if (headers.authorization)
    headers.authorization = headers.authorization.slice(0, 15) + "...REDACTED";
  glog(message, {
    severity: "ERROR",
    labels: { type: "Request", ...labels },
    httpRequest: {
      protocol: req.protocol + "/" + req.httpVersion,
      requestMethod: req.method,
      status: statusCode,
      requestSize: parseInt(req.headers["content-length"] || ""),
      requestUrl: `[${req.headers.host}${req.originalUrl}] - ${message}`,
    },
    json: {
      fields: {
        type: { stringValue: "Request" },
        endpoint: { stringValue: req.baseUrl + req.path },
        method: { stringValue: req.method },
        headers: { stringValue: JSON.stringify(headers) },
        params: { stringValue: JSON.stringify(req.params) },
        query: { stringValue: JSON.stringify(req.query) },
        body: { stringValue: JSON.stringify(cleanBody) },
        message: { stringValue: message },
        function: { stringValue: debugLine(error) },
      },
    },
  });
}
function debugLine(error: unknown) {
  if (error instanceof Error) {
    const stack = error.stack?.split("\n")!;
    return stack
      .reduce((prev, curr) => `${prev}\n${getNameAndLine(curr)}`, "")
      .trim();
  }
  return "";
}
function getNameAndLine(frame?: string) {
  const lineNumber = frame?.split(":").reverse()[1];
  const functionName = `${frame?.split(" ")[5]} ${frame?.split(" ")[6]}`;
  if (functionName.includes("processTicks")) return "";
  return functionName + ":" + lineNumber;
}

export default glog;
