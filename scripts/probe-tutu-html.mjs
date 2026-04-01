const url = process.argv[2] || "https://avia.tutu.ru/2read/avia/order_change/";
const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
const t = await r.text();
const idx = t.indexOf("page_content_start");
console.log("len", t.length, "anchor", idx);
console.log(t.slice(Math.max(0, idx - 100), idx + 400));
