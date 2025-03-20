const express = require("express");
const { 
  getPharmacies, 
  getPharmacyById, 
  addPharmacy, 
  updatePharmacy, 
  deletePharmacy 
} = require("/controllers/pharmacyController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route   GET /api/pharmacies
// @desc    Get all pharmacies
// @access  Public
router.get("/", getPharmacies);

// @route   GET /api/pharmacies/:id
// @desc    Get pharmacy by ID
// @access  Public
router.get("/:id", getPharmacyById);

// @route   POST /api/pharmacies
// @desc    Add a new pharmacy
// @access  Private (Admin only)
router.post("/", protect, admin, addPharmacy);

// @route   PUT /api/pharmacies/:id
// @desc    Update a pharmacy
// @access  Private (Admin only)
router.put("/:id", protect, admin, updatePharmacy);

// @route   DELETE /api/pharmacies/:id
// @desc    Delete a pharmacy
// @access  Private (Admin only)
router.delete("/:id", protect, admin, deletePharmacy);

module.exports = router;
