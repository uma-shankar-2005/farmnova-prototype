const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  const { messages } = req.body;
  try {
    const userPrompt = messages.map(m => (m.from === "user" ? `User: ${m.text}` : `Bot: ${m.text}`)).join("\n") + "\nBot:";
    const openaiRes = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: userPrompt,
        max_tokens: 100,
        temperature: 0.7,
        stop: ["User:", "Bot:"]
      },
      {
        headers: {
          "Authorization": `Bearer YOUR_OPENAI_API_KEY`,
          "Content-Type": "application/json"
        }
      }
    );
    const reply = openaiRes.data.choices[0].text.trim();
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ reply: "Sorry, I couldn't get a response from AI." });
  }
});

module.exports = router;
