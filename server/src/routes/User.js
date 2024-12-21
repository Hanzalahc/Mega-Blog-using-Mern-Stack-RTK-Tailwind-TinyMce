import express from "express";
const router = express.Router();
import { registerUser, loginUser, logoutUser } from "../controllers/User.js";
import { isAuthenticated } from "../middlewares/isAuth.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", isAuthenticated, logoutUser);

export default router;
