const url = process.argv[2] || "https://avia.tutu.ru/2read/avia/order_change/";
const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
const html = await r.text();
const h1i = html.indexOf("<h1");
if (h1i === -1) {
  console.error("no h1");
  process.exit(1);
}
const slice = html.slice(Math.max(0, h1i - 500), h1i + 200);
console.log(slice);
