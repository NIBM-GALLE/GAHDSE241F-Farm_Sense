import { errorHandler } from "../utils/errorHandler.js";
import SubCenterAdmin from "../models/sub_admin.model.js";
import SubCenter from "../models/sub_center.model.js";
import ResearchDivision from "../models/research_divisions.model.js";
import ResearchDivisionAdmin from "../models/research_admin.model.js";
import {
  generateRandomPassword,
  generateOtp,
  findUser,
} from "../utils/helperFunctions.js";
import {
  sendSubCenterVerificationEmail,
  sendLoginCredentialsEmail,
  sendResearchCenterVerificationEmail,
  sendResearchCenterLoginCredentialsEmail,
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

export const createResearchCenter = async (req, res, next) => {
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

    // Check if the research center already exists
    const existingResearchCenter = await ResearchDivision.findOne({
      email: centerEmail,
      $or: [{ name: centerName }, { location: centerLocation }],
    });

    if (existingResearchCenter) {
      return next(errorHandler(400, "Research center already exists"));
    }

    // Check if the research center admin already exists
    const existingResearchCenterAdmin = await findUser({
      email: adminEmail,
    });

    if (existingResearchCenterAdmin) {
      return next(
        errorHandler(
          400,
          "Research center admin email already exists, Try another email"
        )
      );
    }

    // Generate password and create admin first
    const rawPassword = generateRandomPassword();
    const researchCenterAdmin = new ResearchDivisionAdmin({
      name: adminName,
      email: adminEmail,
      contactNumber: adminContact,
      password: rawPassword,
      createdBy: adminId,
      createdByModel: "Admin",
      verificationToken: generateOtp(),
      verificationTokenExpiresAt: Date.now() + 3600000, // 1 hour
    });

    // Save admin
    await researchCenterAdmin.save();

    // Create the research center
    const researchCenter = await ResearchDivision.create({
      name: centerName,
      location: centerLocation,
      email: centerEmail,
      admins: [researchCenterAdmin._id],
      createdBy: adminId,
    });

    // Update admin with research center ID
    researchCenterAdmin.researchDivisionId = researchCenter._id;
    await researchCenterAdmin.save();

    // Send emails with the original raw password
    await sendResearchCenterLoginCredentialsEmail(
      researchCenterAdmin.name,
      researchCenterAdmin.email,
      rawPassword,
      researchCenter.name,
      next
    );

    // Send verification email
    await sendResearchCenterVerificationEmail(
      researchCenterAdmin.email,
      researchCenterAdmin.verificationToken,
      researchCenterAdmin.name,
      researchCenter.name,
      next
    );

    res.status(201).json({
      status: "success",
      message: "Research center created successfully",
      data: {
        researchCenter,
        researchCenterAdmin,
      },
    });
  } catch (error) {
    console.log("Error in createResearchCenter:", error);
    return next(errorHandler(500, "Internal server error"));
  }
};

export const getAllSubCenters = async (req, res, next) => {
  try {
    // Parse pagination parameters with validation
    const page = Math.max(1, parseInt(req.query.page)) || 1;
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit))) || 10;
    const skip = (page - 1) * limit;

    // Get total count and documents in parallel for better performance
    const [totalSubCenters, subCenters] = await Promise.all([
      SubCenter.countDocuments(),
      SubCenter.find()
        .skip(skip)
        .limit(limit)
        .populate("admins", "name email contactNumber")
        .lean(), // For better performance (return plain JavaScript objects)
    ]);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalSubCenters / limit);
    const hasNext = page < totalPages;
    const hasPrevious = page > 1;

    res.status(200).json({
      status: "success",
      message: "Sub centers retrieved successfully",
      data: {
        subCenters,
        pagination: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems: totalSubCenters,
          totalPages,
          hasNext,
          hasPrevious,
          nextPage: hasNext ? page + 1 : null,
          previousPage: hasPrevious ? page - 1 : null,
        },
      },
    });
  } catch (error) {
    console.error("Error in getAllSubCenters:", error);
    return next(errorHandler(500, "Internal server error"));
  }
};

export const getAllResearchCenters = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page)) || 1;
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit))) || 10;
    const skip = (page - 1) * limit;

    const [totalResearchCenters, researchCenters] = await Promise.all([
      ResearchDivision.countDocuments(),
      ResearchDivision.find()
        .skip(skip)
        .limit(limit)
        .populate("admins", "name email contactNumber")
        .lean(),
    ]);

    const totalPages = Math.ceil(totalResearchCenters / limit);
    const hasNext = page < totalPages;
    const hasPrevious = page > 1;
    res.status(200).json({
      status: "success",
      message: "Research centers retrieved successfully",
      data: {
        researchCenters,
        pagination: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems: totalResearchCenters,
          totalPages,
          hasNext,
          hasPrevious,
          nextPage: hasNext ? page + 1 : null,
          previousPage: hasPrevious ? page - 1 : null,
        },
      },
    });
  } catch (error) {
    console.error("Error in getAllResearchCenters:", error);
    return next(errorHandler(500, "Internal server error"));
  }
};
