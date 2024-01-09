import mongoose from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once("open", () => console.log("Mongo is showing love 💚"));

app.listen(PORT, () => {
  console.log(`Server chilling on port ${PORT} 🏢`);
  process.env.APP_URI &&
    console.log(`Frontend vibing at ${process.env.APP_URI}`);
});
