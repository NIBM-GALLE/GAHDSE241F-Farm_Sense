import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminMiddleware } from "../middleware/roles.middleware.js";
import { createSubCenter , createResearchCenter} from "../controllers/admin.operations.controller.js";
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

export default router;
