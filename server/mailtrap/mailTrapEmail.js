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
