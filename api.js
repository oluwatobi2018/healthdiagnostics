const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchHospitals = async (state) => {
  const response = await fetch(`${API_BASE_URL}/hospitals?state=${state}`);
  return response.json();
};

export const fetchDiagnosis = async (symptoms, state) => {
  const response = await fetch(`${API_BASE_URL}/diagnose`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ symptoms, state }),
  });
  return response.json();
};
 