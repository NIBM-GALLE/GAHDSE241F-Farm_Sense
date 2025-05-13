import express from "express";
import {
  logout,
  forgetPassword,
} from "../controllers/authControllers/auth.controller.js";
// admin auth routes
import adminAuthRoutes from "./authRoutes/admin.auth.route.js";

const router = express.Router();
router.use("/admin", adminAuthRoutes);

// common auth routes
router.post("/logout", logout);
router.post("/forget-password", forgetPassword);

export default router;
