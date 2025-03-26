const express = require('express');
const router = express.Router();
const { createUser, registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserAccount } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Create a new user
router.post('/create', createUser);

// Get user profile (protected route)
router.get('/profile', protect, getUserProfile);

// Update user profile (protected route)
router.put('/profile', protect, updateUserProfile);

// Delete user account (protected route)
router.delete('/profile', protect, deleteUserAccount);

module.exports = router;

