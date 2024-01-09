import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import userSchema from "./user.schema";

userSchema.pre("save", async function (next) {
  this.password && this.isModified("password")
    ? (this.password = await bcrypt.hash(this.password, 8))
    : null;
  next();
});

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.SECRET);
  return token;
};

const User = mongoose.model("User", userSchema);

export default User;
