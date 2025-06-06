import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farmer",
      required: true,
    },
    message: {
      type: String,
      required: true,
      minLength: [5, "Message must be at least 5 characters"],
      maxLength: [500, "Message cannot exceed 500 characters"],
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);
export default Report;
