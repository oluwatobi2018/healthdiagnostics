import axios from 'axios';

const API_BASE_URL = '/api/users';

const UserService = {
    register: async (userData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/register`, userData);
            return response.data;
        } catch (error) {
            console.error("Error registering user", error);
            throw error;
        }
    },

    login: async (credentials) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, credentials);
            return response.data;
        } catch (error) {
            console.error("Error logging in", error);
            throw error;
        }
    },

    getUserProfile: async (userId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/profile?userId=${userId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching user profile", error);
            throw error;
        }
    }
};

export default UserService;
