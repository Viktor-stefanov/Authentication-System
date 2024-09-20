import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { usersTable } from "../db/schema/user.js";
export async function query(promise) {
    try {
        const result = await promise;
        return { data: result, error: null };
    }
    catch (e) {
        if (e instanceof Error) {
            return { data: null, error: e };
        }
        else {
            throw e;
        }
    }
}
export const getUserBy = async (field, value) => {
    try {
        const [user] = await db
            .selectDistinct()
            .from(usersTable)
            .where(eq(usersTable[field], value))
            .execute();
        return user;
    }
    catch (e) {
        console.log(e);
    }
};
