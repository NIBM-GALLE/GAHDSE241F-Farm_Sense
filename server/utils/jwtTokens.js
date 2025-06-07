import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateAccessAndRefreshTokens = (id, role) => {
  const accessToken = jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "24h",
  });
  const refreshToken = jwt.sign(
    { id, role },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return { accessToken, refreshToken };
};
