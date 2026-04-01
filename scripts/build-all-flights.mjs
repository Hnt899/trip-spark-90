/**
 * Выгружает текст статей с avia.tutu.ru и пишет JSON для справочной TudaSuda.
 * Запуск: node scripts/build-all-flights.mjs
 */
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const ARTICLES = [
  ["additional-services", "https://avia.tutu.ru/2read/avia_info/additional_services/"],
  ["composition-of-the-price", "https://avia.tutu.ru/2read/avia_info/composition_of_the_price/"],
  ["avia-cost", "https://avia.tutu.ru/2read/avia/avia_cost/"],
  ["convenient-place", "https://avia.tutu.ru/2read/avia/convenient_place/"],
  ["non-refundable-ticket", "https://avia.tutu.ru/2read/avia_info/non-refundable_ticket/"],
  ["foreign-flights", "https://avia.tutu.ru/2read/avia_info/foreign/"],
  ["usa-visa", "https://avia.tutu.ru/2read/avia_info/usa_visa/"],
  ["avia-business-trip", "https://avia.tutu.ru/2read/avia_info/avia_business_trip/"],
  ["tariff-decoding", "https://avia.tutu.ru/2read/avia_info/decoding/"],
  ["avia-payment", "https://avia.tutu.ru/2read/avia_payment/avia_payment/"],
  ["avia-booking-info", "https://avia.tutu.ru/2read/avia_info/booking/"],
  ["aviabooking", "https://avia.tutu.ru/2read/avia/aviabooking/"],
  ["avia-receiving", "https://avia.tutu.ru/2read/avia/avia_receiving/"],
  ["order-change", "https://avia.tutu.ru/2read/avia/order_change/"],
  ["auto-checkin", "https://avia.tutu.ru/2read/avia_info/auto_chekin/"],
  ["avia-registration", "https://avia.tutu.ru/2read/avia/avia_registration/"],
  ["eticket-avia", "https://avia.tutu.ru/2read/avia_eticket/eticket_avia/"],
  ["flight-cancellation", "https://avia.tutu.ru/2read/avia/flight_cancellation/"],
  ["flight-delay", "https://avia.tutu.ru/2read/avia/flight_delay/"],
  ["return-lk", "https://avia.tutu.ru/2read/avia/return_lk/"],
  ["return-app", "https://avia.tutu.ru/2read/avia/return_app/"],
  ["returns", "https://avia.tutu.ru/2read/avia/returns/"],
  ["100return", "https://avia.tutu.ru/2read/avia/100return/"],
  ["ticket-exchange", "https://avia.tutu.ru/2read/avia/ticket_exchange/"],
  ["avia-transfer", "https://avia.tutu.ru/2read/avia/avia_transfer/"],
  ["codeshare", "https://avia.tutu.ru/2read/avia_info/%D1%81odeshare/"],
  ["no-fl", "https://avia.tutu.ru/2read/avia_info/no_fl/"],
  ["avia-rules", "https://avia.tutu.ru/2read/avia_rules/avia_rules/"],
  ["carryon", "https://avia.tutu.ru/2read/avia/carryon/"],
  ["avia-requirements", "https://avia.tutu.ru/2read/avia/avia_requirements/"],
  ["pets-in-plane", "https://avia.tutu.ru/2read/avia_info/pets_in_plane/"],
  ["avia-faq", "https://avia.tutu.ru/2read/avia/88_faq/"],
  ["airport-to-railway-station", "https://avia.tutu.ru/2read/avia/kak_dobratsya_ot_aeroporta_do_vokzala/"],
  ["from-airport-to-airport", "https://avia.tutu.ru/2read/avia/from_airport_to_airport/"],
  ["railway-station-to-airport", "https://avia.tutu.ru/2read/avia/kak_dobratsya_ot_vokzala_do_aeroporta/"],
];

function decodeEntities(s) {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&quot;/g, '"')
    .replace(/&laquo;/g, "«")
    .replace(/&raquo;/g, "»")
    .replace(/&amp;/g, "&")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));
}

async function extractText(url) {
  const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } });
  const html = await r.text();
  const start = html.indexOf('id="page_content_start"');
  if (start === -1) throw new Error("no anchor: " + url);
  const endMarkers = ["Была ли полезна статья", "was_helpful", "poll_block"];
  let end = html.length;
  for (const m of endMarkers) {
    const i = html.indexOf(m, start + 100);
    if (i !== -1 && i < end) end = i;
  }
  let chunk = html.slice(start, end);
  chunk = chunk.replace(/<script[\s\S]*?<\/script>/gi, "");
  chunk = chunk.replace(/<style[\s\S]*?<\/style>/gi, "");
  chunk = chunk.replace(/<br\s*\/?>/gi, "\n");
  chunk = chunk.replace(/<\/p>/gi, "\n\n");
  chunk = chunk.replace(/<\/h2>/gi, "\n\n## ");
  chunk = chunk.replace(/<\/h3>/gi, "\n\n### ");
  chunk = chunk.replace(/<h2[^>]*>/gi, "\n\n## ");
  chunk = chunk.replace(/<h3[^>]*>/gi, "\n\n### ");
  chunk = chunk.replace(/<\/h1>/gi, "\n\n");
  chunk = chunk.replace(/<h1[^>]*id="page_content_start"[^>]*>/gi, "\n# ");
  chunk = chunk.replace(/<h1[^>]*>/gi, "\n# ");
  chunk = chunk.replace(/<\/li>/gi, "\n");
  chunk = chunk.replace(/<li[^>]*>/gi, "• ");
  chunk = chunk.replace(/<\/ol>/gi, "\n");
  chunk = chunk.replace(/<ol[^>]*>/gi, "\n");
  chunk = chunk.replace(/<\/ul>/gi, "\n");
  chunk = chunk.replace(/<ul[^>]*>/gi, "\n");
  chunk = chunk.replace(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, t) => {
    const label = t.replace(/<[^>]+>/g, "").trim();
    return `[${label}](${href})`;
  });
  chunk = chunk.replace(/<[^>]+>/g, "");
  chunk = decodeEntities(chunk);
  chunk = chunk.replace(/\n{3,}/g, "\n\n");
  let t = chunk.trim();
  t = t.replace(/^id="page_content_start">\s*/i, "");
  t = t.replace(/\n\[\]\(https?:\/\/[^)]*\)\s*$/g, "");
  t = t.replace(/\r?\nTRANSLATE with[\s\S]*/i, "");
  t = t.replace(/\nCOPY THE URL BELOW[\s\S]*$/m, "");
  t = t.replace(/&copy;/gi, "©");
  return t.trim();
}

function parseSections(raw) {
  const lines = raw.split("\n").map((l) => l.trim());
  let title = "";
  const sections = [];
  let i = 0;
  if (lines[0]?.startsWith("# ")) {
    title = lines[0].slice(2).trim();
    i = 1;
  }
  let currentTitle = null;
  let currentParas = [];
  function flush() {
    let text = currentParas.join("\n").trim();
    text = text.replace(/^\#\#\s*\n/m, "");
    if (text) sections.push({ title: currentTitle, body: text });
    currentParas = [];
  }
  for (; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      flush();
      currentTitle = line.slice(3).trim() || null;
      continue;
    }
    if (line.startsWith("### ")) {
      flush();
      currentTitle = line.slice(4).trim();
      continue;
    }
    if (line) currentParas.push(line);
  }
  flush();
  return { title, sections };
}

const out = {};
for (const [slug, url] of ARTICLES) {
  try {
    process.stderr.write(slug + "...");
    const text = await extractText(url);
    out[slug] = parseSections(text);
    process.stderr.write(" ok\n");
    await new Promise((r) => setTimeout(r, 400));
  } catch (e) {
    process.stderr.write(" FAIL " + e.message + "\n");
    out[slug] = { title: "", sections: [{ title: null, body: "Не удалось загрузить текст. Откройте материал на сайте источника." }], error: String(e) };
  }
}

const path = join(root, "src", "data", "flights-content.json");
writeFileSync(path, JSON.stringify(out, null, 2), "utf8");
console.error("Wrote", path);
