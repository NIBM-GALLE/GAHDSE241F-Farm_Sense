import crypto from "crypto";
import Admin from "../models/admin.model.js";
import Farmer from "../models/farmer.model.js";
import VisitAgent from "../models/visit_agent.model.js";
import SubCenterAdmin from "../models/sub_admin.model.js";
import ResearchDivisionAdmin from "../models/research_admin.model.js";

// generate random password
export const generateRandomPassword = (length = 8) => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

// generate 6 digit otp to verify email
export const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
};

// return user without password
export const userWithoutPassword = (user) => {
  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

// store tokens as cookies
export const storeTokensAsCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

//helper fucntions
export const generatePasswordResetToken = () => {
  // Generate a random token for password reset
  const token = crypto.randomBytes(32).toString("hex");
  return token;
};

// find user by email , token or id
export const findUser = async (query) => {
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
    user = await model.findOne(query);
    if (user) break; // Exit loop if user is found
  }

  return user; // Return the user or null if not found
};
