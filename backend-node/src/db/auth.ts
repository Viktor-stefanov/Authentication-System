import pool from "./index.js";
import { HttpUserData } from "../schemas/auth.js";
import { ResultSetHeader } from "mysql2";
import { NextFunction, Request, Response } from "express";
import { DbUser } from "../schemas/db_user.js";
import { format } from "date-fns";
import { createAccessToken, hashPassword, verifyJwt } from "../utils/auth.js";

export const signUpUser = async (user: HttpUserData) => {
  try {
    const [userWithEmail] = await pool.query<DbUser[]>(
      "SELECT * FROM users WHERE email = ?",
      [user.email]
    );
    if (userWithEmail.length > 0)
      return { errors: [{ email: "Email already exists" }] };

    const [firstName, lastName] = user.name.split(" ");
    const hashedPassword = hashPassword(user.password);
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
    console.log("before create access token", user);
    const token = createAccessToken(user);
    console.log("after create access token", token);

    return { ...user, token };
  } catch (error) {
    // TODO: add logging
    return { errors: [{ error: "Something went wrong..." }] };
  }
};

export const signInUser = async (email: string, pwd: string) => {
  try {
    const [usersWithEmail] = await pool.query<DbUser[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (usersWithEmail.length !== 0)
      return { errors: [{ error: "Incorrect credentials" }] };

    const hashedPwd = hashPassword(pwd);
    const [user] = await pool.query<DbUser[]>(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, hashedPwd]
    );
    if (user.length === 0) return { error: "Incorrect credentials" };
    if (user.length > 1) return { error: "wtf" }; // :D
    const token = createAccessToken({
      ...user[0],
      name: user[0].firstName + " " + user[0].lastName,
    });

    return { ...user, token };
  } catch (error) {
    return { errors: [{ error: "Something went wrong" }] };
  }
};

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.cookies);
    if (req.cookies.accessToken) {
      req.body.user = verifyJwt(req.cookies.accessToken);
      next();
    } else {
      return res.status(400).json({ error: "No jwt provided" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
