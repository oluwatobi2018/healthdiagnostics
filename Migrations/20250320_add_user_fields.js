require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User'); // Adjust based on your actual User model path

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function migrate() {
  try {
    console.log("🚀 Running Migration: Adding name, age, sex, genotype, and blood group to users...");

    // Update existing users with default values
    await User.updateMany({}, {
      $set: {
        age: null,
        sex: '',
        genotype: '',
        bloodGroup: '',
      }
    });

    console.log("✅ Migration Complete: User fields added successfully.");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Migration Failed:", error);
    mongoose.connection.close();
  }
}

migrate();
