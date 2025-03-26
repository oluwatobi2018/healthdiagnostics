import express from "express"
import cors from "cors";
import morgan from "morgan";


const app = express();

// Middleware
app.use(express.json()); // Parse JSON request body
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Logging requests

// Connect to MongoDB

app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

export default app;
