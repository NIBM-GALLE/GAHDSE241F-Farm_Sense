import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminMiddleware } from "../middleware/roles.middleware.js";
import {
  createSubCenter,
  createResearchCenter,
  getAllSubCenters,
  getAllResearchCenters,
  deleteResearchCenter,
  deleteSubCenter,
} from "../controllers/admin.operations.controller.js";
const router = express.Router();

router.post(
  "/create-sub-center",
  authMiddleware,
  adminMiddleware,
  createSubCenter
);

router.post(
  "/create-research-center",
  authMiddleware,
  adminMiddleware,
  createResearchCenter
);

router.get(
  "/get-all-sub-centers",
  authMiddleware,
  adminMiddleware,
  getAllSubCenters
);

router.get(
  "/get-all-research-centers",
  authMiddleware,
  adminMiddleware,
  getAllResearchCenters
);

router.delete(
  "/delete-sub-center/:subCenterId",
  authMiddleware,
  adminMiddleware,
  deleteSubCenter
);

router.delete(
  "/delete-research-center/:researchCenterId",
  authMiddleware,
  adminMiddleware,
  deleteResearchCenter
);
export default router;
