import jwt from "jsonwebtoken";
import Users from "../models/User.js";
import bcrypt from "bcryptjs";

/* ===============================
   REGISTER USER
================================ */
export const registerUser = async (req, res) => {
  try {
    const {
      Name,
      Type,
      Email,
      password,
      DOB,
      Mobile,
      isActive
    } = req.body;

    // 1️⃣ Validate required fields
    if (
      !Name ||
      !Type ||
      !Email ||
      !password ||
      !DOB ||
      !Mobile
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await Users.findOne({ Email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // 3️⃣ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);//salt or 10

    // 4️⃣ Create user
    const newUser = new Users({
      Name,
      Type,
      Email,
      password: hashedPassword,
      DOB,
      Mobile,
      isActive: isActive ?? true
    });

    await newUser.save();

    console.log("USER REGISTERED:", newUser);

    res.status(201).json({
      message: "User registered successfully",
      user: newUser
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
};

/* ===============================
   LOGIN USER
================================ */
  export const loginUser = async (req, res) => {
  try {
    const { Email, password } = req.body;

    if (!Email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await Users.findOne({ Email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔐 CREATE TOKEN
    const token = jwt.sign(
      { id: user._id, role: user.Type },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
};

 