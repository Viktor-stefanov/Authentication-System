import bcrypt from "bcrypt";
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};
export const passwordsMatch = async (password, dbPassword) => {
    return await bcrypt.compare(password, dbPassword);
};
