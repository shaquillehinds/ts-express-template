import { glogRequest } from "@src/utils/sdks/gcpLogging";
import { MulterFilesHandlerParams } from "./upload.types";

export default async function multerFilesHandler<FileHandlerResult>({
  req,
  res,
  type,
  fieldName,
  fileHandler,
  fileResultHandler,
  isCorrectFile,
  timer,
}: MulterFilesHandlerParams<FileHandlerResult>) {
  if (timer) console.time(timer);
  try {
    const docs: Awaited<FileHandlerResult>[] = [];
    let files: Express.Multer.File[] = [];
    const pushDocAndFile = async (file: Express.Multer.File) => {
      if (isCorrectFile(file)) {
        const doc = await fileHandler(file.path);
        if (doc) {
          files.push(file);
          docs.push(doc);
        }
      }
    };
    if (type === "single" && req.file && req.file.fieldname === fieldName) {
      await pushDocAndFile(req.file);
    } else if (
      type === "array" &&
      req.files instanceof Array &&
      req.files[0]?.fieldname === fieldName
    ) {
      for (let file of req.files) {
        await pushDocAndFile(file);
      }
    } else if (
      type === "fields" &&
      req.files &&
      !(req.files instanceof Array)
    ) {
      if (req.files[fieldName]) {
        for (let file of req.files[fieldName]) {
          await pushDocAndFile(file);
        }
      }
    }
    let index = 0;
    for (let doc of docs) {
      await fileResultHandler(doc, files[index]);
      index++;
    }
  } catch (error) {
    glogRequest({ error, req, res, labels: { type: "Request Middleware" } });
  }
  if (timer) console.timeEnd(timer);
}
