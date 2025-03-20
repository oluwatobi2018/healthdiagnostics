const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

// Configure payment provider (Paystack or Flutterwave)
const PAYMENT_PROVIDER = process.env.PAYMENT_PROVIDER || "paystack";
const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET;
const FLUTTERWAVE_SECRET = process.env.FLUTTERWAVE_SECRET;

/**
 * Initialize a payment transaction
 * @param {string} email - Customer's email
 * @param {number} amount - Amount in kobo (Paystack) or kobo equivalent
 * @param {string} currency - Currency (default: NGN)
 * @returns {Promise<Object>} - Payment response
 */
const initiatePayment = async (email, amount, currency = "NGN") => {
  try {
    let response;
    
    if (PAYMENT_PROVIDER === "paystack") {
      response = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        { email, amount, currency },
        { headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` } }
      );
    } else if (PAYMENT_PROVIDER === "flutterwave") {
      response = await axios.post(
        "https://api.flutterwave.com/v3/payments",
        { tx_ref: `tx_${Date.now()}`, amount, currency, redirect_url: process.env.PAYMENT_REDIRECT_URL, customer: { email } },
        { headers: { Authorization: `Bearer ${FLUTTERWAVE_SECRET}` } }
      );
    }

    return response.data;
  } catch (error) {
    console.error("Payment initiation error:", error.response?.data || error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Verify a payment transaction
 * @param {string} reference - Payment reference from provider
 * @returns {Promise<Object>} - Verification response
 */
const verifyPayment = async (reference) => {
  try {
    let response;
    
    if (PAYMENT_PROVIDER === "paystack") {
      response = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        { headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` } }
      );
    } else if (PAYMENT_PROVIDER === "flutterwave") {
      response = await axios.get(
        `https://api.flutterwave.com/v3/transactions/${reference}/verify`,
        { headers: { Authorization: `Bearer ${FLUTTERWAVE_SECRET}` } }
      );
    }

    return response.data;
  } catch (error) {
    console.error("Payment verification error:", error.response?.data || error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { initiatePayment, verifyPayment };
