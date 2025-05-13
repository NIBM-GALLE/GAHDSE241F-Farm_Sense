import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const subCenterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      maxLength: [100, "Email cannot be more than 100 characters"],
      minLength: [5, "Email must be at least 5 characters"],
    },
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCenterAdmin",
        required: true,
      },
    ],
    contactNumber: {
      type: String,
      required: true,
      maxLength: [15, "Contact number cannot be more than 15 characters"],
      minLength: [10, "Contact number must be at least 10 characters"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
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
