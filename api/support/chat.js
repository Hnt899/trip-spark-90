const HF_ROUTER_URL = "https://router.huggingface.co/v1/chat/completions";

const SYSTEM_PROMPT =
  "Ты ИИ-помощник сервиса продажи ж/д билетов tudasuda. Отвечай очень кратко и по делу: максимум 2–4 коротких предложения. " +
  "Не пиши длинные объяснения и длинные списки, если пользователь не просит. " +
  "Помогай с маршрутом, покупкой билетов и работой сайта. Если спрашивают про реальные данные " +
  "(актуальное расписание, цены), отвечай, что не имеешь доступа к реальной БД и даёшь только общие рекомендации.";

function buildMessages(history = [], userMessage) {
  const messages = [];

  messages.push({
    role: "system",
    content: SYSTEM_PROMPT,
  });

  const recent = history.slice(-10);
  for (const msg of recent) {
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
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { message, history = [] } = req.body || {};

  if (!message || typeof message !== "string") {
    res.status(400).json({ error: "message is required" });
    return;
  }

  const HF_MODEL = process.env.HF_MODEL;
  const HF_API_TOKEN = process.env.HF_API_TOKEN;

  if (!HF_MODEL || !HF_API_TOKEN) {
    console.error("[SERVER] HF_MODEL or HF_API_TOKEN is missing");
    res.status(500).json({ error: "Server config error" });
    return;
  }

  try {
    const body = {
      model: HF_MODEL,
      messages: buildMessages(history, message),
      max_tokens: 160,
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

    if (!hfResponse.ok) {
      console.error("[HF error status]", hfResponse.status, data);
      res.json({
        reply: "Сервис модели сейчас недоступен. Попробуйте позже.",
      });
      return;
    }

    const choice = data.choices?.[0];
    const replyText = choice?.message?.content;

    if (!replyText) {
      console.error("[SERVER] Unexpected HF response:", data);
      res.json({
        reply: "Сервис модели сейчас недоступен. Попробуйте позже.",
      });
      return;
    }

    res.json({ reply: replyText.trim() });
  } catch (err) {
    console.error("[SERVER] HF request failed:", err);
    res.status(500).json({ error: "HF API error" });
  }
}
