import { Request } from "express";

export default function isTestRequest(req: Request) {
  const isPostman = req.headers["user-agent"]
    ?.toLowerCase()
    .includes("postman");
  const isTestEnv = process.env.NODE_ENV === "test";
  const isProdEnv = process.env.NODE_ENV === "production";

  return isTestEnv || (!isProdEnv && isPostman);
}
