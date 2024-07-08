import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  signUpMethod: string;
  createdAt: Date;
}
