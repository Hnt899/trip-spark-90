const url = process.argv[2];
if (!url) {
  console.error("usage: node extract-tutu-text.mjs <url>");
  process.exit(1);
}
const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } });
const html = await r.text();
const start = html.indexOf('id="page_content_start"');
if (start === -1) {
  console.error("no page_content_start");
  process.exit(1);
}
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
chunk = chunk.replace(/<h1[^>]*>/gi, "# ");
chunk = chunk.replace(/<\/li>/gi, "\n");
chunk = chunk.replace(/<li[^>]*>/gi, "• ");
chunk = chunk.replace(/<\/ol>/gi, "\n");
chunk = chunk.replace(/<ol[^>]*>/gi, "\n");
chunk = chunk.replace(/<\/ul>/gi, "\n");
chunk = chunk.replace(/<ul[^>]*>/gi, "\n");
chunk = chunk.replace(/<a[^>]+href="([^"]+)"[^>]*>([^<]*)<\/a>/gi, "[$2]($1)");
chunk = chunk.replace(/<[^>]+>/g, "");
chunk = chunk.replace(/&nbsp;/g, " ");
chunk = chunk.replace(/&mdash;/g, "—");
chunk = chunk.replace(/&ndash;/g, "–");
chunk = chunk.replace(/&quot;/g, '"');
chunk = chunk.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));
chunk = chunk.replace(/\n{3,}/g, "\n\n");
console.log(chunk.trim());
