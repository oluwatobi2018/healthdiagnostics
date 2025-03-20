require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const pharmacyRoutes = require("./routes/pharmacyRoutes");

// Import Middleware
const { errorHandler } = require("./middlewares/errorMiddleware");

// Initialize Express App
const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/pharmacies", pharmacyRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the Health Diagnosis API!");
});

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
