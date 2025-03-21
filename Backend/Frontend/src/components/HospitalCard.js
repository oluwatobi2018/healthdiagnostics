import React from "react";

const HospitalCard = ({ name, location, contact, onClick }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition duration-300">
      <h2 className="text-xl font-bold text-blue-700">{name}</h2>
      <p className="text-gray-600 mt-1">{location}</p>
      <p className="text-gray-500 mt-1">📞 {contact}</p>
      <button 
        onClick={onClick} 
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
      >
        View Details
      </button>
    </div>
  );
};

export default HospitalCard;
