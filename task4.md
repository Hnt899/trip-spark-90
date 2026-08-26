У меня есть проект trip-spark-90, развёрнутый на VPS (Ubuntu, Docker, Nginx). Нужно выполнить три задачи.

Характеристики сервера: 2 ядра CPU, 4 ГБ RAM, 40 ГБ NVMe.

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

Задача 3: Настроить AI-чат-бота на сайте (локально, без Hugging Face)
Описание:
На сайте есть чат-бот (компонент ChatWidget.tsx). Нужно настроить его работу с использованием локальной модели Ollama.

Характеристики сервера: 2 ядра CPU, 4 ГБ RAM, 40 ГБ NVMe.

Что нужно сделать:

3.1. Установить Ollama на сервер
bash
curl -fsSL https://ollama.com/install.sh | sh
3.2. Выбрать и скачать подходящую модель
На основе характеристик сервера выбрать модель, которая будет работать на 4 ГБ RAM.

Варианты (выбрать одну):

llama3.2:3b — 3.5 ГБ, хорошо работает на 4 ГБ RAM

gemma2:2b — лёгкая, быстрая

phi3:mini — 3.8 ГБ, хорошее качество

mistral:7b — может быть тяжеловат (нужно тестировать)

AI-агент должен проанализировать характеристики и выбрать оптимальную модель, затем выполнить:

bash
ollama pull <выбранная_модель>
3.3. Настроить бэкенд-обработчик чата
В файле server/index.js (или отдельном роуте) есть эндпоинт /api/support/chat. Нужно заменить запрос к Hugging Face на запрос к локальной Ollama:

Было:

javascript
const HF_ROUTER_URL = "https://router.huggingface.co/v1/chat/completions";
const response = await fetch(HF_ROUTER_URL, { ... });
Стало:

javascript
const OLLAMA_URL = "http://localhost:11434/api/chat";
const response = await fetch(OLLAMA_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "llama3.2:3b", // или выбранная модель
    messages: messages,
    stream: false
  })
});
3.4. Добавить логику формирования ссылок
Чат-бот должен:

Анализировать запрос пользователя (извлекать город отправления, город назначения, даты, бюджет).

Если данных не хватает — задавать уточняющие вопросы (например, «Откуда вы хотите лететь?», «Какая дата?»).

Когда все данные собраны — формировать ссылку на White Label:

text
https://avia.ts-trip.ru/?flightSearch=[IATA_откуда][дата_ДДММ][IATA_куда][количество_пассажиров]
Возвращать ответ с активной ссылкой (в формате HTML).

3.5. Настроить фронтенд-компонент ChatWidget
Обновить ChatWidget.tsx, чтобы он:

Отображал ссылки как кликабельные (<a href="...">ссылка</a>)

Сохранял историю диалога

Показывал статус «печатает...» при загрузке ответа

3.6. Добавить Ollama в Docker-контейнер
Обновить docker-compose.yml — добавить сервис ollama:

yaml
ollama:
  image: ollama/ollama:latest
  ports:
    - "11434:11434"
  volumes:
    - ollama_data:/root/.ollama
  restart: unless-stopped
После запуска контейнера скачать модель внутри него:

bash
docker compose exec ollama ollama pull llama3.2:3b
3.7. Проверить работу
Открыть сайт, найти чат-бот.

Написать: «Куда можно поехать на 100 тысяч рублей?»

Бот должен ответить с предложением и ссылкой.
