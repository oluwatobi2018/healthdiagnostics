const express = require("express");
const { 
  getHospitals, 
  getHospitalById, 
  addHospital, 
  updateHospital, 
  deleteHospital 
} = require("/controllers/hospitalController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route   GET /api/hospitals
// @desc    Get all hospitals
// @access  Public
router.get("/", getHospitals);

// @route   GET /api/hospitals/:id
// @desc    Get hospital by ID
// @access  Public
router.get("/:id", getHospitalById);

// @route   POST /api/hospitals
// @desc    Add a new hospital
// @access  Private (Admin only)
router.post("/", protect, admin, addHospital);

// @route   PUT /api/hospitals/:id
// @desc    Update a hospital
// @access  Private (Admin only)
router.put("/:id", protect, admin, updateHospital);

// @route   DELETE /api/hospitals/:id
// @desc    Delete a hospital
// @access  Private (Admin only)
router.delete("/:id", protect, admin, deleteHospital);

module.exports = router;
