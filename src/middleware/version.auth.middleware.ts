import { NextFunction, Request, Response } from "express";

const versionAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const version = req.header("version");
    if (
      process.env.VERSION &&
      !process.env.VERSION.split(",").includes(version!)
    )
      throw new Error("Version mismatch, please update");
    next();
  } catch (error) {
    sendErrRes({
      req,
      error,
      res,
      code: 401,
      labels: { type: "Request Middleware" },
    });
  }
};

export default versionAuth;
