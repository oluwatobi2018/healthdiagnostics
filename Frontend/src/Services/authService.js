import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/auth";

/**
 * Login user
 * @param {Object} credentials - { email, password }
 * @returns {Promise<Object>} - User data & token
 */
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};

/**
 * Register user
 * @param {Object} userData - { name, email, password }
 * @returns {Promise<Object>} - User data & token
 */
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed";
  }
};

/**
 * Logout user (removes from localStorage)
 */
export const logout = () => {
  localStorage.removeItem("user");
};

/**
 * Get the current authenticated user
 * @returns {Object | null}
 */
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};
