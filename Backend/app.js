import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is Running! 🚀");
});

export default app;
