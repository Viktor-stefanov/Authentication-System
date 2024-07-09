import express from "express";
import { validateSignUp } from "../schemas/auth.js";
import { createUser } from "../db/index.js";

const router = express.Router();

router.post("/signUp", async (req, res) => {
  const { name, email, password, confirmPassword, signUpMethod } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  const zodErrors = validateSignUp({
    name,
    email,
    password,
    confirmPassword,
    signUpMethod,
  });

  if (zodErrors.length > 0) return res.status(400).json({ errors: zodErrors });

  const result = await createUser({
    name,
    email,
    password,
    signUpMethod,
  });

  if (result.errors) return res.status(400).json(result.errors);

  setTimeout(() => res.status(200).json({ success: true }), 3000);
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
