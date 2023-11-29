import { Model } from "mongoose";

export type UserModel = Model<IUser, {}, IUserMethods>;

export interface IUserMethods {
  generateAuthToken(): Promise<string>;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
}
