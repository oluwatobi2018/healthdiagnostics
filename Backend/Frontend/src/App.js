import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "/context/AuthContext";
import Navbar from "/components/Navbar";
import Home from "/pages/Home";
import Dashboard from "/pages/Dashboard";
import Profile from "/pages/Profile";
import NotFound from "/pages/NotFound"; // Optional 404 page

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-gray-100 min-h-screen">
          <Navbar />
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} /> {/* Handle unknown routes */}
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
