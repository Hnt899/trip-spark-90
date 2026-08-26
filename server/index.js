import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import rateLimit from "express-rate-limit";
import { registerApiRoutes } from "./registerApiRoutes.js";
import { uploadRouter, UPLOAD_DIR } from "./uploadRoute.js";
import travelpayoutsProxy from './travelpayoutsProxy.js';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

// ===== OLLAMA (локальная модель) =====
const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434/api/chat";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "qwen2.5-coder:3b";

// ===== ЗАГРУЗКА СЛОВАРЯ ГОРОДОВ =====
const citiesPath = path.join(__dirname, '../src/data/cities.json');
let cityToIata = {};
try {
  const citiesData = JSON.parse(readFileSync(citiesPath, 'utf-8'));
  citiesData.forEach(item => {
    if (item.type === 'city' || item.type === 'airport') {
      cityToIata[item.name] = item.code;
      if (item.city_name) {
        cityToIata[item.city_name] = item.code;
      }
    }
  });
  console.log(`[SERVER] Загружено ${Object.keys(cityToIata).length} IATA-кодов`);
} catch (err) {
  console.error('[SERVER] Не удалось загрузить cities.json:', err.message);
}

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.set("trust proxy", 1);
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return cb(null, true);
      }
      cb(new Error("CORS"));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));

app.use("/travelpayouts", travelpayoutsProxy);

// ===== RATE LIMITING =====
const generalRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: {
    error: "Слишком много запросов. Подождите немного и попробуйте снова.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const chatRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: {
    error: "Слишком много запросов к чату. Подождите минуту и попробуйте снова.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api", generalRateLimit);

app.use("/uploads", express.static(UPLOAD_DIR));
app.use(uploadRouter);
registerApiRoutes(app);

app.get("/api/ping", (req, res) => {
  res.json({ ok: true, message: "server is alive" });
});

// ===== SYSTEM PROMPT =====
const SYSTEM_PROMPT = `
Ты — ИИ-помощник сервиса по поиску авиабилетов TudaSuda. Твоя задача — помочь пользователю найти билеты и сформировать ссылку на поиск.

## Твоя роль
- Ты помогаешь только с поиском авиабилетов и путешествиями.
- Если пользователь спрашивает что-то не по теме (погода, новости, политика, еда, фильмы и т.д.) — вежливо откажи и предложи вернуться к теме билетов.
- Отвечай кратко (2–4 предложения), но задавай уточняющие вопросы, если не хватает данных.

## Какие данные нужно собрать
Чтобы сформировать ссылку на White Label, тебе нужно узнать у пользователя:
1. **Откуда** — город вылета (например, Москва).
2. **Куда** — город прибытия (например, Сочи).
3. **Дата вылета** — в формате ДД.ММ.ГГГГ (например, 20.08.2026).
4. **Дата возврата** (если нужна) — опционально.
5. **Количество пассажиров** — взрослые, дети (2–11 лет), младенцы (до 2 лет).
6. **Класс** — эконом или бизнес (по умолчанию эконом).

## Как задавать вопросы
- Если пользователь сказал "хочу в Сочи" — спроси: "Откуда вы летите?".
- Если пользователь сказал "из Москвы" — спроси: "На какую дату?".
- Спрашивай по одному вопросу за раз, не засыпай пользователя списком.
- Если пользователь дал неполную информацию — вежливо уточни.

## Формирование ссылки на White Label
Когда все данные собраны, сформируй ссылку в формате:
\`https://avia.ts-trip.ru/?flightSearch=[IATA_откуда][дата_ДДММ][IATA_куда][количество_взрослых]\`

**Пример:**
- Откуда: Москва (IATA: MOW)
- Куда: Сочи (IATA: AER)
- Дата вылета: 20 августа 2026 → код: 2008
- Пассажиры: 2 взрослых, 1 ребёнок → код: 21

Ссылка: \`https://avia.ts-trip.ru/?flightSearch=MOW2008AER21\`

**Важно:**
- Если пользователь не указал дату — используй завтрашнюю дату.
- Если не указал пассажиров — поставь 1 взрослого.
- Если есть обратная дата — добавь параметр \`&returnDate=[ДДММ]\`.
- Если есть дети или младенцы — добавь \`&children=[число]\` и \`&infants=[число]\`.

## Ограничения
- Ты не даёшь советы по бронированию отелей, аренде авто, экскурсиям — только авиабилеты.
- Ты не имеешь доступа к реальным ценам и расписанию — только формируешь ссылку.
- Если пользователь спрашивает "сколько стоят билеты" — ответь: "Цены вы увидите на странице поиска по сформированной ссылке".
- Не отвечай на вопросы о политике, религии, здоровье, финансах.
- Если не знаешь IATA-код города — скажи об этом и предложи пользователю уточнить название.

## Пример диалога
Пользователь: "Хочу слетать в Сочи"
Бот: "Откуда вы планируете лететь?"
Пользователь: "Из Москвы"
Бот: "На какую дату?"
Пользователь: "20 августа, на неделю"
Бот: "Сколько пассажиров?"
Пользователь: "Двое взрослых и ребёнок"
Бот: "Отлично! Вот ссылка для поиска билетов Москва → Сочи на 20 августа: https://avia.ts-trip.ru/?flightSearch=MOW2008AER21"
`;

// ===== ФУНКЦИИ ДЛЯ ПАРСИНГА =====
function extractCity(text) {
  const patterns = [
    /из\s*([А-Яа-яA-Za-z\s-]+?)(?:\s*(?:в|,|\.|$))/i,
    /в\s*([А-Яа-яA-Za-z\s-]+?)(?:\s*(?:на|,|\.|$))/i,
    /([А-Яа-яA-Za-z\s-]+?)\s*[→—–-]\s*([А-Яа-яA-Za-z\s-]+?)(?:\s|$)/,
  ];
  
  let origin = null, destination = null;
  const matchArrow = text.match(patterns[2]);
  if (matchArrow) {
    return { origin: matchArrow[1].trim(), destination: matchArrow[2].trim() };
  }
  const matchFrom = text.match(patterns[0]);
  if (matchFrom) {
    origin = matchFrom[1].trim();
  }
  const matchTo = text.match(patterns[1]);
  if (matchTo) {
    destination = matchTo[1].trim();
  }
  return { origin, destination };
}

function extractDate(text) {
  const match = text.match(/(\d{2})\.(\d{2})\.(\d{4})/);
  if (match) return `${match[1]}${match[2]}`;
  const match2 = text.match(/\b(\d{2})(\d{2})\b/);
  return match2 ? match2[0] : null;
}

function extractPassengers(text) {
  const adults = text.match(/(\d+)\s*взрослых?/i);
  const children = text.match(/(\d+)\s*детей?/i);
  const infants = text.match(/(\d+)\s*младенцев?/i);
  return {
    adults: adults ? parseInt(adults[1]) : 1,
    children: children ? parseInt(children[1]) : 0,
    infants: infants ? parseInt(infants[1]) : 0
  };
}

// ===== ЧАТ-БОТ =====
app.post("/api/support/chat", chatRateLimit, async (req, res) => {
  const { message, history = [] } = req.body || {};

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "message is required" });
  }

  try {
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.slice(-10),
      { role: "user", content: message }
    ];

    const response = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: messages,
        stream: false,
        options: {
          temperature: 0.6,
          max_tokens: 256
        }
      })
    });

    if (!response.ok) {
      console.error("[Ollama] Error:", response.status);
      return res.json({
        reply: "Сервис модели сейчас недоступен. Попробуйте позже.",
      });
    }

    const data = await response.json();
    let replyText = data.message?.content;

    if (!replyText) {
      console.error("[Ollama] Unexpected response:", data);
      return res.json({
        reply: "Сервис модели сейчас недоступен. Попробуйте позже.",
      });
    }

    replyText = replyText.trim();

    // ===== ПЫТАЕМСЯ СФОРМИРОВАТЬ ССЫЛКУ =====
    const { origin: originName, destination: destName } = extractCity(replyText);
    const dateCode = extractDate(replyText);
    const passengers = extractPassengers(replyText);

    let link = null;

    if (originName && destName) {
      const originCode = cityToIata[originName];
      const destCode = cityToIata[destName];
      const finalDate = dateCode || new Date(Date.now() + 86400000).toISOString().slice(0, 5).replace('-', '');

      if (originCode && destCode) {
        const adultCode = Math.min(passengers.adults || 1, 9);
        const childrenCode = Math.min(passengers.children || 0, 9);
        const infantsCode = Math.min(passengers.infants || 0, 9);
        const passengerToken = `${adultCode}${childrenCode}${infantsCode}`;

        link = `https://avia.ts-trip.ru/?flightSearch=${originCode}${finalDate}${destCode}${passengerToken}`;
      }
    }

    if (link) {
      replyText += `\n\n🔗 Вот ваша ссылка для поиска: ${link}`;
    } else {
      replyText += `\n\nℹ️ Чтобы я мог сформировать ссылку, укажите город вылета и прибытия. Например: "из Москвы в Сочи"`;
    }

    return res.json({ reply: replyText });
  } catch (err) {
    console.error("[Ollama] request failed:", err);
    return res.status(500).json({ error: "Ollama API error" });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  console.log(`Using Ollama model: ${OLLAMA_MODEL}`);
});