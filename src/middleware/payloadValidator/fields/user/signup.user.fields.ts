export const userSignupFields = [
  "email",
  "phone",
  "firstName",
  "lastName",
  "password",
] as const;

export type UserSignupFields = (typeof userSignupFields)[number];
