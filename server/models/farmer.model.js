import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const farmerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: [100, "Name cannot be more than 100 characters"],
      minLength: [5, "Name must be at least 5 characters"],
      trim: true,
    },
    email: {
      type: String,
      max: 100,
      unique: [true, "Email already exists"],
      required: [true, "Please enter email"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
      trim: true,
      minLength: [6, "Password must be at least 6 characters"],
      maxLength: [40, "Password cannot be more than 40 characters"],
    },

    address: {
      type: String,
      trim: true,
      maxLength: [200, "Address cannot be more than 200 characters"],
      minLength: [50, "Address must be at least 50 characters"],
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    phone: {
      type: String,
      maxLength: [15, "Phone number cannot be more than 15 characters"],
      minLength: [10, "Phone number must be at least 10 characters"],
      trim: true,
    },

    plants: {
      type: [String],
      validate: [
        {
          validator: function (arr) {
            return arr.every((plant) => plant.length >= 5);
          },
          message: "Each plant name must be at least 5 characters long",
        },
        {
          validator: function (arr) {
            return arr.every((plant) => plant.length <= 100);
          },
          message: "Each plant name cannot be more than 100 characters long",
        },
      ],
    },
    role: {
      type: String,
      default: "user",
    },

    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

farmerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

farmerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Farmer = mongoose.model("Farmer", farmerSchema);
export default Farmer;
