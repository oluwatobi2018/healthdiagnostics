import React from "react";
import useFetch from "/hooks/useFetch";
import useAuth from "/hooks/useAuth";
import HospitalCard from "/components/HospitalCard";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { data: hospitals, loading, error } = useFetch("https://api.example.com/hospitals");

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div>
          <span className="mr-4 text-gray-600">Welcome, {user?.name || "Guest"}</span>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Hospitals Section */}
      <h2 className="text-xl font-semibold mb-4">Available Hospitals</h2>
      {loading && <p>Loading hospitals...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hospitals?.map((hospital) => (
          <HospitalCard key={hospital.id} hospital={hospital} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
