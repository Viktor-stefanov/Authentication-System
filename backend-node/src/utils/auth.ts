import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const hashPassword = (password: string) =>
  crypto.createHash("sha512").update(password).digest("hex");

export const createJwt = (userId: string) =>
  jwt.sign({ userId }, process.env.JWT_SECRET!);

export const verifyJwt = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET!);
