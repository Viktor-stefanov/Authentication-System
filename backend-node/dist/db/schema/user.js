import { timestamp, pgEnum, pgTable, serial, char, varchar, } from "drizzle-orm/pg-core";
// export const userSchema = pgSchema("auth_system");
export const roleEnum = pgEnum("role", ["user", "admin"]);
export const authEnum = pgEnum("authMethod", ["form", "google", "github"]);
export const usersTable = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    email: varchar("email", { length: 256 }),
    password: char("password", { length: 72 }),
    role: roleEnum("role"),
    authMethod: authEnum("auth_method"),
    createdAt: timestamp("created_at").defaultNow(),
});
