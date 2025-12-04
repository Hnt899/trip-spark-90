import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Router, а не api-inference
const HF_ROUTER_URL = "https://router.huggingface.co/v1/chat/completions";
// Модель + провайдер. Для Router обычно указывают суффикс провайдера, например :hf-inference
const HF_MODEL = process.env.HF_MODEL || "meta-llama/Meta-Llama-3.1-8B-Instruct";
const HF_API_TOKEN = process.env.HF_API_TOKEN;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

// ============================================
// RATE LIMITING - Ограничение частоты запросов
// ============================================
// Зачем это нужно:
// - Защита от брутфорса паролей
// - Защита от DDoS атак
// - Снижение нагрузки на сервер
// - Экономия ресурсов (например, SMS)
// ============================================

// Общий rate limit для всех API запросов
const generalRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 минута
  max: 100, // максимум 100 запросов в минуту
  message: {
    error: "Слишком много запросов. Подождите немного и попробуйте снова.",
  },
  standardHeaders: true, // Возвращает информацию о лимитах в заголовках
  legacyHeaders: false,
});

// Строгий rate limit для чата (AI запросы дорогие)
const chatRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 минута
  max: 10, // максимум 10 запросов в минуту
  message: {
    error: "Слишком много запросов к чату. Подождите минуту и попробуйте снова.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Применяем общий rate limit ко всем запросам
app.use("/api", generalRateLimit);

// Пинг (без rate limit для мониторинга)
app.get("/api/ping", (req, res) => {
  res.json({ ok: true, message: "server is alive" });
});

const SYSTEM_PROMPT =
  "Ты ИИ-помощник сервиса продажи ж/д билетов tudasuda. Отвечай очень кратко и по делу: максимум 2–4 коротких предложения. " +
  "Не пиши длинные объяснения, списки и лишние детали, если пользователь не просит. " +
  "Помогай с маршрутом, покупкой билетов и работой сайта. Если спрашивают про реальные данные " +
  "(актуальное расписание, цены), отвечай, что не имеешь доступа к реальной БД и даёшь только общие рекомендации.";
// Собираем историю под формат chat-completions
const buildMessages = (history = [], userMessage) => {
  const messages = [];

  messages.push({
    role: "system",
    content: SYSTEM_PROMPT,
  });

  const recentHistory = history.slice(-10);

  for (const msg of recentHistory) {
    messages.push({
      role: msg.role === "assistant" ? "assistant" : "user",
      content: msg.content,
    });
  }

  messages.push({
    role: "user",
    content: userMessage,
  });

  return messages;
};

// Чат с дополнительным rate limit
app.post("/api/support/chat", chatRateLimit, async (req, res) => {
  const { message, history = [] } = req.body || {};

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "message is required" });
  }

  if (!HF_API_TOKEN) {
    console.error("[SERVER] HF_API_TOKEN is not set");
    return res.status(500).json({ error: "HF API token is missing" });
  }

  try {
    const body = {
      model: HF_MODEL,              // пример: "google/gemma-2-2b-it:hf-inference"
      messages: buildMessages(history, message),
      max_tokens: 256,
      temperature: 0.6,
    };

    const hfResponse = await fetch(HF_ROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await hfResponse.json();
    console.log("[HF raw response]", JSON.stringify(data).slice(0, 400));

    if (!hfResponse.ok) {
      console.error("[HF error status]", hfResponse.status, data);
      return res.json({
        reply: "Сервис модели сейчас недоступен. Попробуйте позже.",
      });
    }

    const choice = data.choices?.[0];
    const replyText = choice?.message?.content;

    if (!replyText) {
      console.error("[SERVER] Unexpected HF response:", data);
      return res.json({
        reply: "Сервис модели сейчас недоступен. Попробуйте позже.",
      });
    }

    return res.json({ reply: replyText.trim() });
  } catch (err) {
    console.error("[SERVER] HF request failed:", err);
    return res.status(500).json({ error: "HF API error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  console.log(`Using HF Router model: ${HF_MODEL}`);
});
