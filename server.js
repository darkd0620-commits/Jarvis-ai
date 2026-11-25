const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("Jarvis is online!");
});

app.post("/ask", async (req, res) => {
  try {
    const question = req.body?.message || req.body?.input || req.body?.question || "";

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: question
    });

    res.json({
      reply: response.output_text
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Jarvis could not respond" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Jarvis is running!");
});
