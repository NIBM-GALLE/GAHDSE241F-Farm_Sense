import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const subCenterAdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["sub-center-admin"],
      default: "sub-center-admin",
    },
    subCenterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCenter",
      required: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "SubCenterAdmin" },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

subCenterAdminSchema.pre("save", async function (next) {
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
  return bcrypt.compare(this.password, password);
};

export default mongoose.model("SubCenterAdmin", subCenterAdminSchema);
