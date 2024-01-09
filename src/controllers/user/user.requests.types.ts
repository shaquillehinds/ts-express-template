import { Request } from "express";

export type CreateUserPayload = Omit<User, "_id" | "image"> & {
  image: any;
  _id?: string;
};
export type CreateUserRequest = Request<{}, {}, CreateUserPayload>;

export type LoginUserPayload = Pick<User, "email" | "password">;
export type LoginUserRequest = Request<{}, {}, LoginUserPayload>;

export type UpdateUserPayload = Partial<User> & { image?: any };
export type UpdateUserRequest = AuthenticatedRequest<
  {},
  {},
  UpdateUserPayload,
  ParsedQs
>;
