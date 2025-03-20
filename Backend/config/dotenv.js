const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Export the environment variables for easy access
module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    INFERMEDICA_APP_ID: process.env.INFERMEDICA_APP_ID,
    INFERMEDICA_APP_KEY: process.env.INFERMEDICA_APP_KEY,
};
