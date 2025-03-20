const Hospital = require("../models/Hospital");
const logger = require("../config/logger");

/**
 * @route   GET /api/hospitals
 * @desc    Get all hospitals
 * @access  Public
 */
exports.getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.json(hospitals);
  } catch (error) {
    logger.error("Error fetching hospitals: " + error.message);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route   GET /api/hospitals/:id
 * @desc    Get hospital by ID
 * @access  Public
 */
exports.getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) return res.status(404).json({ message: "Hospital not found" });

    res.json(hospital);
  } catch (error) {
    logger.error("Error fetching hospital: " + error.message);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route   GET /api/hospitals/search
 * @desc    Search hospitals by name, state, LGA, or specialty
 * @access  Public
 */
exports.searchHospitals = async (req, res) => {
  try {
    const { name, state, lga, specialty } = req.query;
    let query = {};

    if (name) query.name = new RegExp(name, "i"); // Case-insensitive search
    if (state) query.state = state;
    if (lga) query.lga = lga;
    if (specialty) query.specialty = new RegExp(specialty, "i");

    const hospitals = await Hospital.find(query);
    res.json(hospitals);
  } catch (error) {
    logger.error("Error searching hospitals: " + error.message);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route   POST /api/hospitals
 * @desc    Add a new hospital (Admin Only)
 * @access  Private (Admin)
 */
exports.addHospital = async (req, res) => {
  try {
    const { name, state, lga, address, phone, specialty } = req.body;

    // Ensure all fields are provided
    if (!name || !state || !lga || !address || !phone || !specialty) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newHospital = new Hospital({ name, state, lga, address, phone, specialty });
    await newHospital.save();

    logger.info(`New hospital added: ${name}`);
    res.status(201).json({ message: "Hospital added successfully", hospital: newHospital });
  } catch (error) {
    logger.error("Error adding hospital: " + error.message);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route   DELETE /api/hospitals/:id
 * @desc    Delete a hospital (Admin Only)
 * @access  Private (Admin)
 */
exports.deleteHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) return res.status(404).json({ message: "Hospital not found" });

    await hospital.deleteOne();
    logger.info(`Hospital deleted: ${hospital.name}`);
    res.json({ message: "Hospital deleted successfully" });
  } catch (error) {
    logger.error("Error deleting hospital: " + error.message);
    res.status(500).json({ message: "Server error" });
  }
};
