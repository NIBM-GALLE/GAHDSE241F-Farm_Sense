import { errorHandler } from "../../utils/errorHandler.js";
import Admin from "../../models/admin.model.js";
import Farmer from "../../models/farmer.model.js";
import VisitAgent from "../../models/visit_agent.model.js";
import SubCenterAdmin from "../../models/sub_admin.model.js";
import ResearchDivisionAdmin from "../../models/research_admin.model.js";
import crypto from "crypto";
import { sendPasswordResetEmail } from "../../mailtrap/mailTrapEmail.js";
import dotenv from "dotenv";
dotenv.config();

//helper fucntions
const generatePasswordResetToken = () => {
  // Generate a random token for password reset
  const token = crypto.randomBytes(32).toString("hex");
  return token;
};

export const getUser = async (req, res, next) => {
  try {
  } catch (error) {}
};

export const updateUser = async (req, res, next) => {
  try {
  } catch (error) {}
};

export const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(errorHandler(400, "Please provide all fields"));
    }

    // List of models to check
    const models = [
      Admin,
      Farmer,
      VisitAgent,
      SubCenterAdmin,
      ResearchDivisionAdmin,
    ];
    let user = null;

    // Iterate through models to find the user
    for (const model of models) {
      user = await model.findOne({ email });
      if (user) break; // Exit loop if user is found
    }

    if (!user) {
      return next(errorHandler(400, "User does not exist"));
    }

    // Generate reset token and expiration
    user.resetPasswordToken = generatePasswordResetToken();
    user.resetPasswordExpiresAt = Date.now() + 3600000; // 1 hour

    // Save the user
    await user.save();
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${user.resetPasswordToken}`;
    await sendPasswordResetEmail(user.email, resetUrl, next);

    res.status(200).json({
      success: true,
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    console.log("Error in forget password:", error);
    next(errorHandler(500, "Internal server error"));
  }
};

export const resetPassword = async (req, res, next) => {
  try {
  } catch (error) {}
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("Error in logout ", error);
    next(errorHandler(500, "Internal server error"));
  }
};
