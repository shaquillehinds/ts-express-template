import multer from "multer";
import path from "path";
import { MulterHandlerParams } from "./upload.types";

const destination = path.join(__dirname, "../../uploads");

export const Multer = multer({
  storage: multer.diskStorage({
    destination,
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

export default function multerHandler(opts: MulterHandlerParams) {
  const multerHandler = opts.fields
    ? Multer.fields(opts.fields)
    : opts.maxCount && opts.fieldName
    ? Multer.array(opts.fieldName, opts.maxCount)
    : opts.fieldName
    ? Multer.single(opts.fieldName)
    : Multer.none();

  return multerHandler;
}
