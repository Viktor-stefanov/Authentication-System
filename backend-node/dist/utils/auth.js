import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { JsonWebTokenError } = jwt;
export const createToken = (payload, options) => {
    return jwt.sign(payload, process.env.JWT_SECRET, options);
};
export const verifyJwt = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    }
    catch (error) {
        if (error instanceof JsonWebTokenError &&
            error.name === "TokenExpiredError") {
            throw new Error("Token expired");
        }
        throw new Error("Invalid token");
    }
};
