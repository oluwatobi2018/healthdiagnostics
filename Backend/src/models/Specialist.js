const mongoose = require('mongoose');

const SpecialistSchema = new mongoose.Schema({
    name: String,
    specialty: String,
    hospital: String,
    state: String,
    contact: String,
    latitude: Number,
    longitude: Number
});

module.exports = mongoose.model('Specialist', SpecialistSchema);
