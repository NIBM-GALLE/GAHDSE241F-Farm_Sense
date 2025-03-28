import MailtrapClient from "mailtrap";
import dotenv from "dotenv";
import e from "express";

dotenv.config();

export const mailtrapClient = new MailtrapClient({
  endpoint: process.env.MAILTRAP_ENDPOINT,
  token: process.env.MAILTRAP_API_TOKEN,
});

export const sender = {
  email: "hello@projectsbysachinthana.me",
  name: "Farmsense",
};
