import { Model, ObjectId } from "mongoose";

export type UserModel = Model<IUser, {}, IUserMethods>;

export interface IUserMethods {
  generateAuthToken(): Promise<string>;
}

export interface IUser {
  _id: ObjectId;
  image: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  password?: string;
}
