import React from "react";
import useAuth from "../hooks/useAuth";
import useFetch from "../hooks/useFetch";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { data: hospitals, loading, error } = useFetch("https://api.example.com/hospitals");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* User Info */}
      {user ? (
        <div className="bg-gray-100 p-4 rounded mb-4">
          <p>Welcome, <strong>{user.name}</strong>!</p>
          <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded mt-2">
            Logout
          </button>
        </div>
      ) : (
        <p>Please log in to view your dashboard.</p>
      )}

      {/* Hospital Data */}
      <h2 className="text-xl font-semibold mt-6">Hospitals</h2>
      {loading && <p>Loading hospitals...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}

      <ul className="mt-4">
        {hospitals?.map((hospital) => (
          <li key={hospital.id} className="border-b py-2">
            {hospital.name} - {hospital.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

