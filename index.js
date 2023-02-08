import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import movieRoutes from "./routes/movie.router.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("mongoDB Connected");
} catch (error) {
  console.log(error);
}

app.get("/", (req, res) => {
  res.send("Hello from express app");
});

app.use("/movies", movieRoutes);

const PORT = 4000 || process.env.PORT;
app.listen(PORT, () => {
  console.log("listning on port " + PORT);
});
