const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    name: String,
    email: String,
    amount: Number,
    reference: String,
    status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', PaymentSchema);