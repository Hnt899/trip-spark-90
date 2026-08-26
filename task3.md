У меня есть проект trip-spark-90, развёрнутый на VPS (Ubuntu, Docker, Nginx). Нужно выполнить три задачи.

---

## Задача 1: Сменить домен в кнопке «Найти» на сайте

**Описание:**
При клике на кнопку «Найти» в форме поиска на основном сайте пользователь перенаправляется на White Label. Сейчас редирект идёт на `avia.ts-trip.com`. Нужно поменять на `avia.ts-trip.ru`.

**Что нужно сделать:**
- Найти файл, где формируется ссылка для редиректа (скорее всего, `src/lib/travelpayouts.ts` или `FlightSearchForm.tsx`).
- Заменить `https://avia.ts-trip.com/` на `https://avia.ts-trip.ru/`.

**Было:**
```typescript
const WHITE_LABEL_BASE = "https://avia.ts-trip.com/";
const url = `https://avia.ts-trip.com/?flightSearch=${flightSearch}`;
Стало:

typescript
const WHITE_LABEL_BASE = "https://avia.ts-trip.ru/";
const url = `https://avia.ts-trip.ru/?flightSearch=${flightSearch}`;
Задача 2: Обновить ссылки в шапке White Label
Описание:
В HTML-коде White Label (файл white-label.html или в HTML-редакторе Travelpayouts) все ссылки в шапке ведут на ts-trip.com. Нужно поменять их на ts-trip.ru, так как .ru станет основным доменом.

Что нужно сделать:

Заменить все ссылки https://ts-trip.com/... на https://ts-trip.ru/... в шапке White Label.

Ссылки: Главная, Маршруты, Справочная, Блог, Путеводитель, Войти, логотип.

Где искать:

В HTML-коде White Label (на сервере: /opt/trip-spark-90/white-label.html или в личном кабинете Travelpayouts).

Задача 3: Настроить AI-чат-бота на сайте
Описание:
На сайте есть чат-бот (компонент ChatWidget.tsx), который использует Hugging Face API. Сейчас он не работает, потому что в .env.vps нет HF_API_TOKEN.

Нужно:

Скачать и настроить локальную модель для чат-бота (например, через Ollama или HF).

Настроить чат-бота так, чтобы он:

Понимал запросы пользователя (например, «куда поехать за 100 тысяч рублей»)

Спрашивал уточняющие вопросы (откуда, даты, бюджет)

Формировал ссылку на White Label с параметрами поиска

Отвечал с активной ссылкой

Что нужно сделать:

Установить Ollama на сервер (или использовать HF Inference API).

Скачать модель (например, llama3.2 или gemma2).

Настроить .env.vps:

text
HF_API_TOKEN=hf_...
Обновить ChatWidget.tsx или бэкенд-обработчик (/api/support/chat), чтобы бот:

Анализировал запрос и извлекал город отправления, город назначения, даты, бюджет.

Формировал ссылку на White Label: https://avia.ts-trip.ru/?flightSearch=...

Возвращал ответ с ссылкой в формате HTML (активная ссылка).

Проверка:

Чат-бот отвечает на вопросы.

Бот формирует ссылки на White Label.

Ссылки рабочие и ведут на avia.ts-trip.ru.

