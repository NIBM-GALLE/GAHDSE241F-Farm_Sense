import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { subCenterAdminMiddleware } from "../middleware/roles.middleware.js";
import {
  createVisitAgent,
  getAllVisitAgents,
  getAllPlantCasesForCenter,
  getPlantCaseById,
  assignVisitAgentToPlantCase,
  assignResearchCenterToPlantCase,
  createAdmins,
  getAllResearchCenters,
  updateSubCenterDetails,
} from "../controllers/subCenterAdmin.operations.controller.js";

const router = express.Router();

router.post(
  "/create-visit-agent",
  authMiddleware,
  subCenterAdminMiddleware,
  createVisitAgent
);
router.get(
  "/get-all-visit-agents",
  authMiddleware,
  subCenterAdminMiddleware,
  getAllVisitAgents
);

router.get(
  "/get-all-plant-cases",
  authMiddleware,
  subCenterAdminMiddleware,
  getAllPlantCasesForCenter
);

router.get(
  "/get-plant-case/:id",
  authMiddleware,
  subCenterAdminMiddleware,
  getPlantCaseById
);

router.patch(
  "/assign-visit-agent/:id",
  authMiddleware,
  subCenterAdminMiddleware,
  assignVisitAgentToPlantCase
);

router.patch(
  "/assign-research-center/:id",
  authMiddleware,
  subCenterAdminMiddleware,
  assignResearchCenterToPlantCase
);

router.post(
  "/create-admins",
  authMiddleware,
  subCenterAdminMiddleware,
  createAdmins
);

router.get(
  "/get-all-research-centers",
  authMiddleware,
  subCenterAdminMiddleware,
  getAllResearchCenters
);

router.patch(
  "/update-sub-center-details",
  authMiddleware,
  subCenterAdminMiddleware,
  updateSubCenterDetails
);
export default router;
