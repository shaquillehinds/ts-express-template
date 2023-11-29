import { config } from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import User from "../../models/user/user";
import {
  CreateUserRequest,
  LoginUserRequest,
  UpdateUserRequest,
} from "./user.request";

config();

export const auth = async (
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
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send(errMsg(error));
  }
};
export const createUser = async (req: CreateUserRequest, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ message: errMsg(error) });
  }
};

export const loginUser = async (req: LoginUserRequest, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      res.status(400).send("Invalid login credentials");
    } else {
      const token = await user.generateAuthToken();
      res.json({ user, token });
    }
  } catch (error) {
    res.status(400).json({ message: errMsg });
  }
};

export const updateUser = async (req: UpdateUserRequest, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) throw new Error("User not found");
    const updates = Object.keys(req.body) as unknown as (keyof User)[];
    if (JSON.stringify(user._id) === JSON.stringify(req.user?._id)) {
      updates.forEach((update) => (user[update] = req.body[update]));
      await user.save();
      res.json(user);
    } else {
      console.log(user._id, req.user?._id);
      throw new Error("You are not authorized to change another user");
    }
  } catch (error) {
    res.status(400).json({ message: errMsg(error) });
  }
};

export const deleteUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    await req.user?.deleteOne();
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ message: errMsg(error) });
  }
};
