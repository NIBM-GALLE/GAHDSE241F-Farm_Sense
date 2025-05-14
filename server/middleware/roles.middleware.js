import { errorHandler } from "../utils/errorHandler.js";

export const adminMiddleware = (req, res, next) => {
  try {
    const role = req.role;
    if (!role === "main-admin") {
      return next(errorHandler(401, "Unauthorized access"));
    }
    next();
  } catch (error) {
    console.log("Error in admin middleware:", error);
    next(errorHandler(500, "Internal server error"));
  }
};
