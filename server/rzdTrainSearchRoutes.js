import { searchTrainsByCities } from "../integrations/rzd-pass/index.js";

/**
 * Расписание поездов из pass.rzd.ru (неофициально, см. integrations/rzd-pass).
 * @param {import('express').Express} app
 */
export function registerRzdTrainSearchRoutes(app) {
  app.get("/api/train-search/rzd", async (req, res) => {
    try {
      const fromCity =
        typeof req.query.from === "string" ? req.query.from.trim() : "";
      const toCity =
        typeof req.query.to === "string" ? req.query.to.trim() : "";
      const dateYmd =
        typeof req.query.date === "string" ? req.query.date.trim() : "";

      const { routes, message } = await searchTrainsByCities({
        fromCity,
        toCity,
        dateYmd,
      });

      res.json({
        routes,
        message:
          routes.length === 0
            ? message ||
              "Прямых поездов не найдено на выбранную дату. Проверьте коды городов или выберите другую дату."
            : undefined,
      });
    } catch (e) {
      console.error("[rzd] train-search failed:", e);
      if (e && e.code === "UNKNOWN_STATION") {
        return res.status(400).json({
          error: e.message || "Неизвестная станция",
          unknownStations: e.unknownStations || [],
        });
      }
      const msg =
        typeof e?.message === "string" ? e.message : "Ошибка запроса РЖД";
      const code = typeof e?.message === "string" && /дата/i.test(msg) ? 400 : 502;
      res.status(code).json({ error: msg });
    }
  });
}
