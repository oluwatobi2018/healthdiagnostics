import axios from 'axios';

const API_BASE_URL = '/api/ambulances';

const AmbulanceService = {
    getAmbulances: async (state) => {
        try {
            const response = await axios.get(`${API_BASE_URL}?state=${state}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching ambulance services", error);
            throw error;
        }
    },

    bookAmbulance: async (ambulanceId, userDetails) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/book`, {
                ambulanceId,
                userDetails,
            });
            return response.data;
        } catch (error) {
            console.error("Error booking ambulance", error);
            throw error;
        }
    }
};

export default AmbulanceService;
