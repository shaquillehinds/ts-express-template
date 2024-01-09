import { Response } from "express";
import { UpdateUserRequest } from "../user.requests.types";

export async function updateUser(req: UpdateUserRequest, res: Response) {
  try {
    const user = req.user!;
    if (req.body.image && req.body.image instanceof Array) {
      req.body.image = req.body.image[0];
    }
    Object.assign(user, req.body);
    await user.save();
    res.json(user);
  } catch (error) {
    sendErrRes({ req, res, error });
  }
}
