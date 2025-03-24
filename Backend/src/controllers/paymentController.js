const axios = require('axios');
const PAYSTACK_SECRET = 'your-paystack-secret-key';

exports.initiatePayment = async (req, res) => {
    const { email, amount } = req.body;
    
    try {
        const response = await axios.post('https://api.paystack.co/transaction/initialize', {
            email,
            amount: amount * 100, // Convert to kobo
            currency: 'NGN'
        }, {
            headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Payment initialization failed' });
    }
};

exports.verifyPayment = async (req, res) => {
    const { reference } = req.query;
    
    try {
        const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Payment verification failed' });
    }
};
