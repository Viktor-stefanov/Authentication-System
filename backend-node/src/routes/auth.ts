import express from "express";
import { signUpSchema, validateSignUp } from "../schemas/auth.js";
import { createUser } from "../db/index.js";

const router = express.Router();

router.post("/signUp", async (req, res) => {
  const { name, email, password, confirmPassword, signUpMethod } = req.body;
  if (!name || !email || !password)
    res.status(400).json({ message: "All fields are required" });

  const zodErrors = validateSignUp({
    name,
    email,
    password,
    confirmPassword,
    signUpMethod,
  });

  if (zodErrors.length > 0) res.status(400).json({ errors: zodErrors });

  const result = await createUser({
    name,
    email,
    password,
    signUpMethod,
  });

  if (result.errors) res.status(400).json(result.errors);

  res.status(200).json({ success: true });
});

router.post("/login", (req, res) => {
  const { email, pwd } = req.body;
  if (!email || !pwd)
    return res.status(400).json({ message: "All fields are required" });

  // TODO: check if user exists and password is correct
  // ...

  res.status(200).json({ message: "Login successful" });
});

export default router;
