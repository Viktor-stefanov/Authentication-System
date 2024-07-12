import express from "express";
import { validateSignUp } from "../schemas/auth.js";
import { signUpUser, signInUser, authenticateUser } from "../db/auth.js";

const router = express.Router();

router.post("/signUp", async (req, res) => {
  const { name, email, password, confirmPassword, role, signUpMethod } =
    req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  const zodErrors = validateSignUp({
    name,
    email,
    password,
    confirmPassword,
    role,
    signUpMethod,
  });

  if (zodErrors.length > 0) return res.status(400).json(zodErrors);

  const result = await signUpUser({
    name,
    email,
    password,
    role,
    signUpMethod,
  });

  if (result.error) return res.status(400).json(result.error);

  setTimeout(() => res.status(200).json(result), 3000);
});

router.post("/signIn", async (req, res) => {
  const { email, pwd } = req.body;
  if (!email || !pwd)
    return res.status(400).json({ message: "All fields are required" });

  const result = await signInUser(email, pwd);
  if (!result.success) return res.status(400).json(result);

  res.status(200).json(result);
});

router.post("/profile", authenticateUser, (req, res) => {
  // TODO: fetch extra information about the user to display in the profile section
});

export default router;
