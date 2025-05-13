import mongoose from "mongoose";

const researchDivisionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: [100, "Name cannot be more than 100 characters"],
      minLength: [5, "Name must be at least 5 characters"],
    },
    location: {
      type: String,
      required: true,
      maxLength: [200, "Location cannot be more than 200 characters"],
      minLength: [5, "Location must be at least 5 characters"],
    },
    contactNumber: {
      type: String,
      required: true,
      maxLength: [15, "Contact number cannot be more than 15 characters"],
      minLength: [10, "Contact number must be at least 10 characters"],
    },

    email: {
      type: String,
      required: true,
      unique: true,
      maxLength: [100, "Email cannot be more than 100 characters"],
      minLength: [5, "Email must be at least 5 characters"],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ResearchDivisionAdmin",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const ResearchDivision = mongoose.model(
  "ResearchDivision",
  researchDivisionSchema
);

export default ResearchDivision;
