/**
 * Клиент к неофициальному JSON API расписания pass.rzd.ru (по мотивам visavi/rzd-api).
 * @param {string} basePath например https://pass.rzd.ru/timetable/public/ru
 */
export function createRzdPassClient(options = {}) {
  const basePath =
    options.basePath || "https://pass.rzd.ru/timetable/public/ru";
  const maxRidAttempts = options.maxRidAttempts ?? 12;
  const ridDelayMs = options.ridDelayMs ?? 900;
  let cookieHeader = "";

  /**
   * @param {Record<string, string>} form
   */
  async function postForm(form) {
    const r = await fetch(basePath, {
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
      const j = await postForm(body);
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
