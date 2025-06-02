import express from 'express';
import { authMiddleware } from "../middleware/auth.middleware.js";
import { subCenterAdminMiddleware } from "../middleware/roles.middleware.js";
import { createVisitAgent } from "../controllers/subCenterAdmin.operations.controller.js";

const router = express.Router();

router.post("/create-visit-agent", authMiddleware, subCenterAdminMiddleware, createVisitAgent)


export default router;