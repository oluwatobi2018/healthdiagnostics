// controllers/diagnosis.js
const Diagnosis = require('../models/diagnosis');
const OpenAI = require('../services/openai');

exports.getDiagnosis = async (req, res) => {
    try {
        const { symptoms, userId } = req.body;
        if (!symptoms || !userId) {
            return res.status(400).json({ error: 'Symptoms and user ID are required' });
        }

        const diagnosisText = await OpenAI.getDiagnosis(symptoms);

        const diagnosis = new Diagnosis({
            symptoms,
            diagnosis: diagnosisText,
            user: userId,
        });

        await diagnosis.save();

        res.json({ diagnosis });
    } catch (error) {
        console.error('Diagnosis Error:', error);
        res.status(500).json({ error: 'Failed to process diagnosis' });
    }
};

exports.getUserDiagnoses = async (req, res) => {
    try {
        const { userId } = req.params;
        const diagnoses = await Diagnosis.find({ user: userId }).sort({ createdAt: -1 });
        res.json(diagnoses);
    } catch (error) {
        console.error('Fetch Diagnosis Error:', error);
        res.status(500).json({ error: 'Failed to fetch diagnoses' });
    }
};
