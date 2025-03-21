import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">HealthCare</Link>
        </h1>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? "✖" : "☰"}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="hover:text-gray-200">Home</Link></li>
          <li><Link to="/hospitals" className="hover:text-gray-200">Hospitals</Link></li>
          <li><Link to="/pharmacies" className="hover:text-gray-200">Pharmacies</Link></li>
          <li><Link to="/about" className="hover:text-gray-200">About</Link></li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-blue-700 p-4">
          <li><Link to="/" className="block py-2" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/hospitals" className="block py-2" onClick={() => setIsOpen(false)}>Hospitals</Link></li>
          <li><Link to="/pharmacies" className="block py-2" onClick={() => setIsOpen(false)}>Pharmacies</Link></li>
          <li><Link to="/about" className="block py-2" onClick={() => setIsOpen(false)}>About</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
