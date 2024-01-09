import { Request, Response } from "express";

export async function exampleWebHookController(req: Request, res: Response) {
  try {
    res.status(200).send("Example Webhook Response");
  } catch (error) {
    console.log(error);
    sendErrRes({ req, res, error });
  }
}
