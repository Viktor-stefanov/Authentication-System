import { RowDataPacket } from "mysql2";

export interface DbUser extends RowDataPacket {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  signUpMethod: "email" | "google" | "facebook" | "x" | "github";
  role: "user" | "admin";
  createdAt: Date;
}
