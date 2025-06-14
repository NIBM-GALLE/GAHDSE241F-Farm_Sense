import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  updateProfile,
  createCase,
  getCases,
  getCaseById,
  createReport,
  getSubCenters,
} from "../controllers/farmer.controller.js";

const router = express.Router();

router.patch("/update-profile", authMiddleware, updateProfile);
router.post("/case", authMiddleware, createCase);
router.get("/cases", authMiddleware, getCases);
router.get("/case/:id", authMiddleware, getCaseById);
router.post("/report", authMiddleware, createReport);
router.get("/sub-centers", authMiddleware, getSubCenters);

export default router;
