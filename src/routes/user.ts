import { Router } from "express";
import * as userController from "@controllers/user";

const userRoutes = Router();

userRoutes.route("/").post(userController.createUser);
userRoutes.route("/login").post(userController.loginUser);
userRoutes
  .route("/:id")
  .put(userController.auth, userController.updateUser)
  .delete(userController.auth, userController.deleteUser);

export default userRoutes;
