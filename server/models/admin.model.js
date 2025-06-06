import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactNumber: {
      type: String,
      maxLength: [15, "Contact number cannot be more than 15 characters"],
      minLength: [10, "Contact number must be at least 10 characters"],
    },
    role: { type: String, enum: ["main-admin"], default: "main-admin" },
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    image: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/illustration-customer-service-concept_53876-5883.jpg?semt=ais_hybrid&w=740",
    },
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

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

adminSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("Admin", adminSchema);
