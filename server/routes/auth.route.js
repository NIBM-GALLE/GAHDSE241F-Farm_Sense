import express from "express";
import {
  logout,
  forgetPassword,
  resetPassword,
  getUser,
  signup,
  login,
  verifyEmail,
  updateProfile,
} from "../controllers/auth.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// common auth routes
router.post("/logout", logout);
router.post("/forget-password", forgetPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/profile", authMiddleware, getUser);
router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-email", authMiddleware, verifyEmail);
router.patch("/update-profile", authMiddleware, updateProfile);

export default router;
