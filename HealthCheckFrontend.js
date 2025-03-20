import { useState } from "react";
import axios from "axios";

export default function SymptomChecker() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    sex: "",
    genotype: "",
    bloodGroup: "",
    symptoms: "",
    state: "",
  });

  const [diagnosis, setDiagnosis] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/diagnose", formData);
      setDiagnosis(response.data);
    } catch (error) {
      console.error("Error diagnosing symptoms:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Health Diagnosis System</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} className="w-full p-2 border rounded" required />
        <select name="sex" onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select Sex</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="text" name="genotype" placeholder="Genotype (e.g., AA, AS, SS)" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="bloodGroup" placeholder="Blood Group (e.g., O+, A-)" onChange={handleChange} className="w-full p-2 border rounded" required />
        <textarea name="symptoms" placeholder="Enter symptoms separated by commas" onChange={handleChange} className="w-full p-2 border rounded" required></textarea>
        <input type="text" name="state" placeholder="State of Residence" onChange={handleChange} className="w-full p-2 border rounded" required />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Check Diagnosis</button>
      </form>

      {diagnosis && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-bold">Diagnosis Result</h3>
          <p><strong>Diagnosis:</strong> {diagnosis.diagnosis}</p>
          <p><strong>Risk Level:</strong> {diagnosis.riskLevel}</p>
          <h4 className="font-bold mt-3">Hospitals</h4>
          <ul>{diagnosis.hospitals.map((h) => <li key={h.name}>{h.name}</li>)}</ul>
          <h4 className="font-bold mt-3">Specialists</h4>
          <ul>{diagnosis.specialists.map((s) => <li key={s.name}>{s.name} ({s.specialty})</li>)}</ul>
          <h4 className="font-bold mt-3">Pharmacies</h4>
          <ul>{diagnosis.pharmacies.map((p) => <li key={p.name}>{p.name}</li>)}</ul>
          <h4 className="font-bold mt-3">Recommended Medications</h4>
          <ul>{diagnosis.recommendedMedications.map((m, i) => <li key={i}>{m}</li>)}</ul>
        </div>
      )}
    </div>
  );
}

