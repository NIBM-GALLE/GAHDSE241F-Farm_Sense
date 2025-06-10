import { errorHandler } from "../utils/errorHandler.js";
import PlantCase from "../models/plant_case.model.js";
import ResearchDivision from "../models/research_divisions.model.js";
import ResearchDivisionAdmin from "../models/research_admin.model.js";
import {
  generateRandomPassword,
  generateOtp,
} from "../utils/helperFunctions.js";
import {
  sendResearchCenterVerificationEmail,
  sendResearchCenterLoginCredentialsEmail,
  sendPlantCaseResponseNotificationToFarmer,
} from "../mailtrap/mailTrapEmail.js";

export const getAllPlantCasesForResearchCenter = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(10, Math.max(1, parseInt(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    const [totalCases, plantCases] = await Promise.all([
      PlantCase.countDocuments({
        assignedResearchDivision: req.researchDivisionId,
      }),
      PlantCase.find({ assignedResearchDivision: req.researchDivisionId })
        .select(
          "plantName plantIssue images status createdAt answer answerStatus"
        )
        .populate("createdBy", "name address phone email")
        .populate("assignedSubCenter", "name location email contactNumber")
        .populate("assignedVisitAgent", "name contactNumber email")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
    ]);

    const totalPages = Math.ceil(totalCases / limit);
    const hasNext = page < totalPages;
    const hasPrevious = page > 1;

    res.status(200).json({
      message: "Plant cases retrieved successfully",
      plantCases,
      pagination: {
        totalCases,
        totalPages,
        hasNext,
        hasPrevious,
        nextPage: hasNext ? page + 1 : null,
        previousPage: hasPrevious ? page - 1 : null,
      },
    });
  } catch (error) {
    console.error("Error in getAllPlantCasesForResearchCenter:", error);
    next(errorHandler(500, "Internal server error"));
  }
};

export const addCommentToPlantCaseForResearchCenter = async (
  req,
  res,
  next
) => {
  try {
    const { answer } = req.body;
    const plantCaseId = req.params.id;

    if (!answer || !plantCaseId) {
      return next(errorHandler(400, "Answer and plant case ID are required"));
    }
    if (answer === "null" || answer === "undefined") {
      return next(errorHandler(400, "Answer cannot be null or undefined"));
    }

    if (answer.length < 5 || answer.length > 500) {
      return next(
        errorHandler(400, "Answer must be between 5 and 500 characters")
      );
    }

    const plantCase = await PlantCase.findById(plantCaseId);
    if (!plantCase) {
      return next(errorHandler(404, "Plant case not found"));
    }

    if (plantCase.answerStatus === "answered") {
      return next(
        errorHandler(400, "This plant case has already been answered")
      );
    }

    if (
      plantCase.assignedResearchDivision.toString() !==
      req.researchDivisionId.toString()
    ) {
      return next(
        errorHandler(
          403,
          "Your Research Divison is not authorized to answer this plant case"
        )
      );
    }

    plantCase.answer = answer;
    plantCase.answerStatus = "answered";
    plantCase.status = "resolved";
    plantCase.answeredBy = req.userId;

    await plantCase.save();

    const updatedPlantCase = await PlantCase.findById(plantCaseId)
      .select(
        "plantName plantIssue images status answer createdAt answer answerStatus"
      )
      .populate("createdBy", "name address phone email")
      .populate("assignedSubCenter", "name location email contactNumber")
      .populate("assignedVisitAgent", "name contactNumber email")
      .populate("answeredBy", "name email");

    await sendPlantCaseResponseNotificationToFarmer(
      updatedPlantCase.createdBy.email,
      updatedPlantCase.createdBy.name,
      updatedPlantCase.plantName,
      updatedPlantCase.plantIssue,
      updatedPlantCase.answer
    );

    res.status(200).json({
      message: "Answer is  added to plant case successfully",
      updatedPlantCase,
    });
  } catch (error) {
    console.error("Error in addCommentToPlantCaseForResearchCenter:", error);
    next(errorHandler(500, "Internal server error"));
  }
};

export const createAdmin = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return next(errorHandler(400, "Name and email are required"));
    }

    const researchDivision = await ResearchDivision.findById(
      req.researchDivisionId
    );

    if (!researchDivision) {
      return next(errorHandler(404, "Research Division not found"));
    }
    const existingAdmin = await ResearchDivisionAdmin.findOne({
      email,
      researchDivisionId: req.researchDivisionId,
    });

    if (existingAdmin) {
      return next(
        errorHandler(
          400,
          "An admin with this email already exists in this research division"
        )
      );
    }

    if (researchDivision.admins.length >= 5) {
      return next(
        errorHandler(
          400,
          "You cannot create more than 5 admins for a research division"
        )
      );
    }

    const rawPassword = generateRandomPassword();
    const newAdmin = new ResearchDivisionAdmin({
      name,
      email,
      password: rawPassword,
      researchDivisionId: req.researchDivisionId,
      createdBy: req.userId,
      createdByModel: "ResearchDivisionAdmin",
      verificationToken: generateOtp(),
      verificationTokenExpiresAt: new Date(Date.now() + 3600000), // 1 hour expiration
    });

    await newAdmin.save();
    researchDivision.admins.push(newAdmin._id);
    await researchDivision.save();

    // send login credentials to the new admin
    await sendResearchCenterLoginCredentialsEmail(
      newAdmin.name,
      newAdmin.email,
      rawPassword,
      researchDivision.name,
      next
    );
    // send email verification email
    await sendResearchCenterVerificationEmail(
      newAdmin.email,
      newAdmin.verificationToken,
      newAdmin.name,
      researchDivision.name,
      next
    );

    res.status(201).json({
      message: "Research Division Admin created successfully",
      researchDivisionAdmin: newAdmin,
    });
  } catch (error) {
    console.error("Error in createAdmin:", error);
    next(errorHandler(500, "Internal server error"));
  }
};

export const updateResearchCenterDetails = async (req, res, next) => {
  try {
    const { contactNumber, email } = req.body;
    if (!contactNumber && !email) {
      return next(errorHandler(400, "Contact number or email is required"));
    }
    const researchDivision = await ResearchDivision.findById(
      req.researchDivisionId
    );
    if (!researchDivision) {
      return next(errorHandler(404, "Research Division not found"));
    }

    if (!researchDivision.admins.includes(req.userId)) {
      return next(
        errorHandler(
          403,
          "You are not authorized to update this research center"
        )
      );
    }

    researchDivision.contactNumber =
      contactNumber || researchDivision.contactNumber;
    researchDivision.email = email || researchDivision.email;

    await researchDivision.save();
    const updatedResearchDivision = await ResearchDivision.findById(
      req.researchDivisionId
    ).select("name location contactNumber email");

    res.status(200).json({
      message: "Research center details updated successfully",
      researchCenter: updatedResearchDivision,
    });
  } catch (error) {
    console.error("Error in updateResearchCenterDetails:", error);
    next(errorHandler(500, "Internal server error"));
  }
};

export const getResearchAdmins = async (req, res, next) => {
  try {
    const researchDivision = await ResearchDivision.findById(
      req.researchDivisionId
    ).populate("admins", "name email contactNumber");

    if (!researchDivision) {
      return next(errorHandler(404, "Research Division not found"));
    }

    res.status(200).json({
      message: "Research Division admins retrieved successfully",
      admins: researchDivision.admins,
    });
  } catch (error) {
    console.error("Error in getResearchAdmins:", error);
    next(errorHandler(500, "Internal server error"));
  }
};

export const getResearchCenterDetails = async (req, res, next) => {
  try {
    const researchDivision = await ResearchDivision.findById(
      req.researchDivisionId
    ).select("name location contactNumber email ");

    if (!researchDivision) {
      return next(errorHandler(404, "Research Division not found"));
    }

    res.status(200).json({
      message: "Research center details retrieved successfully",
      researchCenter: researchDivision,
    });
  } catch (error) {
    console.error("Error in getResearchCenterDetails:", error);
    next(errorHandler(500, "Internal server error"));
  }
};
