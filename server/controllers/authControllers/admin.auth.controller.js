import Admin from "../../models/admin.model.js";
import { errorHandler } from "../../utils/errorHandler.js";

export const login = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {}
};

export const register = async (req, res, next) => {
  try {
  } catch (error) {}
};
