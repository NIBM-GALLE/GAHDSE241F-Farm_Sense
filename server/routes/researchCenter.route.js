import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { researchDivisionAdminMiddleware } from "../middleware/roles.middleware.js";
import {
  getAllPlantCasesForResearchCenter,
  addCommentToPlantCaseForResearchCenter,
} from "../controllers/researchCenter.controller.js";

const router = express.Router();

router.get(
  "/plant-cases",
  authMiddleware,
  researchDivisionAdminMiddleware,
  getAllPlantCasesForResearchCenter
);

router.patch(
  "/plant-case/:id",
  authMiddleware,
  researchDivisionAdminMiddleware,
  addCommentToPlantCaseForResearchCenter
);

export default router;
