import React, { useState } from "react";

const DiagnosisForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    sex: "",
    genotype: "",
    bloodGroup: "",
    state: "",
    symptoms: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("http://localhost:5000/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          symptoms: formData.symptoms.split(",").map((s) => s.trim()),
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error fetching diagnosis:", error);
    }
    
    setLoading(false);
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Health Diagnosis System</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required className="border p-2 w-full" />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} required className="border p-2 w-full" />
        <select name="sex" onChange={handleChange} required className="border p-2 w-full">
          <option value="">Select Sex</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select name="genotype" onChange={handleChange} required className="border p-2 w-full">
          <option value="">Select Genotype</option>
          <option value="AA">AA</option>
          <option value="AS">AS</option>
          <option value="SS">SS</option>
        </select>
        <select name="bloodGroup" onChange={handleChange} required className="border p-2 w-full">
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
        <input type="text" name="state" placeholder="State" onChange={handleChange} required className="border p-2 w-full" />
        <textarea name="symptoms" placeholder="Enter symptoms separated by commas" onChange={handleChange} required className="border p-2 w-full"></textarea>
        <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 w-full">
          {loading ? "Processing..." : "Get Diagnosis"}
        </button>
      </form>

      {result && (
        <div className="mt-5 p-3 border">
          <h3 className="text-xl font-bold">Diagnosis Result</h3>
          <p><strong>Diagnosis:</strong> {result.diagnosis}</p>
          <p><strong>Risk Level:</strong> {result.riskLevel}</p>
          <p><strong>Recommended Specialist:</strong> {result.recommendedSpecialist}</p>

          <h4 className="mt-3 font-bold">Hospitals:</h4>
          <ul>
            {result.hospitals.map((hospital, index) => (
              <li key={index}>{hospital.name} ({hospital.state})</li>
            ))}
          </ul>

          <h4 className="mt-3 font-bold">Specialists:</h4>
          <ul>
            {result.specialists.map((specialist, index) => (
              <li key={index}>{specialist.name} - {specialist.specialty}</li>
            ))}
          </ul>

          <h4 className="mt-3 font-bold">Pharmacies:</h4>
          <ul>
            {result.pharmacies.map((pharmacy, index) => (
              <li key={index}>{pharmacy.name} - {pharmacy.state}</li>
            ))}
          </ul>

          <h4 className="mt-3 font-bold">Recommended Medications:</h4>
          <ul>
            {result.recommendedMedications.map((med, index) => (
              <li key={index}>{med}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DiagnosisForm;
