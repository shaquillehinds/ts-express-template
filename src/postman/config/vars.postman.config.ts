import { Variable } from "postman-collection";
import { userId, userJwt, version } from "./constants.postman.config";

export const apiVar = new Variable({
  id: "apiUri",
  key: "apiUri",
  value: "http://localhost:4000",
});

export const jwtVar = new Variable({
  id: "token",
  key: "jwt",
  value: userJwt,
});

export const userIdVar = new Variable({
  id: "userId",
  key: "userId",
  value: userId,
});

export const versionVar = new Variable({
  id: "version",
  key: "version",
  value: version,
});
