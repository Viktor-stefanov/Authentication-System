import { Router } from "express";
import { protectedRoute, refreshToken, signIn, signUp, } from "../controllers/authController.js";
import { signUpSchema, signInSchema, validateRequest, } from "../middlewares/validateRequest.js";
const router = Router();
router.post("/signUp", validateRequest(signUpSchema), signUp);
router.post("/signIn", validateRequest(signInSchema), signIn);
router.get("/protected", protectedRoute, (req, res) => {
    return res.status(200).json({ message: "You are authorized" });
});
router.get("/refreshToken", refreshToken);
export default router;
