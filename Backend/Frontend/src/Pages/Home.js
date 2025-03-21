import React from "react";
import { Link } from "react-router-dom";
import useAuth from "/hooks/useAuth";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Health Diagnosis App</h1>
      <p className="text-lg text-gray-600 mb-6">Find hospitals, get medical recommendations, and manage your health easily.</p>

      <div className="flex space-x-4">
        {user ? (
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-blue-600 text-white text-lg rounded-md shadow-md hover:bg-blue-700"
          >
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link
              to="/login"
              className="px-6 py-3 bg-green-600 text-white text-lg rounded-md shadow-md hover:bg-green-700"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 bg-gray-700 text-white text-lg rounded-md shadow-md hover:bg-gray-800"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
