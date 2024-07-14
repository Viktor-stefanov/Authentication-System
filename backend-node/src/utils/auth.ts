import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { HttpUserData } from "../schemas/auth";
dotenv.config();

const { TokenExpiredError, JsonWebTokenError } = jwt;

type tokenPayload = { user?: HttpUserData; error?: string };

export const hashPassword = (password: string) =>
  crypto.createHash("sha512").update(password).digest("hex");

export const createAccessToken = (user: HttpUserData) =>
  jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: "60ms" });

export const createRefreshToken = (user: HttpUserData) =>
  jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: "1d" });

export const verifyJwt = (token: string): tokenPayload => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as { user: HttpUserData };
  } catch (err) {
    if (err instanceof TokenExpiredError) return { error: "Token has expired" };
    else if (err instanceof JsonWebTokenError)
      return { error: "Malformed token" };
    else return { error: "Failed to authenticate user" };
  }
};
