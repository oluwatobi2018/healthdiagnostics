import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js"; // Ensure correct path

dotenv.config(); // Load environment variables from .env file

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/health_diagnostics";

const seedUsers = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    await User.insertMany([
      { name: "John Doe", email: "john@example.com", age: 30 },
      { name: "Jane Smith", email: "jane@example.com", age: 28 },
      { name: "Alice Brown", email: "alice@example.com", age: 35 },
    ]);

    console.log("✅ Data Migration Successful!");
  } catch (error) {
    console.error("❌ Error in Migration:", error);
  } finally {
    mongoose.connection.close();
    console.log("🔌 MongoDB connection closed.");
  }
};

seedUsers();

