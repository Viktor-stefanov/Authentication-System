import db from "../db/index.js";
import { usersTable } from "../db/schema/user.js";
import { query } from "../utils/db.js";

export const createUser = async (user: typeof usersTable.$inferInsert) => {
  const { data, error } = await query(
    db.insert(usersTable).values(user).returning()
  );
  if (
    error?.code === "23505" && // UNIQUE CONSTRAINT
    error?.message ===
      'duplicate key value violates unique constraint "users_email_key"'
  ) {
    throw new Error("User with this email already exists.");
  }

  return data?.at(0)?.id;
};
