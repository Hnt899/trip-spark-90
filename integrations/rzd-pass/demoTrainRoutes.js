/**
 * Демо-расписание, если pass.rzd.ru недоступен (403 на VPS и т.п.).
 * Формат совпадает с mapTimetableListToRoutes.
 */

function nextDayYmd(ymd) {
  const d = new Date(`${ymd}T12:00:00`);
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

/**
 * @param {{ fromCity: string, toCity: string, dateYmd: string }} p
 */
export function getDemoTrainRoutes(p) {
  const fromCity = p.fromCity || "Москва";
  const toCity = p.toCity || "Санкт-Петербург";
  const dep = /^\d{4}-\d{2}-\d{2}$/.test(p.dateYmd || "")
    ? p.dateYmd
    : new Date().toISOString().slice(0, 10);
  const arr = nextDayYmd(dep);

  const depStation = `${fromCity.toUpperCase()} (вокзал)`;
  const arrStation = `${toCity.toUpperCase()} (вокзал)`;

  const templates = [
    {
      id: `demo-016A-${dep}`,
      trainNumber: "016А",
      trainName: "Арктика",
      tags: ["Фирменный"],
      departureTime: "13:50",
      departureDate: dep,
      departureStation: depStation,
      departureCity: fromCity,
      arrivalTime: "09:02",
      arrivalDate: arr,
      arrivalStation: arrStation,
      arrivalCity: toCity,
      duration: "19 ч 12 м",
      tickets: [
        { type: "sv", name: "СВ", lowerBerths: 8, upperBerths: 8, price: 8900 },
        { type: "coupe", name: "Купе", lowerBerths: 24, upperBerths: 24, price: 4200 },
        { type: "platzkart", name: "Плацкарт", lowerBerths: 40, upperBerths: 40, price: 2100 },
      ],
    },
    {
      id: `demo-728C-${dep}`,
      trainNumber: "728С",
      trainName: "Сапсан",
      tags: ["Фирменный"],
      departureTime: "17:30",
      departureDate: dep,
      departureStation: depStation,
      departureCity: fromCity,
      arrivalTime: "21:24",
      arrivalDate: dep,
      arrivalStation: arrStation,
      arrivalCity: toCity,
      duration: "3 ч 54 м",
      tickets: [
        { type: "coupe", name: "Сидячий", lowerBerths: 120, upperBerths: 0, price: 3500 },
      ],
    },
    {
      id: `demo-002A-${dep}`,
      trainNumber: "002А",
      trainName: "Красная стрела",
      tags: ["Фирменный"],
      departureTime: "23:55",
      departureDate: dep,
      departureStation: depStation,
      departureCity: fromCity,
      arrivalTime: "07:55",
      arrivalDate: arr,
      arrivalStation: arrStation,
      arrivalCity: toCity,
      duration: "8 ч 00 м",
      tickets: [
        { type: "sv", name: "СВ", lowerBerths: 20, upperBerths: 20, price: 13399 },
        { type: "coupe", name: "Купе", lowerBerths: 40, upperBerths: 34, price: 6500 },
      ],
    },
    {
      id: `demo-030U-${dep}`,
      trainNumber: "030У",
      trainName: "Двухэтажный",
      tags: ["Фирменный"],
      departureTime: "23:52",
      departureDate: dep,
      departureStation: depStation,
      departureCity: fromCity,
      arrivalTime: "10:07",
      arrivalDate: arr,
      arrivalStation: arrStation,
      arrivalCity: toCity,
      duration: "10 ч 15 м",
      tickets: [{ type: "coupe", name: "Купе", lowerBerths: 13, upperBerths: 12, price: 4477 }],
    },
  ];

  return templates.map((t) => ({
    ...t,
    reviews: { count: 0, rating: 0 },
    minPrice: Math.min(...t.tickets.map((x) => x.price).filter((pr) => pr > 0)),
  }));
}
