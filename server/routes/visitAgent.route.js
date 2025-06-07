import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { visitAgentMiddleware } from "../middleware/roles.middleware.js";
import {
  getAllAssignedPlantCases,
  addCommentToPlantCase,
} from "../controllers/visitAgent.controller.js";

const router = express.Router();

router.get(
  "/assigned-plant-cases",
  authMiddleware,
  visitAgentMiddleware,
  getAllAssignedPlantCases
);

router.patch(
  "/plant-case/:id",
  authMiddleware,
  visitAgentMiddleware,
  addCommentToPlantCase
);

export default router;
