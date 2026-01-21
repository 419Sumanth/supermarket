import express from "express";
import User from "../models/User.js";
import { registerUser, loginUser } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);


/* ---------------------------
   TEST AUTH ROUTE
---------------------------- */
router.get("/test", (req, res) => {
  res.json({ message: "Auth route working" });
});

/* ---------------------------
   REGISTER USER
---------------------------- */
router.post("/register", async (req, res) => {
  try {
    console.log("REGISTER HIT");
    console.log("BODY:", req.body);

    const {
      Name,
      Type,
      Email,
      password,
      DOB,
      Mobile,
      isActive
    } = req.body;

    // basic validation
    if (!Name || !Email || !password) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    // check existing user
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const user = new User({
      Name,
      Type,
      Email,
      password,
      DOB,
      Mobile,
      isActive
    });

    await user.save();

    console.log("USER SAVED:", user);

    res.status(201).json(user);
  } catch (error) {
    console.error("REGISTER ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
});

/* ---------------------------
   LOGIN USER
---------------------------- */
router.post("/login", async (req, res) => {
  try {
    console.log("LOGIN HIT");
    console.log("BODY:", req.body);

    const { Email, password } = req.body;

    const user = await User.findOne({ Email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // plain password check (JWT later)
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      user
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
