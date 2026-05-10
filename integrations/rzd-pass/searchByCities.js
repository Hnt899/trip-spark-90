import stationCodes from "./station-codes.json" with { type: "json" };
import { fetchTrainRoutes } from "./fetchTrainRoutes.js";
import { mapTimetableListToRoutes } from "./mapTimetableToRoutes.js";

/**
 * @param {string} ymd
 */
function isYmd(ymd) {
  return /^\d{4}-\d{2}-\d{2}$/.test(ymd?.trim?.() || "");
}

/**
 * @param {{ fromCity: string, toCity: string, dateYmd: string }} p
 * @returns {Promise<{ routes: object[], message?: string, unknownStations: string[] }>}
 */
export async function searchTrainsByCities(p) {
  const fromCity = (p.fromCity || "").trim();
  const toCity = (p.toCity || "").trim();
  const dateYmd = (p.dateYmd || "").trim();

  if (!fromCity || !toCity) {
    throw new Error("Укажите город отправления и назначения");
  }
  if (fromCity === toCity) {
    throw new Error("Города отправления и назначения должны различаться");
  }
  if (!isYmd(dateYmd)) {
    throw new Error("Дата должна быть в формате YYYY-MM-DD");
  }

  const unknownStations = [];
  const code0 = stationCodes[fromCity];
  const code1 = stationCodes[toCity];
  if (!code0) unknownStations.push(fromCity);
  if (!code1) unknownStations.push(toCity);
  if (unknownStations.length) {
    const err = new Error(
      "Для данных городов нет кода станции РЖД в конфигурации"
    );
    err.code = "UNKNOWN_STATION";
    err.unknownStations = unknownStations;
    throw err;
  }

  const { trains, message } = await fetchTrainRoutes({
    code0,
    code1,
    dateYmd,
  });

  const routes = mapTimetableListToRoutes(trains, { fromCity, toCity });
  return { routes, message, unknownStations: [] };
}
