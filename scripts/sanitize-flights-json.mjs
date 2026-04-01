import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const root = dirname(fileURLToPath(import.meta.url));
const path = join(root, "..", "src", "data", "flights-content.json");
const j = JSON.parse(readFileSync(path, "utf8"));

function fixBody(s) {
  if (typeof s !== "string") return s;
  return s.replace(/\r?\nTRANSLATE with[\s\S]*/i, "").trim();
}

for (const key of Object.keys(j)) {
  for (const sec of j[key].sections || []) {
    sec.body = fixBody(sec.body);
  }
}
writeFileSync(path, JSON.stringify(j, null, 2), "utf8");
console.log("sanitized", path);
