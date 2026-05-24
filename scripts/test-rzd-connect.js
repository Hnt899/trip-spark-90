/**
 * Проверка доступа к pass.rzd.ru с сервера (VPS).
 * Запуск: node scripts/test-rzd-connect.js
 * В Docker: docker compose exec app node scripts/test-rzd-connect.js
 */
import { searchTrainsByCities } from "../integrations/rzd-pass/index.js";

const date = new Date();
date.setDate(date.getDate() + 1);
const dateYmd = date.toISOString().slice(0, 10);

console.log("[test-rzd] date:", dateYmd);

try {
  const { routes, message } = await searchTrainsByCities({
    fromCity: "Москва",
    toCity: "Санкт-Петербург",
    dateYmd,
  });
  console.log("[test-rzd] OK, routes:", routes.length);
  if (message) console.log("[test-rzd] message:", message);
  if (routes[0]) console.log("[test-rzd] sample:", routes[0].trainNumber, routes[0].departureTime);
} catch (e) {
  console.error("[test-rzd] FAIL:", e instanceof Error ? e.message : e);
  process.exit(1);
}
