import { errorHandler } from "../utils/errorHandler.js";
import { findUser } from "../utils/helperFunctions.js";
import SubCenter from "../models/sub_center.model.js";

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

export const subCenterAdminMiddleware = async (req, res, next) => {
  try {
    const role = req.role;

    if (!role === "sub-center-admin") {
      return next(errorHandler(401, "Unauthorized access"));
    }
    const userId = req.userId;

    const subCenter = await SubCenter.findOne({
      admins: userId,
    });
    if (!subCenter) {
      return next(errorHandler(404, "Sub Center  not found"));
    }

    const subCenterId = subCenter._id.toString();

    if (!subCenterId) {
      return next(errorHandler(400, "Sub Center ID is required"));
    }

    req.subCenterId = subCenterId;
    next();
  } catch (error) {
    console.log("Error in sub center admin middleware:", error);
    next(errorHandler(500, "Internal server error"));
  }
};
