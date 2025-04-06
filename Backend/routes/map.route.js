import { query } from "express-validator";
import express from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import {
  getCoordinate,
  getDistanceTime,
  getAutoCompleteSuggestion,
} from "../controller/map.controller.js";
const mapRotuer = express.Router();

mapRotuer.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authUser,
  getCoordinate
);

mapRotuer.get(
  "/get-distance-time",
  query("origin").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  authUser,
  getDistanceTime
);

mapRotuer.get(
  "/get-suggestions",
  query("input").isString().isLength({ min: 3 }),
  authUser,
  getAutoCompleteSuggestion
);

export default mapRotuer;
