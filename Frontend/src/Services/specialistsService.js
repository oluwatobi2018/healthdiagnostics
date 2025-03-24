import axios from 'axios';

const API_BASE_URL = '/api/specialists';

const SpecialistService = {
    getSpecialists: async (state, specialty) => {
        try {
            const response = await axios.get(`${API_BASE_URL}?state=${state}&specialty=${specialty || ''}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching specialists", error);
            throw error;
        }
    },

    bookSpecialist: async (specialistId, userDetails) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/book`, {
                specialistId,
                userDetails,
            });
            return response.data;
        } catch (error) {
            console.error("Error booking specialist appointment", error);
            throw error;
        }
    }
};

export default SpecialistService;
