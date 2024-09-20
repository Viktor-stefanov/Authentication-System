import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { createUser } from "../models/userModel.js";
import { hashPassword } from "../utils/crypto.js";
import { createJwt, verifyJwt } from "../utils/auth.js";
import { getUserBy } from "../utils/db.js";
dotenv.config();

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const hashedPassword = await hashPassword(req.user.password);
    req.user.password = hashedPassword;

    const userId = await createUser(req.user);
    const accessToken = createJwt(
      { id: userId },
      { expiresIn: process.env.JWT_DURATION! }
    );
    const refreshToken = createJwt({ id: userId }, { expiresIn: "30d" });

    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);

    return res.status(201).end();
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
    return res.status(500).json({ erorr: "Internal Server Error" });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const user = await getUserBy("email", req.user.email);
    if (!user) {
      return res
        .status(401)
        .json({ error: "A user with those credentials doesn't exist" });
    }

    const accessToken = createJwt(
      { id: user.id },
      { expiresIn: process.env.JWT_DURATION! }
    );
    const refreshToken = createJwt({ id: user.id }, { expiresIn: "30d" });

    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);

    return res.status(200).end();
  } catch (e) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ error: "No authorization token provided in cookie." });

    const tokenData = verifyJwt(token);
    const user = getUserBy("id", tokenData.id);

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof Error)
      return res.status(401).json({ error: error.message });
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const userRefreshToken = req.headers["authorization"]?.split(" ")[1];
  if (!userRefreshToken)
    return res
      .status(401)
      .json({ error: "Access denied. No refresh token provided" });

  try {
    const tokenData = verifyJwt(userRefreshToken); // user returned from verification has exp and iat properties
    const user = await getUserBy("id", tokenData.id);

    const accessToken = createJwt(
      { email: user?.email },
      { expiresIn: process.env.JWT_DURATION! }
    );
    const refreshToken = createJwt(
      { email: user?.email },
      { expiresIn: "30d" }
    );

    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);

    return res.status(200).end();
  } catch (error) {
    if (error instanceof Error)
      return res.status(401).json({ error: error.message });
    return res.status(401).json({ error: "Invalid refresh token" });
  }
};
