import Hospital from "../models/hospitalModel.js";

// Get All Hospitals
export const getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Single Hospital by ID
export const getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    res.json(hospital);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add New Hospital
export const addHospital = async (req, res) => {
  try {
    const { name, location, services } = req.body;

    const hospital = new Hospital({
      name,
      location,
      services,
    });

    await hospital.save();
    res.status(201).json(hospital);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete Hospital
export const deleteHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    await hospital.deleteOne();
    res.json({ message: "Hospital deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
