import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const subCenterAdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNumber: {
      type: String,
      maxLength: [15, "Contact number cannot be more than 15 characters"],
      minLength: [10, "Contact number must be at least 10 characters"],
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["sub-center-admin"],
      default: "sub-center-admin",
    },
    subCenterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCenter",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "createdByModel",
      required: true,
    },
    createdByModel: {
      type: String,
      enum: ["Admin", "SubCenterAdmin"],
      required: true,
    },
    isVerified: { type: Boolean, default: false },
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

subCenterAdminSchema.pre("save", async function (next) {
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

subCenterAdminSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("SubCenterAdmin", subCenterAdminSchema);
