var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import pool from "../db/index.js";
export const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = user;
    try {
        yield pool.query("INSERT INTO users (name, email, password, role, createdAt) VALUES (?, ?, ?, ?, NOW())", [name, email, password, role]);
    }
    catch (error) {
        if (error instanceof Error &&
            "code" in error &&
            error.code === "ER_DUP_ENTRY") {
            throw new Error("Email already exists");
        }
        throw error;
    }
});
