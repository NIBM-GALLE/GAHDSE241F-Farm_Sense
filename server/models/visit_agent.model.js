import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const visitAgentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["visit-agent"],
      default: "visit-agent",
    },
    subCenterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCenter",
      required: true,
    },
    contactNumber: {
      type: String,

      maxLength: [15, "Contact number cannot be more than 15 characters"],
      minLength: [10, "Contact number must be at least 10 characters"],
    },
    isVerified: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "SubCenterAdmin" },
    image: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/illustration-customer-service-concept_53876-5883.jpg?semt=ais_hybrid&w=740",
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

visitAgentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const sault = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, sault);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});
visitAgentSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
export default mongoose.model("VisitAgent", visitAgentSchema);
