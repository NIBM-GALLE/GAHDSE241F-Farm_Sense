import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const subCenterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    mainAdminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubCenterAdmin" }],
    contactNumber: { type: String, required: true },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

subCenterSchema.pre("save", async function (next) {
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

export default mongoose.model("SubCenter", subCenterSchema);
