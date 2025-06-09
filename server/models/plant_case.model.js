import mongoose from "mongoose";

const plantCaseSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farmer",
      required: true,
    },

    assignedSubCenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCenter",
      required: true,
    },

    plantName: {
      type: String,
      required: true,
      maxLength: [100, "Plant name cannot be more than 100 characters"],
      minLength: [5, "Plant name must be at least 5 characters"],
    },

    plantIssue: {
      type: String,
      required: true,
      maxLength: [100, "Plant issue cannot be more than 100 characters"],
      minLength: [5, "Plant issue must be at least 5 characters"],
    },

    images: {
      type: [String],
      required: true,
    },

    assignedVisitAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VisitAgent",
    },

    visitAgentAssignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCenterAdmin",
    },

    status: {
      type: String,
      enum: ["pending", "in-progress", "resolved", "unsolved"],
      default: "pending",
    },

    assignedResearchDivision: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ResearchDivision",
    },
    researchDivisionAssignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCenterAdmin",
    },

    answeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ResearchDivisionAdmin",
    },
    answerStatus: {
      type: String,
      enum: ["pending", "answered"],
      default: null,
    },
    answer: {
      type: String,
      default: null,
    },

    visitAgentComment: {
      type: String,
      default: null,
      maxLength: [500, "Comment cannot be more than 500 characters"],
    },
  },
  { timestamps: true }
);

const PlantCase = mongoose.model("PlantCase", plantCaseSchema);
export default PlantCase;
