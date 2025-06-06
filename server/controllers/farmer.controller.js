import Farmer from "../models/farmer.model.js";
import { errorHandler } from "../utils/errorHandler.js";
import PlantCase from "../models/plant_case.model.js";

export const updateProfile = async (req, res, next) => {
  try {
    const { name, address, phone, plants, image } = req.body;
    const farmerId = req.userId;

    if (!name && !address && !phone && !plants && !image) {
      return next(
        errorHandler(400, "At least one field is required to update")
      );
    }

    if (phone && (phone.length < 10 || phone.length > 15)) {
      return next(
        errorHandler(400, "Contact number must be between 10 and 15 characters")
      );
    }

    // Validate plants array if provided
    if (plants && !Array.isArray(plants)) {
      return next(errorHandler(400, "Plants must be an array"));
    }

    const farmer = await Farmer.findById(farmerId);

    if (!farmer) {
      return next(errorHandler(404, "Farmer not found"));
    }

    // Update the farmer's profile
    farmer.name = name || farmer.name;
    farmer.address = address || farmer.address;
    farmer.phone = phone || farmer.phone;
    farmer.plants = plants || farmer.plants;
    farmer.image = image || farmer.image;

    await farmer.save();

    const updatedFarmer = await Farmer.findById(farmerId).select("-password");
    return res.status(200).json({
      message: "Profile updated successfully",
      farmer: updatedFarmer,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return next(errorHandler(500, "Internal Server Error", error));
  }
};

export const createCase = async (req, res, next) => {
  try {
    const { plantName, plantIssue, images, assignedSubCenterId } = req.body;
    if (!plantName || !plantIssue || !images || !assignedSubCenterId) {
      return next(errorHandler(400, "All fields are required"));
    }

    const existingCase = await PlantCase.findOne({
      plantName,
      plantIssue,
      createdBy: req.userId,
    });

    if (existingCase) {
      return next(
        errorHandler(
          400,
          "A case with the same plant name and issue already exists, please be paient while we resolve it."
        )
      );
    }

    const newCase = new PlantCase({
      createdBy: req.userId,
      assignedSubCenter: assignedSubCenterId,
      plantName,
      plantIssue,
      images,
    });

    await newCase.save();
    return res.status(201).json({
      message: "Case created successfully",
      case: newCase,
    });
  } catch (error) {
    console.error("Error creating case:", error);
    return next(errorHandler(500, "Internal Server Error", error));
  }
};

export const getCases = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(10, Math.max(1, parseInt(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    const [totalCases, cases] = await Promise.all([
      PlantCase.countDocuments({ createdBy: req.userId }),
      PlantCase.find({ createdBy: req.userId })
        .select(
          "status plantName plantIssue images answerStatus  answer visitAgentComment createdAt"
        )
        .populate("assignedSubCenter", "name location contactNumber")
        .populate("assignedVisitAgent", "name contactNumber email")
        .populate("assignedBy", "name email contactNumber")
        .populate(
          "assignedResearchDivision",
          "name location contactNumber email"
        )
        .populate("answeredBy", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
    ]);

    const totalPages = Math.ceil(totalCases / limit);
    const hasNext = page < totalPages;
    const hasPrevious = page > 1;

    res.status(200).json({
      message: "Cases fetched successfully",
      cases,
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
    console.error("Error fetching cases:", error);
    return next(errorHandler(500, "Internal Server Error", error));
  }
};

export const getCaseById = async (req, res, next) => {
  try {
    const caseId = req.params.id;
    if (!caseId) {
      return next(errorHandler(400, "Case ID is required"));
    }

    const plantCase = await PlantCase.findById(caseId);
    if (!plantCase) {
      return next(errorHandler(404, "Case not found"));
    }

    const populatedCase = await PlantCase.findById(caseId)
      .select(
        "status plantName plantIssue images answerStatus  answer visitAgentComment createdAt"
      )
      .populate("assignedSubCenter", "name location contactNumber")
      .populate("assignedVisitAgent", "name contactNumber email")
      .populate("assignedBy", "name email contactNumber")
      .populate("assignedResearchDivision", "name location contactNumber email")
      .populate("answeredBy", "name email");

    res.status(200).json({
      message: "Case fetched successfully",
      case: populatedCase,
    });
  } catch (error) {
    console.error("Error fetching case by ID:", error);
    return next(errorHandler(500, "Internal Server Error", error));
  }
};
