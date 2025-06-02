import { errorHandler } from "../utils/errorHandler.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      return next(errorHandler(401, "Unauthorized access"));
    }
    // Verify the access token
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      req.userId = decoded.id;
      req.role = decoded.role;
      console.log("Decoded token:", decoded);
      next();
    } catch (error) {
      console.log("Error verifying access token:", error);
      return next(errorHandler(401, "Unauthorized access"));
    }
  } catch (error) {
    console.log("Error in auth middleware:", error);
    next(errorHandler(500, "Internal server error"));
  }
};
