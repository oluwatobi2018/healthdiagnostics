const Pharmacy = require("../models/Pharmacy");
const logger = require("../config/logger");

/**
 * @route   GET /api/pharmacies
 * @desc    Get all pharmacies
 * @access  Public
 */
exports.getPharmacies = async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find();
    res.json(pharmacies);
  } catch (error) {
    logger.error("Error fetching pharmacies: " + error.message);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route   GET /api/pharmacies/:id
 * @desc    Get pharmacy by ID
 * @access  Public
 */
exports.getPharmacyById = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findById(req.params.id);
    if (!pharmacy) return res.status(404).json({ message: "Pharmacy not found" });

    res.json(pharmacy);
  } catch (error) {
    logger.error("Error fetching pharmacy: " + error.message);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route   GET /api/pharmacies/search
 * @desc    Search pharmacies by name, state, LGA, or medication
 * @access  Public
 */
exports.searchPharmacies = async (req, res) => {
  try {
    const { name, state, lga, medication } = req.query;
    let query = {};

    if (name) query.name = new RegExp(name, "i"); // Case-insensitive search
    if (state) query.state = state;
    if (lga) query.lga = lga;
    if (medication) query.medications = new RegExp(medication, "i"); // Search for medicine in inventory

    const pharmacies = await Pharmacy.find(query);
    res.json(pharmacies);
  } catch (error) {
    logger.error("Error searching pharmacies: " + error.message);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route   POST /api/pharmacies
 * @desc    Add a new pharmacy (Admin Only)
 * @access  Private (Admin)
 */
exports.addPharmacy = async (req, res) => {
  try {
    const { name, state, lga, address, phone, medications } = req.body;

    // Ensure all fields are provided
    if (!name || !state || !lga || !address || !phone || !medications) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPharmacy = new Pharmacy({ name, state, lga, address, phone, medications });
    await newPharmacy.save();

    logger.info(`New pharmacy added: ${name}`);
    res.status(201).json({ message: "Pharmacy added successfully", pharmacy: newPharmacy });
  } catch (error) {
    logger.error("Error adding pharmacy: " + error.message);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route   DELETE /api/pharmacies/:id
 * @desc    Delete a pharmacy (Admin Only)
 * @access  Private (Admin)
 */
exports.deletePharmacy = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findById(req.params.id);
    if (!pharmacy) return res.status(404).json({ message: "Pharmacy not found" });

    await pharmacy.deleteOne();
    logger.info(`Pharmacy deleted: ${pharmacy.name}`);
    res.json({ message: "Pharmacy deleted successfully" });
  } catch (error) {
    logger.error("Error deleting pharmacy: " + error.message);
    res.status(500).json({ message: "Server error" });
  }
};
