const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/diagnose", async (req, res) => {
    const { name, age, sex, genotype, bloodGroup, symptoms } = req.body;
    const symptomList = symptoms.join(", ");

    const prompt = `A patient named ${name}, age ${age}, sex ${sex}, with genotype ${genotype} and blood group ${bloodGroup}, reports the following symptoms: ${symptomList}. What is the most likely diagnosis? Provide the risk level, recommended specialist, and possible medications.`;

    try {
        const response = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-4-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 200
        }, {
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            }
        });

        const diagnosis = response.data.choices[0].message.content;
        res.json({ diagnosis });
    } catch (error) {
        console.error("Error fetching diagnosis from AI:", error);
        res.status(500).json({ error: "Failed to generate diagnosis" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
