import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/hospitals";

/**
 * Fetch all hospitals
 * @returns {Promise<Array>} - List of hospitals
 */
export const getHospitals = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch hospitals";
  }
};

/**
 * Get a specific hospital by ID
 * @param {string} id - Hospital ID
 * @returns {Promise<Object>} - Hospital details
 */
export const getHospitalById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch hospital details";
  }
};

/**
 * Search hospitals by name or location
 * @param {string} query - Search keyword (name, location, specialty)
 * @returns {Promise<Array>} - List of matching hospitals
 */
export const searchHospitals = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/search?query=${query}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to search hospitals";
  }
};
