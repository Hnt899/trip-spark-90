import { getDemoTrainRoutes } from "../integrations/rzd-pass/demoTrainRoutes.js";
import { searchTrainsByCities } from "../integrations/rzd-pass/searchByCities.js";
import {
  getRzdCache,
  getRzdStale,
  rzdCacheKey,
  setRzdCache,
} from "./rzdSearchCache.js";

function demoFallbackEnabled() {
  const v = (process.env.RZD_DEMO_FALLBACK ?? "1").trim().toLowerCase();
  return v !== "0" && v !== "false" && v !== "no";
}

function isRzdForbidden(err) {
  const msg = typeof err?.message === "string" ? err.message : "";
  return err?.code === "RZD_FORBIDDEN" || /403|Forbidden/i.test(msg);
}

function demoResponse(fromCity, toCity, dateYmd, note) {
  return {
    routes: getDemoTrainRoutes({ fromCity, toCity, dateYmd }),
    message: note,
    demoFallback: true,
  };
}

/**
 * Расписание поездов из pass.rzd.ru (неофициально, см. integrations/rzd-pass).
 * @param {import('express').Express} app
 */
export function registerRzdTrainSearchRoutes(app) {
  app.get("/api/train-search/rzd", async (req, res) => {
    const fromCity =
      typeof req.query.from === "string" ? req.query.from.trim() : "";
    const toCity =
      typeof req.query.to === "string" ? req.query.to.trim() : "";
    const dateYmd =
      typeof req.query.date === "string" ? req.query.date.trim() : "";

    const cacheKey = rzdCacheKey(fromCity, toCity, dateYmd);
    const cached = getRzdCache(cacheKey);
    if (cached) {
      return res.json({ ...cached, fromCache: true });
    }

    try {
      const { routes, message } = await searchTrainsByCities({
        fromCity,
        toCity,
        dateYmd,
      });

      const body = {
        routes,
        message:
          routes.length === 0
            ? message ||
              "Прямых поездов не найдено на выбранную дату. Проверьте коды городов или выберите другую дату."
            : undefined,
      };
      setRzdCache(cacheKey, body);
      res.json(body);
    } catch (e) {
      console.error("[rzd] train-search failed:", e);

      if (e && e.code === "UNKNOWN_STATION") {
        if (demoFallbackEnabled() && fromCity && toCity && dateYmd) {
          const body = demoResponse(
            fromCity,
            toCity,
            dateYmd,
            "Демо-расписание: для этих городов нет кода РЖД в конфиге."
          );
          setRzdCache(cacheKey, body);
          return res.json(body);
        }
        return res.status(400).json({
          error: e.message || "Неизвестная станция",
          unknownStations: e.unknownStations || [],
        });
      }

      if (demoFallbackEnabled() && fromCity && toCity && dateYmd) {
        const stale = getRzdStale(cacheKey);
        if (stale?.routes?.length) {
          return res.json({
            ...stale,
            fromCache: true,
            message:
              "Показано сохранённое расписание (РЖД временно ограничил IP сервера).",
          });
        }

        const note = isRzdForbidden(e)
          ? "Демо-расписание: РЖД заблокировал IP сервера (403)."
          : "Демо-расписание: сервис РЖД временно недоступен.";

        const body = demoResponse(fromCity, toCity, dateYmd, note);
        setRzdCache(cacheKey, body);
        return res.json(body);
      }

      const msg =
        typeof e?.message === "string" ? e.message : "Ошибка запроса РЖД";
      const code = typeof e?.message === "string" && /дата/i.test(msg) ? 400 : 502;
      res.status(code).json({ error: msg });
    }
  });
}
