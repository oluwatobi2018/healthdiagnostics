const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: String, required: true },
  specialties: { type: [String], required: true }, // Array of medical specialties
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  website: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Hospital", HospitalSchema);
