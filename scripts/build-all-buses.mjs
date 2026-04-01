/**
 * Выгружает текст статей с www.tutu.ru (раздел автобусы) → buses-content.json.
 * Запуск: node scripts/build-all-buses.mjs
 */
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const ARTICLES = [
  ["bus-cancel", "https://www.tutu.ru/2read/bus/bus_cancel/"],
  ["check-money", "https://www.tutu.ru/2read/bus/check_money/"],
  ["busticket-changes", "https://www.tutu.ru/2read/bus/busticket_changes/"],
  ["bus-rules", "https://www.tutu.ru/2read/bus/bus_rules/"],
  ["bus-ticket", "https://www.tutu.ru/2read/bus/bus_ticket/"],
  ["baggage", "https://www.tutu.ru/2read/bus/baggage/"],
  ["choose-bus", "https://www.tutu.ru/2read/bus/choose_bus/"],
  ["buy-error", "https://www.tutu.ru/2read/bus/buy_error/"],
  ["bus-boarding", "https://www.tutu.ru/2read/bus/bus_boarding/"],
  ["bus-promokod", "https://www.tutu.ru/2read/bus/bus_promokod/"],
  ["bus-ticket-refund", "https://www.tutu.ru/2read/bus/bus_ticket_refund/"],
  ["bus-children", "https://www.tutu.ru/2read/bus/bus_children/"],
  ["pets-in-bus", "https://www.tutu.ru/2read/bus/pets_in_bus/"],
  ["change-ticket", "https://www.tutu.ru/2read/bus/change_ticket/"],
  ["e-ticket", "https://www.tutu.ru/2read/bus_news/e_ticket/"],
  ["afterpay", "https://www.tutu.ru/2read/bus/afterpay/"],
  ["moscow-region", "https://www.tutu.ru/2read/articles/moscow_region/"],
  ["moscow-region-troyka", "https://www.tutu.ru/2read/bus_news/moscow_region_troyka/"],
  ["moscow-fares", "https://www.tutu.ru/2read/articles/moscow_fares/"],
  ["mostransavto-fares", "https://www.tutu.ru/2read/articles/mostransavto_fares/"],
  ["pcr", "https://www.tutu.ru/2read/bus_news/pcr/"],
  ["efsmkpp", "https://www.tutu.ru/2read/bus_news/efsmkpp/"],
  ["kursk-agreement", "https://www.tutu.ru/2read/bus_news/kursk_agreement/"],
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
    out[slug] = {
      title: "",
      sections: [
        {
          title: null,
          body: "Не удалось загрузить текст. Откройте материал на сайте источника.",
        },
      ],
      error: String(e),
    };
  }
}

const path = join(root, "src", "data", "buses-content.json");
writeFileSync(path, JSON.stringify(out, null, 2), "utf8");
console.error("Wrote", path);
