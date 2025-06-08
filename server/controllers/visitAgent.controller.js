import { errorHandler } from "../utils/errorHandler.js";
import SubCenter from "../models/sub_center.model.js";
import VisitAgent from "../models/visit_agent.model.js";
import PlantCase from "../models/plant_case.model.js";

export const getAllAssignedPlantCases = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(10, Math.max(1, parseInt(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    const [totalCases, assignedCases] = await Promise.all([
      PlantCase.countDocuments({ assignedVisitAgent: req.userId }),
      PlantCase.find({ assignedVisitAgent: req.userId })
        .select(
          "plantName plantIssue images status visitAgentComment createdAt"
        )
        .populate("createdBy", "name address phone email")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
    ]);

    const totalPages = Math.ceil(totalCases / limit);
    const hasNext = page < totalPages;
    const hasPrevious = page > 1;

    res.status(200).json({
      success: true,
      message: "Assigned plant cases retrieved successfully",
      data: {
        assignedCases,
        totalCases,
        totalPages,
        hasNext,
        hasPrevious,
        nextPage: hasNext ? page + 1 : null,
        previousPage: hasPrevious ? page - 1 : null,
      },
    });
  } catch (error) {
    console.error("Error in getAllAssignedPlantCases:", error);
    next(errorHandler(500, "Internal server error"));
  }
};

export const addCommentToPlantCase = async (req, res, next) => {
  try {
    const plantCaseId = req.params.id;
    const { comment } = req.body;
    if (!plantCaseId || !comment) {
      return next(errorHandler(400, "Plant case ID and comment are required"));
    }

    const plantCase = await PlantCase.findById(plantCaseId);
    if (!plantCase) {
      return next(errorHandler(404, "Plant case not found"));
    }

    if (plantCase.assignedVisitAgent.toString() !== req.userId) {
      return next(
        errorHandler(
          403,
          "You are not authorized to comment on this plant case"
        )
      );
    }

    plantCase.visitAgentComment = comment;
    await plantCase.save();

    const updatedPlantCase = await PlantCase.findById(plantCaseId)
      .select("plantIssue images status visitAgentComment createdAt")
      .populate("createdBy", "name address phone email");

    res.status(200).json({
      message: "Comment added to plant case successfully",
      data: updatedPlantCase,
    });
  } catch (error) {
    console.error("Error in addCommentToPlantCase:", error);
    next(errorHandler(500, "Internal server error"));
  }
};
