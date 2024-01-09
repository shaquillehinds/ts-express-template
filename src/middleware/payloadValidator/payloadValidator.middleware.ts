import { NextFunction, Request, Response } from "express";
import { PayloadValidatorProps, Validator } from "./payloadValidator.types";

/**
 * Validates fields on req.body, if sending a multipart form-data then you need to process the request with multer first.
 * I have an upload middleware that also takes its own middleware before it uploads to a bucket.
 * You can pass this function as a middleware to that upload middleware as well.
 * Even though the middleware is called upload, it's just multer behind the scenes processing form-data and it only uploads when it's told to.
 */
export default function payloadValidator<Fields extends string>({
  validators,
  fields,
  required,
}: PayloadValidatorProps<Fields>) {
  const fieldsHash: { [field: string]: boolean } = fields.reduce(
    (prev, curr) => ({ ...prev, [curr]: true }),
    {}
  );

  const requiredHash: { [field: string]: boolean } =
    required?.reduce((prev, curr) => ({ ...prev, [curr]: true }), {}) || {};

  const validatorsHash: { [field: string]: Validator<Fields> } =
    validators?.reduce((prev, curr) => ({ ...prev, [curr.field]: curr }), {}) ||
    {};

  return async (req: Request, res: Response, next: NextFunction) => {
    let requiredCount = 0;
    const tempRequiredHash = Object.assign({}, requiredHash);
    for (const f in req.body) {
      const field = f as Fields;
      if (!fieldsHash[field]) {
        const message = `The field: ${field}, is not allowed`;
        const body = { message, field };
        sendErrRes({ req, res, error: message, body });
        return;
      }
      const validator = validatorsHash[field];
      if (validator) {
        const { isFieldValueValid, message } = validator;
        if (!(await isFieldValueValid(req.body[field]))) {
          const body = { message, field };
          sendErrRes({ req, res, error: message, body });
          return;
        }
      }
      if (requiredHash[field] && req.body[field]) {
        requiredCount++;
        delete tempRequiredHash[field];
      }
    }
    if ((required?.length || 0) !== requiredCount) {
      const missingFields = Object.keys(tempRequiredHash);
      const message = `The field(s): ${missingFields.toString()}, ${
        missingFields.length > 1 ? "are" : "is"
      } required`;
      const body = { message, field: missingFields[0] };
      sendErrRes({ req, res, error: message, body });
      return;
    }
    next();
  };
}
