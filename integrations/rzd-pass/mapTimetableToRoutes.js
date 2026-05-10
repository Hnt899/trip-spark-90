/**
 * Преобразует строку ответа pass.rzd.ru в DTO для фронта (без JSX).
 */

/**
 * @param {string} ddMmYyyy
 * @returns {string} yyyy-MM-dd
 */
function toYmd(ddMmYyyy) {
  if (!ddMmYyyy || typeof ddMmYyyy !== "string") return "";
  const p = ddMmYyyy.split(".");
  if (p.length !== 3) return "";
  const [dd, mm, yyyy] = p;
  if (!yyyy || yyyy.length !== 4) return "";
  return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
}

/**
 * @param {string} way "HH:MM" или "H:MM"
 */
export function formatTimeInWay(way) {
  if (!way || typeof way !== "string") return "—";
  const seg = way.split(":").filter((x) => x !== "");
  if (seg.length < 2) return way;
  const mm = parseInt(seg[seg.length - 1], 10);
  const hh = parseInt(seg[seg.length - 2], 10);
  if (Number.isNaN(mm) || Number.isNaN(hh)) return way;
  return `${hh} ч ${String(mm).padStart(2, "0")} м`;
}

/**
 * @param {string | undefined} loc
 * @returns {null | { type: 'platzkart'|'coupe'|'sv', name: string }}
 */
function mapCarKind(typeLoc, typeName) {
  const loc = (typeLoc || typeName || "").trim();
  if (!loc || /сидяч/i.test(loc)) return null;
  if (/плац/i.test(loc)) return { type: "platzkart", name: "Плацкарт" };
  if (/купе/i.test(loc)) return { type: "coupe", name: "Купе" };
  if (loc === "СВ" || /люкс/i.test(loc))
    return { type: "sv", name: "СВ" };
  return null;
}

/**
 * @param {unknown} tariff
 */
function tariffNum(tariff) {
  const n =
    typeof tariff === "number" ? tariff : parseInt(String(tariff ?? ""), 10);
  return Number.isFinite(n) ? n : 0;
}

/**
 * @param {unknown} seats
 */
function seatsNum(seats) {
  const n =
    typeof seats === "number" ? seats : parseInt(String(seats ?? ""), 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/**
 * @param {any} row
 * @param {{ fromCity: string, toCity: string }} cities
 */
export function mapTimetableRowToRoute(row, cities) {
  const cars = Array.isArray(row.cars) ? row.cars : [];
  /** @type {Map<string, { type: string, name: string, lowerBerths: number, upperBerths: number, price: number }>} */
  const acc = new Map();

  for (const car of cars) {
    const kind = mapCarKind(car.typeLoc, car.type);
    if (!kind) continue;
    const free = seatsNum(car.freeSeats);
    const price = tariffNum(car.tariff);
    const lower = Math.ceil(free / 2);
    const upper = Math.floor(free / 2);
    const prev = acc.get(kind.type);
    if (!prev) {
      acc.set(kind.type, {
        type: kind.type,
        name: kind.name,
        lowerBerths: lower,
        upperBerths: upper,
        price: price || 999999999,
      });
    } else {
      prev.lowerBerths += lower;
      prev.upperBerths += upper;
      if (price > 0) prev.price = Math.min(prev.price, price);
    }
  }

  const tickets = [...acc.values()].map((t) => ({
    type: t.type,
    name: t.name,
    lowerBerths: t.lowerBerths,
    upperBerths: t.upperBerths,
    price: t.price >= 999999999 ? 0 : t.price,
  }));

  const minPrice = tickets.length
    ? Math.min(...tickets.map((t) => t.price).filter((p) => p > 0))
    : 0;

  const tags = [];
  if (row.bFirm) tags.push("Фирменный");

  const displayName = [row.trainName, row.brand]
    .filter((s) => typeof s === "string" && s.trim())
    .map((s) => s.trim())
    .filter((s, i, a) => a.indexOf(s) === i)
    .join(" · ");

  const id = [
    row.number,
    row.date0,
    row.time0,
    row.time1,
    row.station0,
  ]
    .join("|")
    .replace(/[^\w\u0400-\u04FF|:-]/g, "_");

  return {
    id,
    trainNumber: String(row.number || "").trim(),
    trainName: displayName,
    tags: tags.length ? tags : undefined,
    departureTime: String(row.time0 || "").trim(),
    departureDate: toYmd(row.date0),
    departureStation: String(row.station0 || row.route0 || "").trim(),
    departureCity: cities.fromCity,
    arrivalTime: String(row.time1 || "").trim(),
    arrivalDate: toYmd(row.date1),
    arrivalStation: String(row.station1 || row.route1 || "").trim(),
    arrivalCity: cities.toCity,
    duration: formatTimeInWay(row.timeInWay),
    reviews: { count: 0, rating: 0 },
    tickets,
    minPrice: minPrice > 0 ? minPrice : 0,
  };
}

/**
 * @param {object[]} rows
 * @param {{ fromCity: string, toCity: string }} cities
 */
export function mapTimetableListToRoutes(rows, cities) {
  return rows.map((row) => mapTimetableRowToRoute(row, cities));
}
