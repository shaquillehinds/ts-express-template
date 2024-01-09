import { CreateUserRequest } from "../user.requests.types";
import mongoose from "mongoose";
import User from "@src/models/user/user.model";
import { Response } from "express";

export async function createUser(req: CreateUserRequest, res: Response) {
  try {
    const stringId = is(req.body._id);
    const _id = new mongoose.Types.ObjectId(stringId);
    if (req.body.image instanceof Array) req.body.image = req.body.image[0];
    else if (!req.body.image)
      req.body.image =
        "https://storage.googleapis.com/path-ai/profilePictures/profilePictureUrl";

    const user = new User({ ...req.body, userId: _id.toString(), _id });
    await user.save();

    const token = await user.generateAuthToken();

    res.status(201).json({ user, token });
  } catch (error) {
    sendErrRes({ req, res, error });
  }
}
