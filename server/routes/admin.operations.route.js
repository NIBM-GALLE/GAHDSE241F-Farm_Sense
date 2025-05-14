import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminMiddleware } from "../middleware/roles.middleware.js";
import { createSubCenter } from "../controllers/admin.operations.controller.js";
const router = express.Router();

router.post(
  "/create-sub-center",
  authMiddleware,
  adminMiddleware,
  createSubCenter
);

export default router;
