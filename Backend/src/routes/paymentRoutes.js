const express = require('express');
const router = express.Router();
const { initiatePayment, verifyPayment } = require('../controllers/paymentController');

router.post('/pay', initiatePayment);
router.get('/verify-payment', verifyPayment);

module.exports = router;