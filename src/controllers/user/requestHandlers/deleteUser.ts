import { Response } from "express";

export async function deleteUser(req: AuthenticatedRequest, res: Response) {
  try {
    await req.user!.deleteOne();
    res.status(200).send({ user: req.user });
  } catch (error) {
    sendErrRes({ req, res, error });
  }
}
