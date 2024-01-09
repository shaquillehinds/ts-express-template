export const userUpdateFields = [
  "email",
  "phone",
  "firstName",
  "lastName",
] as const;

export type UserUpdateFields = (typeof userUpdateFields)[number];
