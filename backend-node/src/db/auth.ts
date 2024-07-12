import { SignUpSchema } from "../schemas/auth.js";
import { User } from "../schemas/db_user.js";
import { format } from "date-fns";
import pool from "./index.js";
import { createJwt, hashPassword, verifyJwt } from "../utils/auth.js";
import { ResultSetHeader } from "mysql2";
import { NextFunction, Request, Response } from "express";

export const signUpUser = async (
  user: Omit<SignUpSchema, "confirmPassword">
) => {
  const [userWithEmail] = await pool.query<User[]>(
    "SELECT * FROM users WHERE email = ?",
    [user.email]
  );
  if (userWithEmail.length > 0) return { email: "Email already exists" };

  const [firstName, lastName] = user.name.split(" ");
  const hashedPassword = hashPassword(user.password);
  try {
    const [res] = await pool.execute<ResultSetHeader>(
      "INSERT INTO users (firstName, lastName, email, password, role, signUpMethod, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        firstName,
        lastName || "",
        user.email,
        hashedPassword,
        user.role,
        user.signUpMethod,
        format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      ]
    );

    const token = createJwt(res.insertId.toString());

    return { token };
  } catch (error) {
    return { error: "A user with this email already already exists" };
  }
};

export const signInUser = async (email: string, pwd: string) => {
  const [usersWithEmail] = await pool.query<User[]>(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  if (usersWithEmail.length !== 0)
    return { email: "A user with this email does not exist" };

  const hashedPwd = hashPassword(pwd);
  const [user] = await pool.query<User[]>(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, hashedPwd]
  );
  if (user.length === 0) return { email: "Incorrect email or password" };

  return { success: true };
};

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = verifyJwt(token);
      next();
    } else {
      return { error: "No jwt provided" };
    }
  } catch (error) {
    return {
      error: "Invalid jwt provided",
    };
  }
};
