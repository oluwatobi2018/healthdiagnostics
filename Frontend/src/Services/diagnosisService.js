import axios from 'axios';

const API_URL = '/api/diagnose';

const DiagnosisService = {
    getDiagnosis: async (symptoms, userId) => {
        try {
            const response = await axios.post(API_URL, { symptoms, userId });
            return response.data.diagnosis;
        } catch (error) {
            console.error('Error fetching diagnosis:', error);
            throw new Error('Failed to get diagnosis');
        }
    }
};

export default DiagnosisService;
