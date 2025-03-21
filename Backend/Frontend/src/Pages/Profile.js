import React from "react";
import useAuth from "/hooks/useAuth";

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <p className="text-center text-gray-600">Please log in to view your profile.</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="space-y-3">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role || "User"}</p>
      </div>
      <button
        onClick={logout}
        className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
