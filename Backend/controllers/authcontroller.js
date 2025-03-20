const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // User Model
const logger = require("../config/logger"); // Logger
const dotenv = require("dotenv");

dotenv.config();

// JWT Secret & Expiration
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = "7d"; // Token valid for 7 days

/**
 * @route   POST /api/auth/register
 * @desc    Register new user
 * @access  Public
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password, age, sex, genotype, bloodGroup } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      name,
      email,
      password: hashedPassword,
      age,
      sex,
      genotype,
      bloodGroup,
    });

    await user.save();

    logger.info(`New user registered: ${email}`);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    logger.error("Registration error: " + error.message);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & get token
 * @access  Public
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

    logger.info(`User logged in: ${email}`);

    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    logger.error("Login error: " + error.message);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route   GET /api/auth/user
 * @desc    Get authenticated user
 * @access  Private
 */
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password"); // Exclude password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    logger.error("Fetch user error: " + error.message);
    res.status(500).json({ message: "Server error" });
}
};
