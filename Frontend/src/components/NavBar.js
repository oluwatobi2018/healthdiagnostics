import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          HealthCare
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/profile" className="hover:underline">Profile</Link>
          
          {isAuthenticated ? (
            <button onClick={onLogout} className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600">
              Logout
            </button>
          ) : (
            <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 py-2">
          <Link to="/" className="block px-4 py-2 hover:bg-blue-800">Home</Link>
          <Link to="/dashboard" className="block px-4 py-2 hover:bg-blue-800">Dashboard</Link>
          <Link to="/profile" className="block px-4 py-2 hover:bg-blue-800">Profile</Link>

          {isAuthenticated ? (
            <button onClick={onLogout} className="block w-full text-left px-4 py-2 bg-red-500 hover:bg-red-600">
              Logout
            </button>
          ) : (
            <Link to="/login" className="block px-4 py-2 bg-white text-blue-600 hover:bg-gray-200">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
