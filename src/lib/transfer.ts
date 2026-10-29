/**
 * Подбор трансфера живёт на отдельном поддомене: там та же шапка и подвал
 * сайта (это тот же SPA) плюс виджет KiwiTaxi.
 */
export const TAXI_URL = "https://taxi.ts-trip.ru/";

/** true, если страница открыта на поддомене трансфера. */
export function isTaxiHost(hostname?: string): boolean {
  const raw =
    hostname ?? (typeof window !== "undefined" ? window.location.hostname : "");
  const host = raw.trim().toLowerCase().replace(/^www\./, "");
  return host === "taxi.ts-trip.ru" || host.startsWith("taxi.");
}
