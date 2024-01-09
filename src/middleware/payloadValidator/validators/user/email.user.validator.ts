import User from "@src/models/user/user.model";
import { Validator } from "../../payloadValidator.types";

const userEmailValidator: Validator<"email"> = {
  field: "email",
  message: "Email is already taken",
  isFieldValueValid: async (email: string) => {
    const user = await User.findOne({ email });
    return !user;
  },
};

export default userEmailValidator;
