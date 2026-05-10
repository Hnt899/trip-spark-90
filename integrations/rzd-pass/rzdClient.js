/**
 * Клиент к неофициальному JSON API расписания pass.rzd.ru (по мотивам visavi/rzd-api).
 *
 * В проде из зарубежных DC (Railway, Fly.io и т.д.) прямой доступ к pass.rzd.ru часто
 * блокируется или «висит». Задайте RZD_HTTPS_PROXY или HTTPS_PROXY на прокси с
 * российским исходящим IP (свой VPS в РФ, хостинг-провайдер в РФ и т.п.).
 */
import { fetch as undiciFetch, ProxyAgent } from "undici";

/** @type {{ fetchImpl: typeof fetch, dispatcher: import('undici').ProxyAgent | null } | null} */
let cachedTransport = null;

function getTransport() {
  if (cachedTransport) return cachedTransport;
  const proxyUrl = (process.env.RZD_HTTPS_PROXY || process.env.HTTPS_PROXY || "")
    .trim();
  if (proxyUrl) {
    try {
      const dispatcher = new ProxyAgent(proxyUrl);
      cachedTransport = {
        fetchImpl: (url, init) => undiciFetch(url, { ...init, dispatcher }),
        dispatcher,
      };
    } catch (e) {
      console.error(
        "[rzd-pass] некорректный RZD_HTTPS_PROXY/HTTPS_PROXY:",
        e instanceof Error ? e.message : e
      );
      cachedTransport = {
        fetchImpl: globalThis.fetch.bind(globalThis),
        dispatcher: null,
      };
    }
  } else {
    cachedTransport = {
      fetchImpl: globalThis.fetch.bind(globalThis),
      dispatcher: null,
    };
  }
  return cachedTransport;
}

/**
 * @param {string} basePath например https://pass.rzd.ru/timetable/public/ru
 */
export function createRzdPassClient(options = {}) {
  const basePath =
    options.basePath || "https://pass.rzd.ru/timetable/public/ru";
  const isProd = process.env.NODE_ENV === "production";
  const maxRidAttempts =
    options.maxRidAttempts ??
    parseInt(process.env.RZD_MAX_RID_ATTEMPTS || (isProd ? "8" : "12"), 10);
  const ridDelayMs =
    options.ridDelayMs ??
    parseInt(process.env.RZD_RID_DELAY_MS || (isProd ? "650" : "900"), 10);
  const fetchTimeoutMs = parseInt(
    process.env.RZD_FETCH_TIMEOUT_MS || (isProd ? "8000" : "15000"),
    10
  );
  let cookieHeader = "";

  /**
   * @param {Record<string, string>} form
   */
  async function postForm(form) {
    const { fetchImpl } = options.fetchImpl
      ? { fetchImpl: options.fetchImpl }
      : getTransport();
    const r = await fetchImpl(basePath, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: cookieHeader || undefined,
        "User-Agent":
          options.userAgent ||
          "Mozilla/5.0 (compatible; trip-spark/1.0; +https://github.com/)",
        Referer: options.referer || "https://ticket.rzd.ru/",
      },
      body: new URLSearchParams(form).toString(),
      signal: AbortSignal.timeout(fetchTimeoutMs),
    });
    const set = r.headers.getSetCookie?.() ?? [];
    if (set.length) {
      cookieHeader += set.map((s) => s.split(";")[0]).join("; ") + "; ";
    }
    return r.json();
  }

  /**
   * POST с опросом RID/REQUEST_ID (как Rzd\Query в visavi/rzd-api).
   * @param {Record<string, string>} form
   */
  async function postWithRid(form) {
    let rid;
    let body = { ...form };
    for (let i = 0; i < maxRidAttempts; i++) {
      if (rid) body.rid = String(rid);
      let j;
      try {
        j = await postForm(body);
      } catch (e) {
        const name = e instanceof Error ? e.name : "";
        if (name === "TimeoutError" || name === "AbortError") {
          throw new Error(
            "Таймаут ответа РЖД (проверьте сеть или настройте RZD_HTTPS_PROXY с российским IP)"
          );
        }
        throw e;
      }
      const res = j.result || "OK";
      if (res === "RID" || res === "REQUEST_ID") {
        rid = j.rid ?? j.RID;
        await new Promise((z) => setTimeout(z, ridDelayMs));
        continue;
      }
      return j;
    }
    throw new Error("RZD: превышено число попыток опроса RID");
  }

  return { postWithRid };
}
