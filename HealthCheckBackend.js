const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);


dotenv.config();
const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(mongoSanitize());
app.use(xss());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests, please try again later."
});
app.use(limiter);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Schemas & Models
const User = mongoose.model('User', new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}));

const Symptom = mongoose.model('Symptom', new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  symptoms: { type: [String], required: true },
  diagnosis: String,
  riskLevel: String,
  recommendations: String,
  createdAt: { type: Date, default: Date.now },
}));

const Hospital = mongoose.model('Hospital', new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: String, required: true },
  specialties: { type: [String], required: true },
}));

const Pharmacy = mongoose.model('Pharmacy', new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  openingHours: { type: String, required: true },
  availableMedications: { type: [String], required: true },
  lastUpdated: { type: Date, default: Date.now },
}));

const Specialist = mongoose.model('Specialist', new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  hospital: { type: String, required: true },
  state: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  consultationHours: { type: String, required: true },
}));

const statesInNigeria = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta",
  "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

const specialtiesList = [
  "General Medicine", "Cardiology", "Neurology", "Oncology", "Pediatrics",
  "Orthopedics", "Gynecology", "Urology", "Nephrology", "Endocrinology",
  "Dermatology", "Psychiatry", "Ophthalmology", "ENT (Ear, Nose, Throat)",
  "Pulmonology", "Gastroenterology", "Rheumatology", "Infectious Diseases",
  "Hematology", "Anesthesiology", "Radiology", "Surgery"
];

// Seed Data for All 36 States
const seedData = async () => {
  const hospitals = statesInNigeria.map(state => ({
    name: `${state} General Hospital`,
    state,
    specialties: specialtiesList.slice(0, 3)
  }));

  const pharmacies = statesInNigeria.map(state => ({
    name: `${state} MediCare Pharmacy`,
    state,
    address: `${state} Central Business District`,
    phone: `+234-800-${state.length}000`,
    openingHours: "8 AM - 10 PM",
    availableMedications: ["Pain Relievers", "Antibiotics", "Cough Syrup", "Anti-inflammatory", "Antipyretics"],
  }));

  const specialists = statesInNigeria.map(state => ({
    name: `Dr. ${state} Specialist`,
    specialty: specialtiesList[Math.floor(Math.random() * specialtiesList.length)],
    hospital: `${state} General Hospital`,
    state,
    phone: `+234-900-${state.length}123`,
    consultationHours: "9 AM - 5 PM",
  }));

  await Hospital.insertMany(hospitals);
  await Pharmacy.insertMany(pharmacies);
  await Specialist.insertMany(specialists);
  console.log("Seeded hospitals, pharmacies, and specialists in all 36 states.");
};

seedData();

app.post('/diagnose', async (req, res) => {
    try {
      const { userId, symptoms, state } = req.body;
  
      // Basic diagnosis logic (expand with AI or medical logic later)
      let diagnosis = "General Checkup Recommended";
      let riskLevel = "Moderate";
  
      if (symptoms.includes("chest pain") || symptoms.includes("high blood pressure")) {
        diagnosis = "Possible Heart Condition";
        riskLevel = "High";
      } else if (symptoms.includes("persistent headache") || symptoms.includes("dizziness")) {
        diagnosis = "Possible Neurological Issue";
        riskLevel = "Moderate";
      } else if (symptoms.includes("coughing blood") || symptoms.includes("difficulty breathing")) {
        diagnosis = "Possible Pulmonary Condition";
        riskLevel = "Severe";
      }
  
      // Match diagnosis with specialist type
      const diagnosisSpecialistMap = {
        "Possible Heart Condition": "Cardiology",
        "Possible Neurological Issue": "Neurology",
        "Possible Pulmonary Condition": "Pulmonology",
        "General Checkup Recommended": "General Medicine",
      };
  
      const specialistType = diagnosisSpecialistMap[diagnosis] || "General Medicine";
  
      // Fetch recommendations
      const hospitals = await Hospital.find({ state });
      const specialists = await Specialist.find({ state, specialty: specialistType });
      const pharmacies = await Pharmacy.find({ state });
      const medications = pharmacies.flatMap(pharmacy => pharmacy.availableMedications);
  
      res.json({
        diagnosis,
        riskLevel,
        recommendedSpecialist: specialistType,
        hospitals,
        specialists,
        pharmacies,
        recommendedMedications: [...new Set(medications)],
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  