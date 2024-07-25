import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../types/auth.js";
dotenv.config();

const { JsonWebTokenError } = jwt;

export const createToken = (
  payload: object | string,
  options: { expiresIn: string }
): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, options);
};

export const verifyJwt = (token: string): User => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded as User;
  } catch (error) {
    if (
      error instanceof JsonWebTokenError &&
      error.name === "TokenExpiredError"
    ) {
      throw new Error("Token expired");
    }
    throw new Error("Invalid token");
  }
};
