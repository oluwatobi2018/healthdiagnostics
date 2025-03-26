const mongoose = require('mongoose');

const DiagnosisSchema = new mongoose.Schema({
    symptoms: { type: String, required: true },
    diagnosis: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Diagnosis', DiagnosisSchema);

