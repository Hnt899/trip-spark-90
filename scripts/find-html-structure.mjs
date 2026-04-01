const url = "https://avia.tutu.ru/2read/avia/order_change/";
const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
const t = await r.text();
const tags = ["article", "main", "content", "articleBody", "post", "help"];
for (const tag of tags) {
  console.log(tag, t.includes("<" + tag), t.includes('class="' + tag));
}
const h1 = t.match(/<h1[^>]*>([^<]*)</);
console.log("h1", h1?.[1]);
