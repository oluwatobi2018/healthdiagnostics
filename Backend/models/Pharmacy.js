const mongoose = require("mongoose");

const PharmacySchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  openingHours: { type: String, required: true },
  availableMedications: { type: [String], required: true }, // List of medications
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Pharmacy", PharmacySchema);
