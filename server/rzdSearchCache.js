/** In-memory cache for RZD timetable (reduces 403 from pass.rzd.ru on VPS). */

const store = new Map();

const ttlMs = () =>
  Math.max(60, parseInt(process.env.RZD_CACHE_TTL_SEC || "1800", 10)) * 1000;

export function rzdCacheKey(fromCity, toCity, dateYmd) {
  return `${fromCity}|${toCity}|${dateYmd}`;
}

/** @returns {{ routes: object[], message?: string } | null} */
export function getRzdCache(key) {
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) return null;
  return entry.payload;
}

/** Last successful payload even if TTL expired (for 403 fallback). */
export function getRzdStale(key) {
  return store.get(key)?.payload ?? null;
}

/** @param {{ routes: object[], message?: string }} payload */
export function setRzdCache(key, payload) {
  store.set(key, {
    payload,
    expiresAt: Date.now() + ttlMs(),
  });
}
