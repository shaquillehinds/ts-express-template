import { Validator } from "../../payloadValidator.types";

const phoneValidator: Validator<"phone"> = {
  field: "phone",
  message: "Phone number is invalid",
  isFieldValueValid: async (phone: string) => {
    return phone.length <= 15;
  },
};

export default phoneValidator;
