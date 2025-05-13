import Admin from "../../models/admin.model.js";
import { errorHandler } from "../../utils/errorHandler.js";
import { generateAccessAndRefreshTokens } from "../../utils/jwtTokens.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(errorHandler(400, "Please provide all fields"));
    }

    const existingAdmin = await Admin.find({ email });
    if (existingAdmin.length === 0) {
      return next(errorHandler(400, "Admin does not exist"));
    }

    const isPasswordMatched = await existingAdmin[0].matchPassword(password);

    if (!isPasswordMatched) {
      return next(errorHandler(400, "Invalid credentials"));
    }

    const { accessToken, refreshToken } = generateAccessAndRefreshTokens(
      existingAdmin[0]._id,
      existingAdmin[0].role
    );

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
    res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
    });
  } catch (error) {
    console.log("Error in login admin controller", error);
    next(errorHandler(500, "Internal server error"));
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return next(errorHandler(400, "Please provide all fields"));
    }
    const existingAdmin = await Admin.find({ email });
    if (existingAdmin.length > 0) {
      return next(errorHandler(400, "Admin already exists"));
    }

    const newAdmin = await Admin.create({
      name,
      email,
      password,
    });

    newAdmin.save();
    const { accessToken, refreshToken } = generateAccessAndRefreshTokens(
      newAdmin._id,
      newAdmin.role
    );

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
    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
    });
  } catch (error) {
    console.log("Error in register admin controller", error);
    next(errorHandler(500, "Internal server error"));
  }
};

export const createSubCenter = async (req, res, next) => {
  try {
  } catch (error) {}
};

export const createReaserchCenter = async (req, res, next) => {
  try {
  } catch (error) {}
};
