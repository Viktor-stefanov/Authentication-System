import { Router } from "express";
import { protectedRoute, refreshToken, signUp, signUpSchema, } from "../controllers/authController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
const router = Router();
router.post("/signUp", validateRequest(signUpSchema), signUp);
router.get("/protected", protectedRoute, (req, res) => {
    return res.status(200).json({ message: "You are authorized" });
});
router.get("/refreshToken", refreshToken);
export default router;
