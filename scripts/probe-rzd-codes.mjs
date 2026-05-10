/** One-off probe: node scripts/probe-rzd-codes.mjs */

/** Сверка кодов см. integrations/rzd-pass/station-codes.json */
const pairs = [
  ["2000000", "2004000", "Msk→SPb"],
  ["2000000", "2030000", "Msk→Ekb"],
];

function dt0Tomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}.${mm}.${d.getFullYear()}`;
}

let cookieHeader = "";

async function postPass(form) {
  const r = await fetch("https://pass.rzd.ru/timetable/public/ru", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: cookieHeader || undefined,
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      Referer: "https://ticket.rzd.ru/",
    },
    body: new URLSearchParams(form).toString(),
  });
  const set = r.headers.getSetCookie?.() ?? [];
  if (set.length) {
    cookieHeader += set.map((s) => s.split(";")[0]).join("; ") + "; ";
  }
  return r.json();
}

async function routesFor(code0, code1) {
  const dt0 = dt0Tomorrow();
  let rid;
  let body = {
    layer_id: "5827",
    dir: "0",
    tfl: "3",
    checkSeats: "1",
    code0,
    code1,
    dt0,
    md: "0",
  };
  for (let i = 0; i < 12; i++) {
    if (rid) body.rid = rid;
    const j = await postPass(body);
    const res = j.result || "OK";
    if (res === "RID" || res === "REQUEST_ID") {
      rid = j.rid || j.RID;
      await new Promise((z) => setTimeout(z, 900));
      continue;
    }
    return {
      msg: j.tp?.[0]?.msgList?.[0]?.message,
      len: j.tp?.[0]?.list?.length ?? 0,
    };
  }
  return { msg: "timeout", len: 0 };
}

for (const [c0, c1, lab] of pairs) {
  const r = await routesFor(c0, c1);
  console.log(lab, r);
}
