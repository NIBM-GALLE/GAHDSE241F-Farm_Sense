import { errorHandler } from "../utils/errorHandler.js";
import SubCenter from "../models/sub_center.model.js";
import VisitAgent from "../models/visit_agent.model.js";
import PlantCase from "../models/plant_case.model.js";
import ResearchDivision from "../models/research_divisions.model.js";
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

export const getAllVisitAgents = async (req, res, next) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(10, Math.max(1, parseInt(req.query.limit) || 10));
  const skip = (page - 1) * limit;

  try {
    const [totalVisitAgents, visitAgents] = await Promise.all([
      VisitAgent.countDocuments({ subCenterId: req.subCenterId }),
      VisitAgent.find({ subCenterId: req.subCenterId })
        .select("name email contactNumber status createdAt")
        .populate("createdBy", "name email contactNumber")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
    ]);

    const totalPages = Math.ceil(totalVisitAgents / limit);
    const hasNext = page < totalPages;
    const hasPrevious = page > 1;

    res.status(200).json({
      message: "Visit agents fetched successfully",
      visitAgents,
      pagination: {
        totalVisitAgents,
        totalPages,
        hasNext,
        hasPrevious,
        nextPage: hasNext ? page + 1 : null,
        previousPage: hasPrevious ? page - 1 : null,
      },
    });
  } catch (error) {
    console.error("Error in getAllVisitAgents:", error);
    return next(errorHandler(500, "Internal server error"));
  }
};

export const getAllPlantCasesForCenter = async (req, res, next) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(10, Math.max(1, parseInt(req.query.limit) || 10));
  const skip = (page - 1) * limit;
  try {
    const [totalCases, plantCases] = await Promise.all([
      PlantCase.countDocuments({ assignedSubCenter: req.subCenterId }),
      PlantCase.find({ assignedSubCenter: req.subCenterId })
        .select("status plantName plantIssue images createdAt")
        // .populate("createdBy", "name address email phone")
        // .populate("assignedVisitAgent", "name contactNumber email")
        // .populate("assignedBy", "name email contactNumber")
        // .populate(
        //   "assignedResearchDivision",
        //   "name location contactNumber email"
        // )
        .populate("answeredBy", "name email contactNumber")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
    ]);

    const totalPages = Math.ceil(totalCases / limit);
    const hasNext = page < totalPages;
    const hasPrevious = page > 1;

    res.status(200).json({
      message: "Plant cases fetched successfully",
      plantCases,
      pagination: {
        totalCases,
        totalPages,
        currentPage: page,
        hasNext,
        hasPrevious,
        nextPage: hasNext ? page + 1 : null,
        previousPage: hasPrevious ? page - 1 : null,
      },
    });
  } catch (error) {
    console.error("Error in getAllPlantCasesForCenter:", error);
    return next(errorHandler(500, "Internal server error"));
  }
};

export const getPlantCaseById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return next(errorHandler(400, "Plant case ID is required"));
    }

    const plantCase = await PlantCase.findById(id);
    if (!plantCase) {
      return next(errorHandler(404, "Plant case not found"));
    }

    if (plantCase.assignedSubCenter.toString() !== req.subCenterId) {
      return next(errorHandler(403, "Unauthorized access to this plant case"));
    }

    const populatedPlantCase = await PlantCase.findById(id)
      .select(
        "status plantName plantIssue images answerStatus  answer visitAgentComment createdAt"
      )
      .populate("createdBy", "name address email phone")
      .populate("assignedVisitAgent", "name contactNumber email")
      .populate("assignedResearchDivision", "name location contactNumber email")
      .populate("visitAgentAssignedBy", "name email contactNumber")
      .populate("answeredBy", "name email contactNumber")
      .populate("researchDivisionAssignedBy", "name email contactNumber");

    res.status(200).json({
      plantCase: populatedPlantCase,
    });
  } catch (error) {
    console.error("Error in getPlantCaseById:", error);
    return next(errorHandler(500, "Internal server error"));
  }
};

export const assignVisitAgentToPlantCase = async (req, res, next) => {
  try {
    const plantCaseId = req.params.id;
    const { visitAgentId } = req.body;
    const subCenterId = req.subCenterId;

    if (!plantCaseId || !visitAgentId) {
      return next(
        errorHandler(400, "Plant case ID and Visit Agent ID are required")
      );
    }

    const plantCase = await PlantCase.findById(plantCaseId);
    if (!plantCase) {
      return next(errorHandler(404, "Plant case not found"));
    }

    const visitAgent = await VisitAgent.findById(visitAgentId);
    if (!visitAgent) {
      return next(errorHandler(404, "Visit agent not found"));
    }

    if (plantCase.assignedSubCenter.toString() !== subCenterId) {
      return next(errorHandler(403, "Unauthorized access to this plant case"));
    }

    plantCase.assignedVisitAgent = visitAgentId;
    plantCase.visitAgentAssignedBy = req.userId;
    plantCase.status = "in-progress";

    await plantCase.save();

    const updatedPlantCase = await PlantCase.findById(plantCaseId)
      .select(
        "status plantName plantIssue images answerStatus  answer visitAgentComment createdAt"
      )
      .populate("createdBy", "name address email phone")
      .populate("assignedVisitAgent", "name contactNumber email")
      .populate("assignedResearchDivision", "name location contactNumber email")
      .populate("visitAgentAssignedBy", "name email contactNumber")
      .populate("answeredBy", "name email contactNumber")
      .populate("researchDivisionAssignedBy", "name email contactNumber");

    res.status(200).json({
      message: "Visit agent assigned to plant case successfully",
      plantCase: updatedPlantCase,
    });
  } catch (error) {
    console.error("Error in assignVisitAgentToPlantCase:", error);
    return next(errorHandler(500, "Internal server error"));
  }
};

export const assignResearchCenterToPlantCase = async (req, res, next) => {
  try {
    const plantCaseId = req.params.id;
    const { researchCenterId } = req.body;
    const subCenterId = req.subCenterId;

    if (!plantCaseId || !researchCenterId) {
      return next(
        errorHandler(400, "Plant case ID and Research Center ID are required")
      );
    }

    const plantCase = await PlantCase.findById(plantCaseId);
    if (!plantCase) {
      return next(errorHandler(404, "Plant case not found"));
    }

    if (plantCase.assignedSubCenter.toString() !== subCenterId) {
      return next(errorHandler(403, "Unauthorized access to this plant case"));
    }

    if (plantCase.visitAgentComment === null) {
      return next(
        errorHandler(
          400,
          "Plant case must be answered by visit agent before assigning to research center"
        )
      );
    }

    const researchDivision = await ResearchDivision.findById(researchCenterId);
    if (!researchDivision) {
      return next(errorHandler(404, "Research division not found"));
    }

    plantCase.assignedResearchDivision = researchCenterId;
    plantCase.researchDivisionAssignedBy = req.userId;
    console.log(
      plantCase.researchDivisionAssignedBy,
      "researchDivisionAssignedBy"
    );
    plantCase.answerStatus = "pending";

    await plantCase.save();

    const updatedPlantCase = await PlantCase.findById(plantCaseId)
      .select(
        "status plantName plantIssue images answerStatus  answer visitAgentComment createdAt"
      )
      .populate("createdBy", "name address email phone")
      .populate("assignedVisitAgent", "name contactNumber email")
      .populate("assignedResearchDivision", "name location contactNumber email")
      .populate("visitAgentAssignedBy", "name email contactNumber")
      .populate("answeredBy", "name email contactNumber")
      .populate("researchDivisionAssignedBy", "name email contactNumber");

    res.status(200).json({
      message: "Research division assigned to plant case successfully",
      plantCase: updatedPlantCase,
    });
  } catch (error) {
    console.error("Error in assignResearchCenterToPlantCase:", error);
    return next(errorHandler(500, "Internal server error"));
  }
};
