import { errorHandler } from "../utils/errorHandler.js";
import PlantCase from "../models/plant_case.model.js";

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
        .select("plantName plantIssue images status createdAt")
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
      data: {
        plantCases,
        pagination: {
          totalCases,
          totalPages,
          hasNext,
          hasPrevious,
          nextPage: hasNext ? page + 1 : null,
          previousPage: hasPrevious ? page - 1 : null,
        },
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
      .select("plantName plantIssue images status answer createdAt")
      .populate("createdBy", "name address phone email")
      .populate("assignedSubCenter", "name location email contactNumber")
      .populate("assignedVisitAgent", "name contactNumber email")
      .populate("answeredBy", "name email");

    res.status(200).json({
      message: "Answer is  added to plant case successfully",
      data: updatedPlantCase,
    });
  } catch (error) {
    console.error("Error in addCommentToPlantCaseForResearchCenter:", error);
    next(errorHandler(500, "Internal server error"));
  }
};
