import axios from 'axios';

const API_BASE_URL = '/api/appointments';

const AppointmentService = {
    bookAppointment: async (specialistId, userDetails) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/book`, {
                specialistId,
                userDetails,
            });
            return response.data;
        } catch (error) {
            console.error("Error booking appointment", error);
            throw error;
        }
    },

    getAppointments: async (userId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}?userId=${userId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching appointments", error);
            throw error;
        }
    }
};

export default AppointmentService;
