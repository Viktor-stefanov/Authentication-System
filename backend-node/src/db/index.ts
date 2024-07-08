import mysql from "mysql2/promise";
import dotenv from "dotenv";
import crypto from "crypto";
import { SignUpSchema } from "../schemas/auth.js";
import { User } from "../schemas/db_user.js";
import { format } from "date-fns";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const hashPassword = (password: string) =>
  crypto.createHash("sha512").update(password).digest("hex");

// TODO: create the shape of the DB
export const createUser = async (
  user: Omit<SignUpSchema, "confirmPassword">
) => {
  try {
    const [rows] = await pool.query<User[]>(
      "SELECT * FROM users WHERE email = ?",
      [user.email]
    );
    if (rows.length > 0) return { errors: { email: "Email already exists" } };

    const [firstName, lastName] = user.name.split(" ");
    const hashedPassword = hashPassword(user.password);
    const [res, insertedId] = await pool.execute(
      "INSERT INTO users (firstName, lastName, email, password, signUpMethod, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
      [
        firstName,
        lastName,
        user.email,
        hashedPassword,
        user.signUpMethod,
        format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      ]
    );

    return { sucess: true };
  } catch (error) {
    return { errors: { error: error } };
  }
};
