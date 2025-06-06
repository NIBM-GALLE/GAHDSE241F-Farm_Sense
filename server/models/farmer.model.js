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
      required: true,
    },

    address: {
      type: String,
      trim: true,
      maxLength: [200, "Address cannot be more than 200 characters"],
      minLength: [10, "Address must be at least 10 characters"],
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
      trim: true,
      maxLength: [15, "Contact number cannot be more than 15 characters"],
      minLength: [10, "Contact number must be at least 10 characters"],
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

    image: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: "user",
    },

    isVerified: { type: Boolean, default: false },

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
    const sault = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, sault);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

farmerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Farmer = mongoose.model("Farmer", farmerSchema);
export default Farmer;
