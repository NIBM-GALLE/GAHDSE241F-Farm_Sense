import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const subBranchSchema = mongoose.Schema({});

const SubBranch = mongoose.model("SubBranch", subBranchSchema);

export default SubBranch;
