// configured dotenv
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
// configuration of environment variables
dotenv.config();
// database configuration
connectDB();

const app = express();
// middleware configuration
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
});

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
