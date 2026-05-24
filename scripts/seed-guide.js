import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../server/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ARTICLES_DIR = path.join(ROOT, "src/pages/guide/articles");

const CATEGORY_META = [
  { slug: "passenger", name: "Полезно пассажиру", sortOrder: 10 },
  { slug: "analysis", name: "Разборы", sortOrder: 20 },
  { slug: "tourism", name: "Полезно про туризм", sortOrder: 30 },
  { slug: "transport", name: "Транспорт", sortOrder: 40 },
  { slug: "long-term", name: "Надолго в другую страну", sortOrder: 50 },
  { slug: "first-time", name: "Первый раз", sortOrder: 60 },
  { slug: "russia-features", name: "Фишки России", sortOrder: 70 },
  { slug: "important", name: "Самое важное сейчас", sortOrder: 80 },
  { slug: "russia", name: "Россия", sortOrder: 90 },
  { slug: "countries", name: "Страны", sortOrder: 100 },
];

const translitMap = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z",
  и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch",
  ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

function slugify(value) {
  const translit = String(value || "")
    .split("")
    .map((ch) => {
      const lower = ch.toLowerCase();
      if (translitMap[lower] !== undefined) {
        const out = translitMap[lower];
        return ch === lower ? out : out.toUpperCase();
      }
      return ch;
    })
    .join("");
  return translit
    .replace(/[?«»—()!]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function cleanJsxText(input) {
  return String(input || "")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, " ")
    .replace(/\{"\s*"\}/g, " ")
    .replace(/\{\s*"([^"]*)"\s*\}/g, "$1")
    .replace(/\{\s*'([^']*)'\s*\}/g, "$1")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?strong>/gi, "")
    .replace(/<\/?em>/gi, "")
    .replace(/<\/?b>/gi, "")
    .replace(/<\/?i>/gi, "")
    .replace(/<\/?span[^>]*>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\s+\n/g, "\n")
    .replace(/\n\s+/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function walkTsxFiles(dir, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === "GuideArticleTemplate.tsx") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkTsxFiles(full, out);
    } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
      out.push(full);
    }
  }
  return out;
}

function buildTitleToFileMap() {
  const files = walkTsxFiles(ARTICLES_DIR);
  const map = [];
  for (const filePath of files) {
    const src = read(filePath);
    if (/GuideArticleTemplate/.test(src)) continue;
    if (/Информация находится в разработке/i.test(src)) continue;
    const rel = path.relative(ARTICLES_DIR, filePath).replace(/\\/g, "/");
    const category = rel.split("/")[0];
    if (!category || !CATEGORY_META.some((c) => c.slug === category)) continue;
    const h1 = src.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (!h1) continue;
    const title = cleanJsxText(h1[1]);
    if (!title) continue;
    map.push({
      category,
      title,
      slug: slugify(title),
      filePath,
    });
  }
  return map;
}

function parseArticleTsx(filePath) {
  const src = read(filePath);
  if (/GuideArticleTemplate/.test(src)) return null;
  if (/Информация находится в разработке/i.test(src)) return null;
  const blocks = [];
  const tokenRe = /<(h2|h3|p|li)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let liBuffer = [];
  let token = null;
  while ((token = tokenRe.exec(src)) !== null) {
    const tag = token[1].toLowerCase();
    const text = cleanJsxText(token[2]);
    if (!text) continue;
    if (tag === "li") {
      liBuffer.push(text);
      continue;
    }
    if (liBuffer.length) {
      blocks.push({ type: "bulletList", items: [...liBuffer] });
      liBuffer = [];
    }
    if (tag === "h2" || tag === "h3") {
      blocks.push({ type: "heading", level: tag === "h2" ? 2 : 3, text });
    } else if (tag === "p") {
      blocks.push({ type: "paragraph", text });
    }
  }
  if (liBuffer.length) blocks.push({ type: "bulletList", items: [...liBuffer] });

  const ctaRe = /<Link\s+to="(\/guide\/[^"]+)"[^>]*>([\s\S]*?)<\/Link>/g;
  let cta = null;
  while ((cta = ctaRe.exec(src)) !== null) {
    const url = cta[1].trim();
    if (url === "/guide") continue;
    const text = cleanJsxText(cta[2]);
    if (!text) continue;
    blocks.push({ type: "ctaButton", text, url, variant: "primary" });
  }

  if (!blocks.length) return null;
  const firstParagraph = blocks.find((b) => b.type === "paragraph");
  return {
    excerpt: firstParagraph?.text?.slice(0, 240) || "Статья путеводителя TudaSuda.",
    blocks,
  };
}

async function upsertCategory(client, item) {
  const { rows } = await client.query(
    `INSERT INTO guide_categories (parent_id, slug, name, sort_order)
     VALUES (NULL, $1, $2, $3)
     ON CONFLICT (parent_id, slug)
     DO UPDATE SET name = EXCLUDED.name, sort_order = EXCLUDED.sort_order, updated_at = NOW()
     RETURNING id, slug`,
    [item.slug, item.name, item.sortOrder],
  );
  return rows[0];
}

async function insertPostIfNotExists(client, payload) {
  const exists = await client.query(
    `SELECT id FROM guide_posts WHERE category_slug = $1 AND slug = $2`,
    [payload.categorySlug, payload.slug],
  );
  if (exists.rows.length) return "exists";
  await client.query(
    `INSERT INTO guide_posts (
      category_id, category_slug, slug, title, excerpt, content_blocks, status, published_at
    ) VALUES ($1::uuid, $2, $3, $4, $5, $6::jsonb, 'published', NOW())`,
    [
      payload.categoryId,
      payload.categorySlug,
      payload.slug,
      payload.title,
      payload.excerpt,
      JSON.stringify(payload.blocks),
    ],
  );
  return "inserted";
}

async function main() {
  const client = await pool.connect();
  try {
    const categoryRows = new Map();
    await client.query("BEGIN");
    for (const category of CATEGORY_META) {
      const row = await upsertCategory(client, category);
      categoryRows.set(category.slug, row.id);
    }

    const guideItems = buildTitleToFileMap();
    let inserted = 0;
    let skipped = 0;
    let errors = 0;

    for (const item of guideItems) {
      const categoryId = categoryRows.get(item.category);
      if (!categoryId) {
        skipped += 1;
        continue;
      }
      const parsed = parseArticleTsx(item.filePath);
      if (!parsed) {
        skipped += 1;
        continue;
      }
      try {
        const result = await insertPostIfNotExists(client, {
          categoryId,
          categorySlug: item.category,
          slug: item.slug,
          title: item.title,
          excerpt: parsed.excerpt,
          blocks: parsed.blocks,
        });
        if (result === "inserted") inserted += 1;
        else skipped += 1;
      } catch (e) {
        errors += 1;
        console.error(`[seed-guide] ${item.category}/${item.slug}:`, e.message);
      }
    }

    await client.query("COMMIT");
    console.log(`[seed-guide] inserted=${inserted} skipped=${skipped} errors=${errors}`);
  } catch (e) {
    await client.query("ROLLBACK");
    console.error("Seed guide failed:", e);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

main();
