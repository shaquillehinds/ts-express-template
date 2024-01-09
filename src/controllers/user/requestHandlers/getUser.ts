import { Response } from "express";

export async function getUser(req: AuthenticatedRequest, res: Response) {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    sendErrRes({ req, res, error });
  }
}
