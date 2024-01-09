import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import User from "@src/models/user/user.model";

const userAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new Error("Not authorized");
    const data = jwt.verify(token, process.env.SECRET);
    if (typeof data === "string") throw new Error("Invalid JWT payload");
    const user = await User.findOne({ _id: data._id });
    if (!user) throw new Error("User not found or invalid token");
    req.user = user;
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

export default userAuth;
