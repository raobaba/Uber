import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser"; 
import connectDB from "./config/db.js";
import userRouter from "./routes/user.route.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
connectDB();
app.use('/api/v1/user',userRouter)
app.get("/", (req, res) => {
  res.send("Server is Running! 🚀");
});

export default app;
