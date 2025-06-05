import { errorHandler } from "../utils/errorHandler.js";
import SubCenterAdmin from "../models/sub_admin.model.js";
import SubCenter from "../models/sub_center.model.js";
import VisitAgent from "../models/visit_agent.model.js";
import {
  generateRandomPassword,
  generateOtp,
  findUser,
} from "../utils/helperFunctions.js";
import {
  sendVisitAgentLoginCredentialsEmail,
  sendVisitAgentVerificationEmail,
} from "../mailtrap/mailTrapEmail.js";

const subCenterFindById = async (subCenterId) => {
  try {
    const subCenter = await SubCenter.findById(subCenterId);
    return subCenter;
  } catch (error) {
    console.error("Error in subCenterFindById:", error);
    throw new Error("Internal server error");
  }
};

export const createVisitAgent = async (req, res, next) => {
  try {
    console.log("Creating visit agent with body:", req.body);
    const { name, email, contactNumber } = req.body;
    if (!name || !email || !contactNumber) {
      return next(errorHandler(400, "All fields are required"));
    }

    const subCenterId = req.subCenterId;
    const subCenterAdminId = req.userId;

    const existingAgent = await VisitAgent.findOne({
      email,
      subCenterId,
    });

    if (existingAgent) {
      return next(errorHandler(400, "Visit agent already exists"));
    }

    const rawPassword = generateRandomPassword();
    const visitAgent = new VisitAgent({
      name,
      email,
      password: rawPassword,
      subCenterId,
      createdBy: subCenterAdminId,
      contactNumber,
    });

    await visitAgent.save();
    const otp = generateOtp();
    visitAgent.verificationToken = otp;
    visitAgent.verificationTokenExpiresAt = new Date(Date.now() + 3600000); // 1 hour expiration
    await visitAgent.save();

    const subCenter = await subCenterFindById(subCenterId);
    if (!subCenter) {
      return next(errorHandler(404, "Sub Center not found"));
    }

    await sendVisitAgentLoginCredentialsEmail(
      name,
      email,
      rawPassword,
      subCenter.name,
      next
    );

    await sendVisitAgentVerificationEmail(email, name, subCenter.name, otp);

    res.status(201).json({
      message: "Visit agent created successfully",
      visitAgent,
    });
  } catch (error) {
    console.log("Error in createVisitAgent:", error);
    return next(errorHandler(500, "Internal server error"));
  }
};
