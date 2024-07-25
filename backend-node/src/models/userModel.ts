import pool from "../db/index.js";
import { User } from "../types/auth.js";

export const createUser = async (user: User): Promise<void> => {
  const { name, email, password, role } = user;
  try {
    await pool.query(
      "INSERT INTO users (name, email, password, role, createdAt) VALUES (?, ?, ?, ?, NOW())",
      [name, email, password, role]
    );
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "ER_DUP_ENTRY"
    ) {
      throw new Error("Email already exists");
    }
    throw error;
  }
};
