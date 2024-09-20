import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const passwordsMatch = async (password: string, dbPassword: string) => {
  return await bcrypt.compare(password, dbPassword);
};
