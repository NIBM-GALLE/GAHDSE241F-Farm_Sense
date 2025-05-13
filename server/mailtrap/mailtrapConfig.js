import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

export const mailtrapClient = new MailtrapClient({
  endpoint: process.env.MAILTRAP_ENDPOINT,
  token: "6431270e6bb3d935a94b95991c246420",
});

export const sender = {
  email: "hello@projectsbysachinthana.me",
  name: "Farmsense",
};
