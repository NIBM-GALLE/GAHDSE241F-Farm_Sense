import { errorHandler } from "../utils/errorHandler.js";
import Admin from "../models/admin.model.js";
import Farmer from "../models/farmer.model.js";
import VisitAgent from "../models/visit_agent.model.js";
import SubCenterAdmin from "../models/sub_admin.model.js";
import ResearchDivisionAdmin from "../models/research_admin.model.js";
import crypto from "crypto";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/mailTrapEmail.js";
import dotenv from "dotenv";
import { generateAccessAndRefreshTokens } from "../utils/jwtTokens.js";
dotenv.config();

//helper fucntions
const generatePasswordResetToken = () => {
  // Generate a random token for password reset
  const token = crypto.randomBytes(32).toString("hex");
  return token;
};

// find user by email , token or id
const findUser = async (query) => {
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

// store tokens as cookies
const storeTokensAsCookies = (res, accessToken, refreshToken) => {
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

// user without password
const userWithoutPassword = (user) => {
  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

// generate 6 digit otp to verify email
const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
};

export const getUser = async (req, res, next) => {
  try {
    const id = req.userId;
    const role = req.role;

    const user = await findUser({ _id: id, role: role });
    if (!user) {
      return next(errorHandler(400, "User does not exist"));
    }

    const sanitizedUser = userWithoutPassword(user);

    res.status(200).json({
      success: true,
      user: sanitizedUser,
    });
  } catch (error) {
    console.log("Error in get user:", error);
    next(errorHandler(500, "Internal server error"));
  }
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

    const user = await findUser({ email: email });
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
    const { password } = req.body;
    const { token } = req.params;
    if (!token) {
      return next(errorHandler(400, "Something went wrong"));
    }
    if (!password) {
      return next(errorHandler(400, "Please provide all fields"));
    }

    const user = await findUser({ resetPasswordToken: token });

    if (!user) {
      return next(errorHandler(400, "User does not exist"));
    }

    // Check if the token is expired
    if (user.resetPasswordExpiresAt < Date.now()) {
      return next(errorHandler(400, "Token has expired"));
    }

    // Update the password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
    await sendResetSuccessEmail(user.email, user.name, next);
    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log("Error in reset password:", error);
    next(errorHandler(500, "Internal server error"));
  }
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

export const generateAccessToken = async (req, res, next) => {
  try {
  } catch (error) {}
};

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(errorHandler(400, "Please provide all fields"));
    }
    const existingUser = await Farmer.find({ email });
    if (existingUser.length > 0) {
      return next(errorHandler(400, "User already exists"));
    }

    const newUser = new Farmer({
      email,
      password,
      verificationToken: generateOtp(),
      verificationTokenExpiresAt: Date.now() + 3600000,
    });

    newUser.save();
    await sendVerificationEmail(newUser.email, newUser.verificationToken, next);
    const { accessToken, refreshToken } = generateAccessAndRefreshTokens(
      newUser._id,
      newUser.role
    );

    const sanitizedUser = userWithoutPassword(newUser);

    storeTokensAsCookies(res, accessToken, refreshToken);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: sanitizedUser,
    });
  } catch (error) {
    console.log("Error in register  controller", error);
    next(errorHandler(500, "Internal server error"));
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(errorHandler(400, "Please provide all fields"));
    }

    const user = await findUser({ email });
    if (!user) {
      return next(errorHandler(400, "User does not exist"));
    }

    const isPasswordMatched = await user.matchPassword(password);
    if (!isPasswordMatched) {
      return next(errorHandler(400, "Invalid credentials"));
    }

    const { accessToken, refreshToken } = generateAccessAndRefreshTokens(
      user._id,
      user.role
    );

    storeTokensAsCookies(res, accessToken, refreshToken);

    const sanitizedUser = userWithoutPassword(user);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: sanitizedUser,
    });
  } catch (error) {
    console.log("Error in login  controller", error);
    next(errorHandler(500, "Internal server error"));
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const id = req.userId;
    const role = req.role;

    const { code } = req.body;
    if (!code) {
      return next(errorHandler(400, "Please provide all fields"));
    }

    const user = await findUser({ _id: id, role: role });
    if (!user) {
      return next(errorHandler(400, "User does not exist"));
    }

    // Check if the verification code is valid
    if (user.verificationToken !== code) {
      return next(errorHandler(400, "Invalid verification code"));
    }
    // Check if the token is expired
    if (user.verificationTokenExpiresAt < Date.now()) {
      return next(errorHandler(400, "Token has expired"));
    }

    // Update the user to mark email as verified
    user.isVerified = true;
    user.verificationToken = undefined;

    await user.save();
    await sendWelcomeEmail(user.email, user.name, user.createdAt, next);
    const sanitizedUser = userWithoutPassword(user);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: sanitizedUser,
    });
  } catch (error) {
    console.log("Error in verify email:", error);
    next(errorHandler(500, "Internal server error"));
  }
};
