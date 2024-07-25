import { User } from "./../types/auth.js";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { createUser } from "../models/userModel.js";
import { hashPassword } from "../utils/crypto.js";
import { createToken, verifyJwt } from "../utils/auth.js";

export const signUpSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    role: z.enum(["user", "admin"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, email, password, role } = signUpSchema.parse(req.body);
    const hashedPassword = await hashPassword(password);
    const user: User = {
      name,
      email,
      password: hashedPassword,
      role,
    };
    await createUser(user);

    const accessToken = createToken(
      { email: user.email },
      { expiresIn: "120s" }
    );
    const refreshToken = createToken(
      { email: user.email },
      { expiresIn: "1d" }
    );

    return res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
    return res.status(500).json({ erorr: "Internal Server Error" });
  }
};

export const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers["authorization"];
    if (!authorization) return res.status(401).json({ error: "Unauthorized" });

    const token = authorization.split(" ")[1];
    const user = verifyJwt(token);
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof Error)
      return res.status(401).json({ error: error.message });
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export const refreshToken = (req: Request, res: Response) => {
  const userRefreshToken = req.cookies["refreshToken"];
  if (!userRefreshToken)
    return res
      .status(401)
      .json({ error: "Access denied. No refresh token provided" });

  try {
    console.log(userRefreshToken);
    const user = verifyJwt(userRefreshToken); // user returned from verification has exp and iat properties
    const accessToken = createToken(
      { email: user.email },
      { expiresIn: "120s" }
    );
    const refreshToken = createToken(
      { email: user.email },
      { expiresIn: "1d" }
    );

    return res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    if (error instanceof Error)
      return res.status(401).json({ error: error.message });
    return res.status(401).json({ error: "Invalid refresh token" });
  }
};
