import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as userSchema from "./schema/user.js";
dotenv.config();
const { Client } = pg;
const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TABLE,
});
await client
    .connect()
    .then(() => console.log("Connected to DB successfully"))
    .catch((error) => {
    console.log(`Error on connecting to DB: ${error}`);
    process.exit(1);
});
export default drizzle(client, { schema: userSchema });
