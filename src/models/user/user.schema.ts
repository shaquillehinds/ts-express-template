import mongoose from "mongoose";
import { IUser, IUserMethods, UserModel } from "./user.types";

const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, maxlength: 15 },
    image: { type: String, required: true },
    password: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        delete ret.password;
      },
    },
    toObject: {
      transform: (_, ret) => {
        delete ret.password;
      },
    },
  }
);

export default userSchema;
