import { Response } from "express";
import { LoginUserRequest } from "../user.requests.types";
import bcrypt from "bcryptjs";
import User from "@src/models/user/user.model";

export async function loginUser(req: LoginUserRequest, res: Response) {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.warn(user);
    if (!user) throw new Error("Invalid login credentials");
    const password = req.body.password;
    if (!password) throw new Error("Please provide a password");
    if (!user.password) throw new Error("This user was signed up with OAuth");
    if (!(await bcrypt.compare(password, user.password)))
      throw new Error("Invalid login credentials");
    const token = await user.generateAuthToken();
    res.json({ user, token });
  } catch (error) {
    sendErrRes({ req, res, error });
  }
}
