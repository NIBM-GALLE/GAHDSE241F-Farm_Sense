import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { researchDivisionAdminMiddleware } from "../middleware/roles.middleware.js";
import {
  getAllPlantCasesForResearchCenter,
  addCommentToPlantCaseForResearchCenter,
  updateResearchCenterDetails,
  createAdmin,
  getResearchAdmins,
  getResearchCenterDetails,
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

router.patch(
  "/update-research-center",
  authMiddleware,
  researchDivisionAdminMiddleware,
  updateResearchCenterDetails
);

router.post(
  "/create-admin",
  authMiddleware,
  researchDivisionAdminMiddleware,
  createAdmin
);

router.get(
  "/get-admins",
  authMiddleware,
  researchDivisionAdminMiddleware,
  getResearchAdmins
);

router.get(
  "/get-research-center-details",
  authMiddleware,
  researchDivisionAdminMiddleware,
  getResearchCenterDetails
);
export default router;
