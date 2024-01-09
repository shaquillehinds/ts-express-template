import { glogRequest } from "../sdks/gcpLogging";

export var errMsg = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === "string") {
    return error;
  } else {
    return JSON.stringify(error);
  }
};

export var sendErrRes = ({
  res,
  code = 400,
  error,
  body,
  req,
  labels,
  skipLog,
}: SendErrResProps) => {
  if (!skipLog) glogRequest({ error, req, res, statusCode: code, labels });
  res.status(code);
  res.statusMessage = errMsg(error);
  const responseBody = body || { message: res.statusMessage };
  console.error(error);
  res.send(responseBody);
};
