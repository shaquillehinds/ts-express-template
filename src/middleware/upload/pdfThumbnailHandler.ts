import { NextFunction, Request, Response } from "express";
import fs from "fs";
import { pdf } from "pdf-to-img";
import { uploadFiles } from "./bucketHandler";
import { PDFThumbnailHandlerParams } from "./upload.types";
import multerFilesHandler from "./multerFilesHandler";

const pdfThumbnailHandler =
  ({ fieldName, type, bucket }: PDFThumbnailHandlerParams) =>
  async (req: Request, res: Response, next: NextFunction) => {
    await multerFilesHandler({
      req,
      res,
      fieldName,
      type,
      isCorrectFile: (file) => file.path.split(".")[1] === "pdf",
      fileHandler: pdf,
      fileResultHandler: async (result, originalFile) => {
        if (originalFile.path.split(".")[1] !== "pdf") return;
        for await (const page of result) {
          const pdfImgPath = `${originalFile.destination}/${
            originalFile.filename.split(".")[0]
          }.png`;
          fs.writeFileSync(pdfImgPath, page);
          const newFile = {
            buffer: page,
            fieldname: originalFile.fieldname,
            destination: `${originalFile.destination}`,
            filename: originalFile.filename,
            mimetype: "image/png",
            originalname: originalFile.originalname,
            path: pdfImgPath,
            size: page.byteLength,
            stream: fs.createReadStream(pdfImgPath),
            encoding: "",
          };
          await uploadFiles({
            req,
            files: [newFile],
            subDirectory: fieldName + "_pdf_thumbnails",
            bodyFieldName: "pdf_thumbnail",
            bucket,
          });
          break;
        }
      },
    });
    next();
  };

export default pdfThumbnailHandler;
