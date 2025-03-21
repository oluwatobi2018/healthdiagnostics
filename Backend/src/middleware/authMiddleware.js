import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { JWT_SECRET } from "../config/constants.js";

// Middleware to authenticate user
const protect = async (req, res, next) => {
  let token;

  // Check if the token is present in headers
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Fetch user from DB and attach to request object (excluding password)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next(); // Proceed to the next middleware
    } catch (error) {
      return res.status(401).json({ message: "Invalid token", error: error.message });
    }
  } else {
    return res.status(401).json({ message: "No token provided, authorization denied" });
  }
};

export default protect;
