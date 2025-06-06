import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { subCenterAdminMiddleware } from "../middleware/roles.middleware.js";
import {
  createVisitAgent,
  getAllVisitAgents,
  getAllPlantCasesForCenter,
  getPlantCaseById,
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

export default router;
