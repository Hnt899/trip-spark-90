import { createRzdPassClient } from "./rzdClient.js";

/**
 * @param {string} ymd дата в формате yyyy-mm-dd
 * @returns {string} dd.mm.yyyy
 */
export function toRzdDate(ymd) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd?.trim?.() || "");
  if (!m) throw new Error("Некорректная дата, ожидается YYYY-MM-DD");
  return `${m[3]}.${m[2]}.${m[1]}`;
}

/**
 * @param {{ code0: string, code1: string, dateYmd: string, client?: ReturnType<typeof createRzdPassClient> }} p
 * @returns {Promise<{ raw: any, trains: object[], message?: string }>}
 */
export async function fetchTrainRoutes(p) {
  const client = p.client || createRzdPassClient();
  const dt0 = toRzdDate(p.dateYmd);
  const j = await client.postWithRid({
    layer_id: "5827",
    dir: "0",
    tfl: "3",
    checkSeats: "1",
    code0: String(p.code0),
    code1: String(p.code1),
    dt0,
    md: "0",
  });

  const msg = j?.tp?.[0]?.msgList?.[0]?.message;
  const list = j?.tp?.[0]?.list;
  const trains = Array.isArray(list)
    ? list.filter(
        (row) =>
          row &&
          typeof row === "object" &&
          typeof row.number === "string" &&
          row.number.length > 0
      )
    : [];

  return { raw: j, trains, message: typeof msg === "string" ? msg : undefined };
}
