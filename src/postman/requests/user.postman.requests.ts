import { Item, ItemGroup } from "postman-collection";
import { headers } from "../config/headers.postman.config";
import {
  CreateUserPayload,
  LoginUserPayload,
  UpdateUserPayload,
} from "../../controllers/user/user.requests.types";
import { userEmail, userId } from "../config/constants.postman.config";
import createTestEvent from "../events";
import { createUserEvent, loginUserEvent } from "../events/user.postman.events";

const createUserPayload: Partial<CreateUserPayload> = {
  _id: userId,
  firstName: "Jane",
  lastName: "Dawson",
  email: userEmail,
  password: "testing1234",
  image:
    "https://storage.googleapis.com/path-ai/profilePictures/profilePictureUrl",
};
export const createUserRequest = new Item({
  name: "Create User",
  request: {
    header: headers,
    url: `{{apiUri}}/user`,
    method: "POST",
    body: { mode: "raw", raw: JSON.stringify(createUserPayload) },
  },
  event: [createTestEvent(createUserEvent)],
});

export const getUserRequest = new Item({
  name: "Get User",
  request: {
    header: headers,
    url: `{{apiUri}}/user`,
    method: "GET",
  },
});

const UpdateUserPayload: UpdateUserPayload = {
  firstName: "Ryan",
  lastName: "Stevens",
};
export const updateUserRequest = new Item({
  name: "Update User",
  request: {
    header: headers,
    url: `{{apiUri}}/user`,
    method: "PUT",
    body: { mode: "raw", raw: JSON.stringify(UpdateUserPayload) },
  },
});

export const deleteUserRequest = new Item({
  name: "Delete User",
  request: {
    header: headers,
    url: `{{apiUri}}/user`,
    method: "DELETE",
  },
});

const loginUserPayload: Partial<LoginUserPayload> = {
  email: userEmail,
  password: "testing1234",
};
export const loginUserRequest = new Item({
  name: "Login User",
  request: {
    header: headers,
    url: `{{apiUri}}/user/login`,
    method: "POST",
    body: { mode: "raw", raw: JSON.stringify(loginUserPayload) },
  },
  event: [createTestEvent(loginUserEvent)],
});

const userGroup = new ItemGroup({
  name: "User Endpoints",
  item: [
    getUserRequest,
    createUserRequest,
    updateUserRequest,
    deleteUserRequest,
    loginUserRequest,
  ],
});

export default userGroup;
