import express from "express";
import { HttpUserData, validateSignUp } from "../schemas/auth.js";
import { signUpUser, signInUser, authenticateUser } from "../db/auth.js";
import { createAccessToken, verifyJwt } from "../utils/auth.js";

const router = express.Router();

router.post("/signUp", async (req, res) => {
  const { name, email, password, confirmPassword, role, signUpMethod } =
    req.body;
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ errors: [{ message: "All fields are required" }] });

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
  if (result.errors) return res.status(400).json(result.errors);

  setTimeout(() => res.status(200).json(result), 2000);
});

router.post("/signIn", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ errors: [{ message: "All fields are required" }] });

  const result = await signInUser(email, password);
  if (result.error) return res.status(400).json(result);

  res.status(200).json(result);
});

router.get("/protectedRoute", authenticateUser, (req, res) => {
  // TODO: fetch extra information about the user to display in the profile section
  res.send({ success: true });
});

router.post("/refreshToken", (req, res) => {
  const refreshToken = req.cookies["refreshToken"];
  if (!refreshToken)
    return res
      .status(401)
      .json({ error: "Access denied. No refresh token provided" });

  const decoded = verifyJwt(refreshToken);
  if (decoded.error) return res.status(400).json(decoded);
  const accessToken = createAccessToken(decoded.user!); // type inference is not on level here

  res.header("Authorization", accessToken).send(decoded.user);
});

export default router;
