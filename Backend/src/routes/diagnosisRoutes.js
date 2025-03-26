const express = require('express');
const router = express.Router();
const OpenAI = require('../services/openai');

router.post('/diagnose', async (req, res) => {
    try {
        const { symptoms } = req.body;
        if (!symptoms) return res.status(400).json({ error: 'Symptoms are required' });
        
        const diagnosis = await OpenAI.getDiagnosis(symptoms);
        res.json({ diagnosis });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process diagnosis' });
    }
});

module.exports = router;