import express from "express";
import morgan from "morgan";
import userRoutes from "./routes/user";
import path from "path";
const app = express();

// creating a static route to the public directory
const pubDir = path.join(__dirname, "../public");

app.use(express.static(pubDir));
app.use(express.json());
app.use(morgan("combined"));
app.use("/users", userRoutes);

export default app;
