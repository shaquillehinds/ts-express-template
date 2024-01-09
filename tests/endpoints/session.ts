import { IUser } from "../../src/models/user/user.types";

export interface User extends Omit<IUser, "resumes"> {
  token: string;
}
export interface TestSessionObj {
  user?: User;
  user2?: User;
}

const session: TestSessionObj = {};

export const originalValues = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  password: "password123",
};

export const version = "1.0.1";

export default session;
