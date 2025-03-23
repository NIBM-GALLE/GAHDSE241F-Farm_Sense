import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: [20, "Name cannot be more than 100 characters"],
      minLength: [5, "Name must be at least 5 characters"],
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      maxLength: [40, "Password cannot be more than 40 characters"],
      minLength: [6, "Password must be at least 6 characters"],
    },

    role: {
      type: String,
      default: "sub",
    },

    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timeStamps: true }
);

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hash(this.password, salt);
  next();
});

adminSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
