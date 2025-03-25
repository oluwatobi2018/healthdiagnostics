import axios from 'axios';

const API_BASE_URL = '/api/payments';

const PaymentService = {
    initiatePayment: async (name, email, amount) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/pay`, {
                name,
                email,
                amount,
            });
            return response.data;
        } catch (error) {
            console.error("Error initiating payment", error);
            throw error;
        }
    },

    verifyPayment: async (reference) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/verify-payment?reference=${reference}`);
            return response.data;
        } catch (error) {
            console.error("Error verifying payment", error);
            throw error;
        }
    }
};

export default PaymentService;