import express from "express";

// admin auth routes
import adminAuthRoutes from "./authRoutes/admin.auth.route.js";

const router = express.Router();
router.use("/admin", adminAuthRoutes);

export default router;
