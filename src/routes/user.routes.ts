import { Router } from "express";
import * as userController from "@controllers/user/user.controller";
import userAuth from "@src/middleware/user.auth.middleware";
import upload from "@src/middleware/upload/upload.middleware";
import { pathAIBucket } from "@utils/sdks";
import payloadValidator from "@src/middleware/payloadValidator/payloadValidator.middleware";
import userEmailValidator from "@src/middleware/payloadValidator/validators/user/email.user.validator";
import phoneValidator from "@src/middleware/payloadValidator/validators/user/phone.user.validator";
import {
  UserSignupFields,
  userSignupFields,
} from "@src/middleware/payloadValidator/fields/user/signup.user.fields";
import { userUpdateFields } from "@src/middleware/payloadValidator/fields/user/update.user.fields";

const signUploadHandler = upload({
  middleware: [
    payloadValidator<UserSignupFields>({
      validators: [userEmailValidator, phoneValidator],
      fields: userSignupFields,
      required: ["email", "firstName", "lastName"],
    }),
  ],
  fields: [{ name: "image" }],
  bucket: pathAIBucket,
});

const userRoutes = Router();

userRoutes
  .route("/")
  .post(signUploadHandler, userController.createUser)
  .get(userAuth, userController.getUser)
  .delete(userAuth, userController.deleteUser)
  .put(
    userAuth,
    upload({
      fieldName: "image",
      bucket: pathAIBucket,
      middleware: [payloadValidator({ fields: userUpdateFields })],
    }),
    userController.updateUser
  );
userRoutes.route("/login").post(userController.loginUser);

export default userRoutes;
