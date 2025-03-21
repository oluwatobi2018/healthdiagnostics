import React from "react";

const HospitalCard = ({ name, location, status, onViewDetails }) => {
  // Status color mapping
  const statusColors = {
    Open: "text-green-600 bg-green-100",
    Closed: "text-red-600 bg-red-100",
    Limited: "text-yellow-600 bg-yellow-100",
  };

  return (
    <div className="border rounded-lg shadow-md p-4 bg-white flex flex-col justify-between">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-600">{location}</p>

      <div className="mt-2">
        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[status] || "bg-gray-100 text-gray-600"}`}>
          {status}
        </span>
      </div>

      <button 
        onClick={onViewDetails} 
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
      >
        View Details
      </button>
    </div>
  );
};

export default HospitalCard;
