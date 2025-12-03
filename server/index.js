import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const HF_MODEL = process.env.HF_MODEL || "google/gemma-2b-it";
const HF_API_TOKEN = process.env.HF_API_TOKEN;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

const SYSTEM_PROMPT =
  "Ты ИИ-помощник сервиса продажи ж/д билетов tudasuda. Отвечай коротко и по делу, помогай с маршрутом, покупкой билетов, работой сайта. Если спрашивают про реальные данные (актуальное расписание, цены), отвечай, что не имеешь доступа к реальной БД и даёшь только общие рекомендации.";

const buildPrompt = (history = [], message) => {
  const recentHistory = history.slice(-10);
  const conversation = recentHistory
    .map((item) => `${item.role === "assistant" ? "Assistant" : "User"}: ${item.content}`)
    .join("\n");

  const promptParts = [SYSTEM_PROMPT, conversation].filter(Boolean);

  promptParts.push(`User: ${message}`);
  promptParts.push("Assistant:");

  return promptParts.join("\n");
};

app.post("/api/support/chat", async (req, res) => {
  const { message, history = [] } = req.body || {};

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }

  if (!HF_API_TOKEN) {
    console.error("HF_API_TOKEN is not set. Please configure your .env file.");
    return res.status(500).json({ error: "HF API token is missing" });
  }

  const prompt = buildPrompt(history, message);

  try {
    const response = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("HF API error:", errorText);
      return res.status(500).json({ error: "HF API error" });
    }

    const data = await response.json();
    const generatedText = Array.isArray(data) ? data[0]?.generated_text : data?.generated_text;

    if (!generatedText) {
      console.error("Unexpected HF API response:", data);
      return res.status(500).json({ error: "HF API error" });
    }

    const reply = generatedText.startsWith(prompt)
      ? generatedText.slice(prompt.length).trim() || generatedText.trim()
      : generatedText.trim();

    return res.json({ reply });
  } catch (error) {
    console.error("HF API request failed:", error);
    return res.status(500).json({ error: "HF API error" });
  }
});

app.listen(PORT, () => {
  console.log(`Support chat server is running on http://localhost:${PORT}`);
});

