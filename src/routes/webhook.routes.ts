import { Router } from "express";
import * as webhookController from "@src/controllers/webhook/webhook.controller";
import express from "express";

const webhookRoutes = Router();

webhookRoutes.post(
  "/example",
  express.raw({ type: "application/json" }),
  webhookController.exampleWebHookController
);

export default webhookRoutes;
