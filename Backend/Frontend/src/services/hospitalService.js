const API_URL = "https://your-api.com/api/hospitals"; // Update with your backend URL

// Get all hospitals
export const getHospitals = async () => {
  try {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to fetch hospitals");

    return data;
  } catch (error) {
    throw error;
  }
};

// Get hospital by ID
export const getHospitalById = async (hospitalId) => {
  try {
    const response = await fetch(`${API_URL}/${hospitalId}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Hospital not found");

    return data;
  } catch (error) {
    throw error;
  }
};

// Search hospitals by state or LGA
export const searchHospitals = async (state, lga) => {
  try {
    const response = await fetch(`${API_URL}/search?state=${state}&lga=${lga}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "No hospitals found");

    return data;
  } catch (error) {
    throw error;
  }
};
