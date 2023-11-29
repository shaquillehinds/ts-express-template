import { Request } from "express";

export type CreateUserRequest = Request<
  {},
  {},
  Pick<User, "email" | "name" | "password">
>;

export type LoginUserRequest = Request<
  {},
  {},
  Pick<User, "email" | "password">
>;

export type UpdateUserRequest = AuthenticatedRequest<{ id: string }, {}, User>;
