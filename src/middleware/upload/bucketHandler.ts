import { NextFunction, Request, Response } from "express";
import fs from "fs";
import { v4 } from "uuid";
import { BucketHandlerParams, BucketUploadParams } from "./upload.types";
import { glogRequest } from "@src/utils/sdks/gcpLogging";
import mimeToExt from "@src/utils/mimeToExtensionMap";

export const uploadFiles = async ({
  req,
  files,
  subDirectory,
  bucket,
  bodyFieldName = "",
}: BucketUploadParams) => {
  for (let file of files) {
    const bucketSubDir =
      process.env.NODE_ENV === "test"
        ? "tests"
        : subDirectory || file.fieldname;
    const uploaded = await bucket.upload(`${file.path}`, {
      destination: `${bucketSubDir}/${v4()}.${mimeToExt(
        file.mimetype.split("/")[1]
      )}`,
      contentType: file.mimetype,
    });
    const uri = uploaded[0].publicUrl();
    const fieldName =
      file.fieldname + (bodyFieldName ? `_${bodyFieldName}` : "");
    if (req.body[fieldName]) req.body[fieldName].push(uri);
    else req.body[fieldName] = [uri];
    fs.rmSync(file.path);
  }
};

const bucketHandler =
  ({ subDirectory, bucket }: BucketHandlerParams) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.file) {
        await uploadFiles({ req, files: [req.file], subDirectory, bucket });
      } else if (req.files) {
        if (req.files instanceof Array) {
          await uploadFiles({ req, files: req.files, subDirectory, bucket });
        } else {
          const keys = Object.keys(req.files);
          let index = 0;
          for (let key of keys) {
            await uploadFiles({
              req,
              files: req.files[key],
              subDirectory,
              bucket,
            });
            index++;
          }
        }
      }
    } catch (error) {
      glogRequest({ error, req, res, labels: { type: "Request Middleware" } });
    }
    next();
  };

export default bucketHandler;
