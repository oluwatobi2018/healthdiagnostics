import React from "react";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold">Profile</h2>
        <p className="text-gray-700 mt-4">You need to log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">My Profile</h2>

      <div className="mb-4">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition w-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
