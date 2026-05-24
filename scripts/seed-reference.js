import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../server/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function read(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), "utf8");
}

function slugify(value) {
  const translitMap = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z",
    и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
    с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch",
    ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
  };
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
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/gi, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
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

function parseArticleListTs(relPath) {
  const src = read(relPath);
  const out = [];
  const re = /\{\s*title:\s*"([^"]+)"[\s\S]*?path:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"/g;
  let m = null;
  while ((m = re.exec(src)) !== null) {
    out.push({
      title: m[1].trim(),
      path: m[2].trim(),
      category: m[3].trim(),
    });
  }
  return out;
}

function parseTrainsRouteToFileMap(metaItems) {
  const dir = path.join(ROOT, "src/pages/reference/articles");
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => ({
      relPath: `src/pages/reference/articles/${f}`,
      content: fs.readFileSync(path.join(dir, f), "utf8"),
    }));

  const routeMap = new Map();
  for (const item of metaItems) {
    const slug = item.path.split("/").pop();
    if (!slug) continue;
    const exact = files.find((f) =>
      f.content.includes(`>${item.title}<`) ||
      f.content.includes(`"${item.title}"`) ||
      f.content.includes(item.title),
    );
    if (exact) {
      routeMap.set(slug, exact.relPath);
      continue;
    }
    const bySlugGuess = files.find((f) =>
      f.relPath.toLowerCase().includes(slug.replace(/-/g, "").toLowerCase()),
    );
    if (bySlugGuess) routeMap.set(slug, bySlugGuess.relPath);
  }
  return routeMap;
}

function parseTrainArticleTsx(relPath) {
  const src = read(relPath);
  if (/Информация находится в разработке/i.test(src)) {
    return null;
  }
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
      blocks.push({
        type: "heading",
        level: tag === "h2" ? 2 : 3,
        text,
      });
    } else if (tag === "p") {
      blocks.push({ type: "paragraph", text });
    }
  }
  if (liBuffer.length) {
    blocks.push({ type: "bulletList", items: [...liBuffer] });
  }

  const ctaRe = /<Link\s+to="(\/reference\/[^"]+)"[^>]*>([\s\S]*?)<\/Link>/g;
  let cta = null;
  while ((cta = ctaRe.exec(src)) !== null) {
    const url = cta[1].trim();
    if (url === "/reference" || url === "/reference/trains") continue;
    const text = cleanJsxText(cta[2]);
    if (!text) continue;
    blocks.push({ type: "ctaButton", text, url, variant: "primary" });
  }

  if (!blocks.length) return null;
  const headingMatch = src.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const title = cleanJsxText(headingMatch?.[1] || "");
  const firstParagraph = blocks.find((b) => b.type === "paragraph");
  return {
    title,
    excerpt:
      firstParagraph?.text?.slice(0, 240) ||
      "Справочная статья TudaSuda.",
    blocks,
  };
}

function splitParagraphsWithList(raw) {
  const parts = String(raw || "")
    .split(/\n\s*\n/)
    .map((x) => x.trim())
    .filter(Boolean);
  const blocks = [];
  for (const part of parts) {
    const lines = part
      .split(/\n/)
      .map((x) => x.trim())
      .filter(Boolean);
    if (lines.length >= 2 && lines.every((line) => /^[-—•]\s+/.test(line))) {
      blocks.push({
        type: "bulletList",
        items: lines.map((line) => line.replace(/^[-—•]\s+/, "").trim()),
      });
      continue;
    }
    if (lines.length >= 2 && lines.every((line) => /^\d+[\)\.]?\s+/.test(line))) {
      blocks.push({
        type: "orderedList",
        items: lines.map((line) => line.replace(/^\d+[\)\.]?\s+/, "").trim()),
      });
      continue;
    }
    blocks.push({ type: "paragraph", text: part });
  }
  return blocks;
}

function parseJsonArticle(bundle) {
  const title = String(bundle?.title || "").trim();
  const sections = Array.isArray(bundle?.sections) ? bundle.sections : [];
  const blocks = [];
  for (const section of sections) {
    const sectionTitle = String(section?.title || "").trim();
    if (sectionTitle) blocks.push({ type: "heading", level: 2, text: sectionTitle });
    blocks.push(...splitParagraphsWithList(section?.body || ""));
  }
  return {
    title,
    excerpt:
      (blocks.find((b) => b.type === "paragraph")?.text || title || "").slice(0, 240),
    blocks,
  };
}

async function ensureSection(client, { kind, name, slug, parentId = null, sortOrder = 0 }) {
  const normSlug = slugify(slug || name) || kind;
  const { rows } = await client.query(
    `INSERT INTO reference_sections (parent_id, kind, slug, name, sort_order)
     VALUES ($1::uuid, $2, $3, $4, $5)
     ON CONFLICT (kind, parent_id, slug)
     DO UPDATE SET name = EXCLUDED.name, sort_order = EXCLUDED.sort_order, updated_at = NOW()
     RETURNING id`,
    [parentId, kind, normSlug, name, sortOrder],
  );
  return rows[0].id;
}

async function insertPost(client, payload) {
  const exists = await client.query(
    `SELECT id FROM reference_posts WHERE kind = $1 AND slug = $2`,
    [payload.kind, payload.slug],
  );
  if (exists.rows.length) return { status: "exists" };
  await client.query(
    `INSERT INTO reference_posts (
      section_id, kind, slug, title, excerpt, content_blocks, status, published_at
    ) VALUES ($1::uuid, $2, $3, $4, $5, $6::jsonb, 'published', NOW())`,
    [
      payload.sectionId,
      payload.kind,
      payload.slug,
      payload.title,
      payload.excerpt,
      JSON.stringify(payload.blocks),
    ],
  );
  return { status: "inserted" };
}

async function seedTrains(client) {
  const topSectionId = await ensureSection(client, {
    kind: "trains",
    name: "Поезда",
    slug: "trains",
    parentId: null,
    sortOrder: 10,
  });

  const trainMeta = parseArticleListTs("src/data/referenceSearch.ts");
  const slugToFile = parseTrainsRouteToFileMap(trainMeta);
  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < trainMeta.length; i += 1) {
    const item = trainMeta[i];
    const slug = item.path.split("/").pop();
    if (!slug) continue;
    const sectionId = await ensureSection(client, {
      kind: "trains",
      name: item.category,
      slug: slugify(item.category),
      parentId: topSectionId,
      sortOrder: i,
    });
    const filePath = slugToFile.get(slug);
    if (!filePath) {
      skipped += 1;
      console.log(`[trains] skip (no file): ${slug}`);
      continue;
    }
    const parsed = parseTrainArticleTsx(filePath);
    if (!parsed) {
      skipped += 1;
      console.log(`[trains] skip (placeholder/empty): ${slug}`);
      continue;
    }
    const res = await insertPost(client, {
      sectionId,
      kind: "trains",
      slug,
      title: parsed.title || item.title,
      excerpt: parsed.excerpt,
      blocks: parsed.blocks,
    });
    if (res.status === "inserted") inserted += 1;
    else skipped += 1;
  }

  console.log(`[trains] inserted=${inserted}, skipped=${skipped}`);
}

async function seedFromJson(client, kind, topLabel, listPath, jsonPath) {
  const topSectionId = await ensureSection(client, {
    kind,
    name: topLabel,
    slug: kind,
    parentId: null,
    sortOrder: 10,
  });
  const meta = parseArticleListTs(listPath);
  const jsonData = JSON.parse(read(jsonPath));

  let inserted = 0;
  let skipped = 0;
  for (let i = 0; i < meta.length; i += 1) {
    const item = meta[i];
    const slug = item.path.split("/").pop();
    if (!slug) continue;
    const sectionId = await ensureSection(client, {
      kind,
      name: item.category,
      slug: slugify(item.category),
      parentId: topSectionId,
      sortOrder: i,
    });
    const bundle = jsonData[slug];
    if (!bundle) {
      skipped += 1;
      console.log(`[${kind}] skip (no json): ${slug}`);
      continue;
    }
    const parsed = parseJsonArticle(bundle);
    if (!parsed.blocks.length) {
      skipped += 1;
      console.log(`[${kind}] skip (empty blocks): ${slug}`);
      continue;
    }
    const res = await insertPost(client, {
      sectionId,
      kind,
      slug,
      title: parsed.title || item.title,
      excerpt: parsed.excerpt,
      blocks: parsed.blocks,
    });
    if (res.status === "inserted") inserted += 1;
    else skipped += 1;
  }
  console.log(`[${kind}] inserted=${inserted}, skipped=${skipped}`);
}

async function main() {
  const client = await pool.connect();
  try {
    console.log("=== Seed: reference CMS ===");
    await client.query("BEGIN");
    await seedTrains(client);
    await seedFromJson(
      client,
      "flights",
      "Самолеты",
      "src/data/flightsArticles.ts",
      "src/data/flights-content.json",
    );
    await seedFromJson(
      client,
      "buses",
      "Автобусы",
      "src/data/busesArticles.ts",
      "src/data/buses-content.json",
    );
    await client.query("COMMIT");
    console.log("Seed reference complete.");
  } catch (e) {
    await client.query("ROLLBACK");
    console.error("Seed reference failed:", e);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

main();
