import { Storage } from "@google-cloud/storage";
export const storage = new Storage({
  credentials: JSON.parse(process.env.SERVICE_ACCOUNT_CREDENTIALS),
});

export const pathAIBucket = storage.bucket("path-ai");
