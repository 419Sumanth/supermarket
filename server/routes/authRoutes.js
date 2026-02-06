import express from "express";
import { registerUser, loginUser, getProfile } from "../controllers/authController.js"
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// User routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile",authMiddleware, getProfile);

// Admin routes
// router.post("/admin/login",loginAdmin);
// router.post("/admin/register",registerUser);

export default router;
