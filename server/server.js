import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";

//routes imports
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.operations.route.js";
import subCenterAdminRoutes from "./routes/subCenterAdmin.operation.route.js";
import farmerRoutes from "./routes/farmer.route.js";
import visitAgentRoutes from "./routes/visitAgent.route.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/sub-center-admin", subCenterAdminRoutes);
app.use("/api/farmer", farmerRoutes);
app.use("/api/visit-agent", visitAgentRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
  connectDB();
});

// error handle middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
