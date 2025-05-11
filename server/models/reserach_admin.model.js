import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const researchDivisionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: [100, "Name cannot be more than 100 characters"],
      minLength: [5, "Name must be at least 5 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxLength: [100, "Email cannot be more than 100 characters"],
      minLength: [5, "Email must be at least 5 characters"],
    },

    contactNumber: {
      type: String,
      required: true,
      maxLength: [15, "Contact number cannot be more than 15 characters"],
      minLength: [10, "Contact number must be at least 10 characters"],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "createdByModel",
      required: true,
    },

    createdByModel: {
      type: String,
      required: true,
      enum: ["Admin", "ResearchDivisionAdmin"],
    },

    researchDivisionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ResearchDivision",
      required: true,
    },

    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

researchDivisionSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

researchDivisionSchema.methods.matchPassword = async function (password) {
  return bcrypt.compare(this.password, password);
};

const ResearchDivisionAdmin = mongoose.model(
  "ResearchDivisionAdmin",
  researchDivisionSchema
);

export default ResearchDivisionAdmin;
