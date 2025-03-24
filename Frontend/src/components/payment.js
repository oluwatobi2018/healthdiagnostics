import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handlePayment = async () => {
        try {
            const response = await axios.post('/api/pay', { email, amount });
            window.location.href = response.data.data.authorization_url;
        } catch (error) {
            setMessage('Payment initialization failed');
        }
    };

    return (
        <div>
            <h2>Make Payment</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <button onClick={handlePayment}>Pay Now</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Payment;
