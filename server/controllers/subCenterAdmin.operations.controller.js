import { errorHandler } from "../utils/errorHandler.js";
import SubCenterAdmin from "../models/sub_admin.model.js";
import SubCenter from "../models/sub_center.model.js";
import VisitAgent from "../models/visit_agent.model.js";
import {
  generateRandomPassword,
  generateOtp,
  findUser,
} from "../utils/helperFunctions.js";




export const createVisitAgent = async (req, res, next) => {}