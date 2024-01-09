type NODE_ENV =
  | "development"
  | "production"
  | "staging"
  | "test"
  | "dev"
  | "prod";

type SendErrResProps = {
  error: unknown;
  res: import("express").Response;
  req: import("express").Request;
  code?: number;
  body?: { [key: string | number | symbol]: any };
  labels?: { [key: string]: string };
  skipLog?: boolean;
};
