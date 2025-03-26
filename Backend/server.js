import express from "express"
import dotenv from "dotenv";
import {connectDB} from "./src/config/db.js";

dotenv.config();

const app = express()

connectDB()

const PORT  = 5000 || process.env.PORT
app.use(express.json());

app.get("/health",async(req, res) =>{
  res.send("App is working")
})



app.listen(PORT, () => console.log(
  `Server is listening port ${PORT}`) 
)
