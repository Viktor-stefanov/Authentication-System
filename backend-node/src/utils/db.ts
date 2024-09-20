import { and, eq, QueryPromise } from "drizzle-orm";
import db from "../db/index.js";
import { usersTable } from "../db/schema/user.js";

type QueryError = Error & { code?: unknown };

export async function query<D, P extends QueryPromise<D>>(promise: P) {
  try {
    const result = await promise;
    return { data: result, error: null };
  } catch (e) {
    if (e instanceof Error) {
      return { data: null, error: e as QueryError };
    } else {
      throw e;
    }
  }
}

type UsersTableColumns = (typeof usersTable)["_"]["columns"];
type Field = keyof UsersTableColumns;

export const getUserBy = async <K extends Field>(
  field: K,
  value: UsersTableColumns[K]["_"]["data"]
) => {
  try {
    const [user] = await db
      .selectDistinct()
      .from(usersTable)
      .where(eq(usersTable[field], value))
      .execute();

    return user;
  } catch (e) {
    console.log(e);
  }
};
