import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // id & role
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzBhOTgxYjE2ZWY2OGRlNjkzMWM1MiIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTc2ODk5MTMyNywiZXhwIjoxNzY5MDc3NzI3fQ.Dr2nBZ6xtZz4khZ8NSrcufbEsD0rpFlO9X-9A3Q0zWw",