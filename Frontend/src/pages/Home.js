import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Health Diagnosis App</h1>
      <p className="text-lg text-gray-700 mb-6">
        Get instant medical symptom analysis and locate nearby hospitals & pharmacies.
      </p>

      {/* If user is logged in, show dashboard button */}
      {user ? (
        <Link
          to="/dashboard"
          className="bg-blue-500 text-white px-6 py-3 rounded shadow-md hover:bg-blue-600 transition"
        >
          Go to Dashboard
        </Link>
      ) : (
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-green-500 text-white px-6 py-3 rounded shadow-md hover:bg-green-600 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-gray-800 text-white px-6 py-3 rounded shadow-md hover:bg-gray-900 transition"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
