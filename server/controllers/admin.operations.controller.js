import { errorHandler } from "../utils/errorHandler.js";
import SubCenterAdmin from "../models/sub_admin.model.js";
import SubCenter from "../models/sub_center.model.js";
import {
  generateRandomPassword,
  generateOtp,
  findUser,
} from "../utils/helperFunctions.js";
import {
  sendSubCenterVerificationEmail,
  sendLoginCredentialsEmail,
} from "../mailtrap/mailTrapEmail.js";

export const createSubCenter = async (req, res, next) => {
  try {
    const {
      adminName,
      adminEmail,
      adminContact,
      centerName,
      centerLocation,
      centerEmail,
    } = req.body;
    const adminId = req.userId;

    if (
      !adminName ||
      !adminEmail ||
      !adminContact ||
      !centerName ||
      !centerLocation ||
      !centerEmail
    ) {
      return next(errorHandler(400, "Please provide all required fields"));
    }

    // Check if the sub center already exists
    const existingSubCenter = await SubCenter.findOne({
      email: centerEmail,
      $or: [{ name: centerName }, { location: centerLocation }],
    });
    if (existingSubCenter) {
      return next(errorHandler(400, "Sub center already exists"));
    }

    // create the sub center admin

    // check if the sub center admin already exists
    const existingSubCenterAdmin = await findUser({
      email: adminEmail,
    });
    if (existingSubCenterAdmin) {
      return next(
        errorHandler(
          400,
          "Sub center admin email already exists, Try another email"
        )
      );
    }

    const password = generateRandomPassword();
    const subCenterAdmin = await SubCenterAdmin.create({
      name: adminName,
      email: adminEmail,
      contactNumber: adminContact,
      password,
      createdBy: adminId,
      createdByModel: "Admin",
      verificationToken: generateOtp(),
      verificationTokenExpiresAt: Date.now() + 3600000, // 1 hour
    });

    await subCenterAdmin.save();

    // create the sub center
    const subCenter = await SubCenter.create({
      name: centerName,
      location: centerLocation,
      email: centerEmail,
      admins: [subCenterAdmin._id],
      createdBy: adminId,
    });

    await subCenter.save();
    subCenterAdmin.subCenterId = subCenter._id;
    await subCenterAdmin.save();
    await sendLoginCredentialsEmail(
      subCenterAdmin.name,
      subCenterAdmin.email,
      password,
      subCenter.name,
      next
    );
    await sendSubCenterVerificationEmail(
      subCenterAdmin.email,
      subCenterAdmin.verificationToken,
      subCenterAdmin.name,
      subCenter.name,
      next
    );

    res.status(201).json({
      status: "success",
      message: "Sub center created successfully",
      data: {
        subCenter,
        subCenterAdmin,
      },
    });
  } catch (error) {
    console.log("Error in createSubCenter:", error);
    return next(errorHandler(500, "Internal server error"));
  }
};


export const createResearchCenter = async (req, res, next) => {}


