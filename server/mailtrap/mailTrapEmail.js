import { mailtrapClient, sender } from "./mailtrapConfig.js";
import { errorHandler } from "../utils/errorHandler.js";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE_SUB_CENTER,
  LOGIN_CREDENTIALS_FOR_ADMINS,
  VERIFICATION_EMAIL_TEMPLATE_RESEARCH_CENTER,
  LOGIN_CREDENTIALS_FOR_ADMINS_RESEARCH_CENTER,
  LOGIN_CREDENTIALS_FOR_VISIT_AGENTS,
  VERIFICATION_EMAIL_TEMPLATE_VISIT_AGENTS,
  PLANT_CASE_ASSIGNMENT_NOTIFICATION_VISIT_AGENTS,
  PLANT_CASE_ASSIGNMENT_NOTIFICATION_RESEARCH_DIVISION,
  PLANT_CASE_RESPONSE_NOTIFICATION_FARMER,
} from "./mailTrapTemplates.js";

export const sendPasswordResetEmail = async (email, resetUrl, next) => {
  try {
    const recipient = [{ email }];
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Request",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
      category: "password-reset",
    });
    console.log("Password reset email sent successfully:", response);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return next(errorHandler(500, "Internal server error"));
  }
};

export const sendResetSuccessEmail = async (email, name, next) => {
  try {
    const recipient = [{ email }];
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace("{userName}", name),
      category: "password-reset-success",
    });
    console.log("Password reset success email sent successfully:", response);
  } catch (error) {
    console.error("Error sending password reset success email:", error);
    return next(errorHandler(500, "Internal server error"));
  }
};

export const sendVerificationEmail = async (email, verificationCode, next) => {
  try {
    const recipient = [{ email }];
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Email Verification",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationCode
      ),
      category: "email-verification",
    });

    console.log("Verification email sent successfully:", response);
  } catch (error) {
    console.error("Error sending verification email:", error);
    return next(errorHandler(500, "Internal server error"));
  }
};

export const sendWelcomeEmail = async (email, name, createdAt, next) => {
  try {
    const recipient = [{ email }];
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Welcome to Farmsense",
      html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name)
        .replace("{creationDate}", createdAt)
        .replace("{email}", email),
      category: "welcome-email",
    });
    console.log("Welcome email sent successfully:", response);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return next(errorHandler(500, "Internal server error"));
  }
};

export const sendSubCenterVerificationEmail = async (
  email,
  verificationCode,
  adminName,
  SubCenterName,
  next
) => {
  try {
    const recipient = [{ email }];
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Sub Center Admin Verification",
      html: VERIFICATION_EMAIL_TEMPLATE_SUB_CENTER.replace(
        "{adminName}",
        adminName
      )
        .replace("{subCenterName}", SubCenterName)
        .replace("{verificationCode}", verificationCode),
      category: "email-verification",
    });

    console.log("Sub center verification email sent successfully:", response);
  } catch (error) {
    console.error("Error sending sub center verification email:", error);
    return next(errorHandler(500, "Internal server error"));
  }
};

export const sendLoginCredentialsEmail = async (
  name,
  email,
  password,
  subCenterName,
  next
) => {
  try {
    const recipient = [{ email }];
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Login Credentials",
      html: LOGIN_CREDENTIALS_FOR_ADMINS.replace("{adminName}", name)
        .replace("{subCenterName}", subCenterName)
        .replace("{adminEmail}", email)
        .replace("{adminPassword}", password),
      category: "login-credentials",
    });

    console.log("Login credentials email sent successfully:", response);
  } catch (error) {
    console.error("Error sending login credentials email:", error);
    return next(errorHandler(500, "Internal server error"));
  }
};

export const sendResearchCenterVerificationEmail = async (
  email,
  verificationCode,
  adminName,
  researchCenterName,
  next
) => {
  try {
    const recipient = [{ email }];
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Research Center Admin Verification",
      html: VERIFICATION_EMAIL_TEMPLATE_RESEARCH_CENTER.replace(
        "{adminName}",
        adminName
      )
        .replace("{researchCenter}", researchCenterName)
        .replace("{verificationCode}", verificationCode),
      category: "email-verification",
    });

    console.log(
      "Research center verification email sent successfully:",
      response
    );
  } catch (error) {
    console.error("Error sending research center verification email:", error);
    return next(errorHandler(500, "Internal server error"));
  }
};

export const sendResearchCenterLoginCredentialsEmail = async (
  name,
  email,
  password,
  researchCenterName,
  next
) => {
  try {
    const recipient = [{ email }];
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Login Credentials",
      html: LOGIN_CREDENTIALS_FOR_ADMINS_RESEARCH_CENTER.replace(
        "{adminName}",
        name
      )
        .replace("{researchCenter}", researchCenterName)
        .replace("{adminEmail}", email)
        .replace("{adminPassword}", password),
      category: "login-credentials",
    });

    console.log("Login credentials email sent successfully:", response);
  } catch (error) {
    console.error(
      "Error sending login credentials email to research center admin:",
      error
    );
    return next(errorHandler(500, "Internal server error"));
  }
};

export const sendVisitAgentLoginCredentialsEmail = async (
  name,
  email,
  password,
  subCenterName,
  next
) => {
  try {
    const recipient = [{ email }];
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Visit Agent Login Credentials",
      html: LOGIN_CREDENTIALS_FOR_VISIT_AGENTS.replace("{agentName}", name)
        .replace("{agentEmail}", email)
        .replace("{agentPassword}", password)
        .replace("{subCenterName}", subCenterName),
    });
  } catch (error) {
    console.error("Error sending visit agent login credentials email:", error);
    return next(errorHandler(500, "Internal server error"));
  }
};

export const sendVisitAgentVerificationEmail = async (
  email,
  agentName,
  centerName,
  verificationCode,
  next
) => {
  try {
    const recipient = [{ email }];
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Visit Agent Verification",
      html: VERIFICATION_EMAIL_TEMPLATE_VISIT_AGENTS.replace(
        "{agentName}",
        agentName
      )
        .replace("{subCenterName}", centerName)
        .replace("{verificationCode}", verificationCode),
      category: "visit-agent-verification",
    });
  } catch (error) {
    console.error("Error sending visit agent verification email:", error);
    return next(errorHandler(500, "Internal server error"));
  }
};

export const sendPlantCaseAssignmentNotificationForVisitAgent = async (
  agentEmail,
  agentName,
  plantName,
  plantIssue,
  location,
  farmerName,
  farmerContact
) => {
  try {
    const recipient = [{ email: agentEmail }];
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "New Plant Case Assignment",
      html: PLANT_CASE_ASSIGNMENT_NOTIFICATION_VISIT_AGENTS.replace(
        "{agentName}",
        agentName
      )
        .replace("{plantName}", plantName)
        .replace("{plantIssue}", plantIssue)
        .replace("{location}", location)
        .replace("{farmerName}", farmerName)
        .replace("{farmerContact}", farmerContact),
      category: "plant-case-assignment",
    });
    console.log(
      "Plant case assignment notification sent successfully:",
      response
    );
  } catch (error) {
    console.error(
      "Error sending plant case assignment notification for visit agent:",
      error
    );
  }
};

export const sendPlantCaseAssignmentNotificationForResearchDivision = async (
  centerEmail,
  centerName,
  plantName,
  plantIssue,
  location,
  farmerName,
  farmerContact
) => {
  try {
    const recipient = [{ email: centerEmail }];
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "New Plant Case Assignment",
      html: PLANT_CASE_ASSIGNMENT_NOTIFICATION_RESEARCH_DIVISION.replace(
        "{centerName}",
        centerName
      )
        .replace("{plantName}", plantName)
        .replace("{plantIssue}", plantIssue)
        .replace("{location}", location)
        .replace("{farmerName}", farmerName)
        .replace("{farmerContact}", farmerContact),
      category: "plant-case-assignment",
    });
    console.log(
      "Plant case assignment notification for research division sent successfully:",
      response
    );
  } catch (error) {
    console.error(
      "Error sending plant case assignment notification for research division:",
      error
    );
  }
};

export const sendPlantCaseResponseNotificationToFarmer = async (
  farmerEmail,
  farmerName,
  plantName,
  plantIssue,
  answer
) => {
  try {
    const recipient = [{ email: farmerEmail }];
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Plant Case Response",
      html: PLANT_CASE_RESPONSE_NOTIFICATION_FARMER.replace(
        "{farmerName}",
        farmerName
      )
        .replace("{plantName}", plantName)
        .replace("{plantIssue}", plantIssue)
        .replace("{answer}", answer),
      category: "plant-case-response",
    });
    console.log(
      "Plant case response notification sent successfully:",
      response
    );
  } catch (error) {
    console.error(
      "Error sending plant case response notification to farmer:",
      error
    );
  }
};
