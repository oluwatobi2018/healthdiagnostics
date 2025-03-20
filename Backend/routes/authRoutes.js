const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("/controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", registerUser);

// @route   POST /api/auth/login
// @desc    Login user and get token
// @access  Public
router.post("/login", loginUser);

// @route   GET /api/auth/profile
// @desc    Get user profile (protected route)
// @access  Private (requires token)
router.get("/profile", protect, getUserProfile);

module.exports = router;
