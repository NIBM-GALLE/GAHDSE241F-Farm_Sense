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
    isVerified: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "SubCenterAdmin" },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

visitAgentSchema.pre("save", async function (next) {
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
  return bcrypt.compare(this.password, password);
};
export default mongoose.model("VisitAgent", visitAgentSchema);
