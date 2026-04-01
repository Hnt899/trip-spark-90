import { writeFileSync } from "fs";

const url = process.argv[2];
if (!url) {
  console.error("usage: node extract-tutu-article.mjs <url>");
  process.exit(1);
}
const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } });
const html = await r.text();
const m = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
if (!m) {
  console.error("no article");
  process.exit(1);
}
let inner = m[1];
inner = inner.replace(/<script[\s\S]*?<\/script>/gi, "");
inner = inner.replace(/<style[\s\S]*?<\/style>/gi, "");
inner = inner.replace(/<br\s*\/?>/gi, "\n");
inner = inner.replace(/<\/p>/gi, "\n\n");
inner = inner.replace(/<\/h[1-6]>/gi, "\n\n");
inner = inner.replace(/<\/li>/gi, "\n");
inner = inner.replace(/<li[^>]*>/gi, "• ");
inner = inner.replace(/<[^>]+>/g, "");
inner = inner.replace(/&nbsp;/g, " ");
inner = inner.replace(/&mdash;/g, "—");
inner = inner.replace(/&laquo;/g, "«");
inner = inner.replace(/&raquo;/g, "»");
inner = inner.replace(/\n{3,}/g, "\n\n");
console.log(inner.trim().slice(0, 12000));
