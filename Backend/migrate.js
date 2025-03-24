import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js"; // Import models

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.Mongo_UI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Sample migration data
const users = [
  { name: "John Doe", email: "john@example.com", password: "hashedpassword" },
  { name: "Jane Doe", email: "jane@example.com", password: "hashedpassword" },
];

// Run Migration
const migrateData = async () => {
  try {
    await User.insertMany(users); // Insert sample users
    console.log("Migration completed!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Migration failed:", error);
    mongoose.connection.close();
  }
};


