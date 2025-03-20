import React from "react";
import DiagnosisForm from "./components/DiagnosisForm";

const App = () => {
  return (
    <div className="container mx-auto p-5">
      <DiagnosisForm />
    </div>
  );
};

export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DiagnosisForm from "./components/DiagnosisForm";
import Login from "./components/Login";
import Register from "./components/Register";
import DiagnosisResults from "./components/DiagnosisResults";
import Hospitals from "./components/Hospitals";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DiagnosisForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/results" element={<DiagnosisResults />} />
        <Route path="/hospitals" element={<Hospitals />} />
      </Routes>
    </Router>
  );
}


