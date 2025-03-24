import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import hospitalRoutes from "./routes/hospitalRoutes.js";
import ambulanceRoutes from "./routes/ambulanceRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import specialistsRoutes from "./routes/specialistsRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request body
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Logging requests

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/ambulance". ambulanceRoutes);
app.use("/api/appointment". apointmentRoutes);
app.use("/api/specialists". specialistsRoutes);
app.use("/api/user". userRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

export default app;
