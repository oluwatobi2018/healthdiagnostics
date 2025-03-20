import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Registration failed");

      alert("Registration successful! Please log in.");
      navigate("/login"); // Redirect to login after registration
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2 border rounded mb-2" />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 border rounded mb-2" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-2 border rounded mb-2" />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Register</button>
      </form>
      <p className="mt-3">Already have an account? <a href="/login" className="text-blue-500">Login</a></p>
    </div>
  );
};

export default Register;
