import "./utils/global";
import mongoose from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once("open", () => console.log("Mongo is showing love"));

app.listen(PORT, () => {
  console.log(`We in the building ${PORT}`);
});
