import { mailtrapClient, sender } from "./mailtrapConfig.js";
import { errorHandler } from "../utils/errorHandler.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE } from "./mailTrapTemplates.js";

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
