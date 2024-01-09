import "@src/utils/global";
import "@src/utils/sdks";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import userRoutes from "./routes/user.routes";
import envIcon from "./utils/envIcon";
import versionAuth from "./middleware/version.auth.middleware";
import webhookRoutes from "./routes/webhook.routes";

const app = express();

const pubDir = path.join(__dirname, "../public");

app.use(cors({ exposedHeaders: [] }));

/* istanbul ignore next */
app.use("/webhook", webhookRoutes);

app.use(express.static(pubDir));
app.use(express.json());
/* istanbul ignore next */
if (process.env.NODE_ENV !== "test") app.use(morgan("combined"));

app.use(versionAuth);
app.use("/user", userRoutes);

console.log(
  `Server running for ${process.env.NODE_ENV} ${envIcon(process.env.NODE_ENV)}`
);

console.log(`Allowed version(s): ${process.env.VERSION || "any"} ✅`);

export default app;
