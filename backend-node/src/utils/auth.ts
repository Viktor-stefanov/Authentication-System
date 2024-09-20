import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { JsonWebTokenError } = jwt;

export const createJwt = (
  payload: object | string,
  options: { expiresIn: string }
): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, options);
};

export const verifyJwt = (token: string): { id: number } => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded as { id: number };
  } catch (error) {
    console.log(error);
    if (
      error instanceof JsonWebTokenError &&
      error.name === "TokenExpiredError"
    ) {
      throw new Error("Token expired");
    }
    throw new Error("Invalid token");
  }
};
