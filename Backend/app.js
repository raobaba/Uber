import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.route.js";
import captainRouter from "./routes/captain.route.js";
import mapRouter from "./routes/map.route.js";
import rideRouter from "./routes/ride.route.js"
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

dotenv.config();

const app = express();

// Load Swagger YAML file
const swaggerDocument = YAML.load("./swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/captain", captainRouter);
app.use("/api/v1/map", mapRouter);
app.use("/api/v1/ride",rideRouter)

app.get("/", (req, res) => {
  res.send("Server is Running! 🚀");
});

export default app;
