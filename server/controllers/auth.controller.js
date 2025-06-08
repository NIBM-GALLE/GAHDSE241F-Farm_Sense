import { errorHandler } from "../utils/errorHandler.js";
import Admin from "../models/admin.model.js";
import Farmer from "../models/farmer.model.js";
import VisitAgent from "../models/visit_agent.model.js";
import SubCenterAdmin from "../models/sub_admin.model.js";
import ResearchDivisionAdmin from "../models/research_admin.model.js";
import ResearchDivision from "../models/research_divisions.model.js";
import SubCenter from "../models/sub_center.model.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/mailTrapEmail.js";
import dotenv from "dotenv";
import { generateAccessAndRefreshTokens } from "../utils/jwtTokens.js";
import {
  generateOtp,
  userWithoutPassword,
  storeTokensAsCookies,
  generatePasswordResetToken,
  findUser,
} from "../utils/helperFunctions.js";
dotenv.config();

export const getUser = async (req, res, next) => {
  try {
    const id = req.userId;
    const role = req.role;

    const user = await findUser({ _id: id, role: role });
    if (!user) {
      return next(errorHandler(400, "User does not exist"));
    }

    const sanitizedUser = userWithoutPassword(user);
    if (user.researchDivisionId) {
      const researchDivision = await ResearchDivision.findById(
        user.researchDivisionId
      );
      if (researchDivision) {
        sanitizedUser.researchDivision = {
          id: researchDivision._id,
          name: researchDivision.name,
        };
      }
    }

    if (user.subCenterId) {
      const subCenter = await SubCenter.findById(user.subCenterId);
      if (subCenter) {
        sanitizedUser.subCenter = {
          id: subCenter._id,
          name: subCenter.name,
        };
      }
    }

    res.status(200).json({
      success: true,
      user: sanitizedUser,
    });
  } catch (error) {
    console.log("Error in get user:", error);
    next(errorHandler(500, "Internal server error"));
  }
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
      verificationTokenExpiresAt: Date.now() + 3600000, // 1 hour
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
      message: "Signup successful!, please verify your email",
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
      return next(errorHandler(400, "Please provide verification code"));
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
    user.verificationTokenExpiresAt = undefined;

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

export const updateProfile = async (req, res, next) => {
  try {
    const { name, contactNumber, image } = req.body;
    if (!name && !contactNumber && !image) {
      return next(
        errorHandler(400, "Please provide at least one field to update")
      );
    }
    if (
      contactNumber &&
      (contactNumber.length < 10 || contactNumber.length > 15)
    ) {
      return next(
        errorHandler(400, "Contact number must be between 10 and 15 characters")
      );
    }
    const user = await findUser({ _id: req.userId, role: req.role });
    if (!user) {
      return next(errorHandler(400, "User does not exist"));
    }

    user.name = name || user.name;
    user.contactNumber = contactNumber || user.contactNumber;
    user.image = image || user.image;

    await user.save();
    const sanitizedUser = userWithoutPassword(user);
    res.status(200).json({
      message: "Profile updated successfully",
      user: sanitizedUser,
    });
  } catch (error) {
    console.log("Error in update profile:", error);
    next(errorHandler(500, "Internal server error"));
  }
};
