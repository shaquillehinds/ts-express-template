import { RequestHandler } from "express";
import multerHandler from "./multerHandler";
import bucketHandler from "./bucketHandler";
import { UploadParams } from "./upload.types";

/**
 * Uploads to disk using Multer and then uploads the files to the gcp storage bucket
 * The url of the uploaded file(s) will be attached the request body e.g req.body.<nameOfUploadField>
 * The name of the field on the body will be the same as the field name on req.file
 * The uri(s) attached will always be in the form of an array of strings
 */
export default function upload({
  fieldName,
  fields,
  maxCount,
  middleware = [],
  bucketSubDir,
  bucket,
}: UploadParams) {
  const handlers: RequestHandler[] = [
    multerHandler({ fieldName, fields, maxCount }),
    ...middleware,
    bucketHandler({ subDirectory: bucketSubDir, bucket }),
  ];
  return handlers;
}
