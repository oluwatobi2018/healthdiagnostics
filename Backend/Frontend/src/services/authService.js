const API_URL = "https://your-api.com/api/auth"; // Update with your backend URL

// Register User
export const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Registration failed");

    return data;
  } catch (error) {
    throw error;
  }
};

// Login User
export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Login failed");

    // Save token & user details in localStorage
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);

    return data;
  } catch (error) {
    throw error;
  }
};

// Logout User
export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

// Get Authenticated User
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// Get Auth Token
export const getToken = () => {
  return localStorage.getItem("token");
};
