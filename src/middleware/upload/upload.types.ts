import { Bucket } from "@google-cloud/storage";
import { Request, RequestHandler, Response } from "express";
import { Field } from "multer";

export type UploadParams = {
  fieldName?: string;
  maxCount?: number;
  fields?: Field[];
  middleware?: RequestHandler[];
  bucketSubDir?: string;
  bucket: Bucket;
};

export type BucketHandlerParams = { subDirectory?: string; bucket: Bucket };

export type BucketUploadParams = {
  req: Request;
  files: Express.Multer.File[];
  bucket: Bucket;
  subDirectory?: string;
  bodyFieldName?: string;
};

export type MulterHandlerParams = {
  fieldName?: string;
  maxCount?: number;
  fields?: Field[];
};

export type DocxToPdfHandlerParams = {
  fieldName: string;
  type: "single" | "array" | "fields";
};

export type PDFThumbnailHandlerParams = {
  bucket: Bucket;
} & DocxToPdfHandlerParams;

export type PDFToTextHandlerParams = DocxToPdfHandlerParams;

export type MulterFilesHandlerParams<FileHandlerResult> = {
  req: Request;
  res: Response;
  fileHandler: (path: string) => FileHandlerResult;
  fileResultHandler: (
    result: Awaited<FileHandlerResult>,
    originalFile: Express.Multer.File
  ) => Promise<void>;
  timer?: string;
  isCorrectFile: (file: Express.Multer.File) => boolean;
} & DocxToPdfHandlerParams;
