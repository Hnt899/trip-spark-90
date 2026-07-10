import express from "express";
import { pool } from "./db.js";
import { adminMiddleware } from "./authMiddleware.js";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ALLOWED_BADGES = new Set(["own", "partner", "ad"]);
const ALLOWED_CHANNELS = new Set(["tudasuda", "partners", "special"]);
const ALLOWED_BLOCK_TYPES = new Set([
  "paragraph",
  "heading",
  "image",
  "carousel",
  "bulletList",
  "orderedList",
  "divider",
  "quote",
  "table",
  "ctaButton",
  "destinationCard",
  "routeByDays",
]);

function isValidImageUrl(url) {
  if (!url) return false;
  if (/^https?:\/\/.+/i.test(url)) return true;
  if (/^\/uploads\/[^\s]+/i.test(url)) return true;
  return false;
}

function sanitizeBlocks(raw) {
  if (!Array.isArray(raw)) return [];
  const out = [];
  for (const b of raw) {
    if (!b || typeof b !== "object") continue;
    const type = String(b.type || "");
    if (!ALLOWED_BLOCK_TYPES.has(type)) continue;
    if (type === "paragraph") {
      const block = { type, text: String(b.text ?? "").slice(0, 80000) };
      if (b.anchor) {
        block.anchor = true;
        if (b.anchorLabel) block.anchorLabel = String(b.anchorLabel).slice(0, 200);
      }
      out.push(block);
    } else if (type === "heading") {
      const level = [1, 2, 3].includes(Number(b.level)) ? Number(b.level) : 2;
      const block = { type, level, text: String(b.text ?? "").slice(0, 500) };
      if (b.anchor) {
        block.anchor = true;
        if (b.anchorLabel) block.anchorLabel = String(b.anchorLabel).slice(0, 200);
      }
      out.push(block);
    } else if (type === "image") {
      out.push({
        type,
        url: String(b.url ?? "").slice(0, 2000),
        alt: String(b.alt ?? "").slice(0, 500),
        caption: b.caption ? String(b.caption).slice(0, 2000) : undefined,
      });
    } else if (type === "carousel") {
      const slides = Array.isArray(b.slides) ? b.slides.slice(0, 15) : [];
      const modeRaw = String(b.mode || "manual");
      const mode =
        modeRaw === "auto" || modeRaw === "hybrid" ? modeRaw : "manual";
      const intervalSec = Math.min(
        30,
        Math.max(1, parseInt(String(b.intervalSec || "5"), 10) || 5),
      );
      const clean = [];
      for (const s of slides) {
        if (!s || typeof s !== "object") continue;
        const image = String(s.image ?? "")
          .replace(/\s+/g, "")
          .trim()
          .slice(0, 2000);
        if (!isValidImageUrl(image)) continue;
        let caption =
          s.caption != null ? String(s.caption).trim().slice(0, 2000) : "";
        if (!caption) {
          const parts = [
            s.route,
            s.subtitle,
            s.price,
            s.oldPrice,
            s.badge,
            s.discount,
          ].filter((x) => x != null && String(x).trim());
          caption = parts.join("\n").trim().slice(0, 2000);
        }
        const slide = { image };
        if (caption) slide.caption = caption;
        clean.push(slide);
      }
      if (clean.length > 0) {
        out.push({ type: "carousel", slides: clean, mode, intervalSec });
      }
    } else if (type === "bulletList" || type === "orderedList") {
      const items = Array.isArray(b.items)
        ? b.items.slice(0, 50).map((x) => String(x ?? "").slice(0, 8000))
        : [];
      if (items.length > 0) out.push({ type, items });
    } else if (type === "quote") {
      out.push({
        type,
        text: String(b.text ?? "").slice(0, 8000),
        attribution: b.attribution
          ? String(b.attribution).slice(0, 300)
          : undefined,
      });
    } else if (type === "divider") {
      out.push({ type: "divider" });
    } else if (type === "table") {
      const rows = Array.isArray(b.rows) ? b.rows.slice(0, 50) : [];
      const cleanRows = [];
      for (const row of rows) {
        if (!row || typeof row !== "object" || !Array.isArray(row.cells)) continue;
        const cells = row.cells.slice(0, 20).map((c) => ({
          text: String(c?.text ?? "").slice(0, 8000),
        }));
        cleanRows.push({ cells });
      }
      if (cleanRows.length > 0) {
        out.push({ type: "table", rows: cleanRows, hasHeader: !!b.hasHeader });
      }
    } else if (type === "ctaButton") {
      out.push({
        type: "ctaButton",
        text: String(b.text ?? "Подробнее").slice(0, 200),
        url: String(b.url ?? "").slice(0, 2000),
        variant: b.variant === "secondary" ? "secondary" : "primary",
      });
    } else if (type === "destinationCard") {
      out.push({
        type: "destinationCard",
        season: String(b.season ?? "").slice(0, 500),
        format: String(b.format ?? "").slice(0, 500),
        comfort: String(b.comfort ?? "").slice(0, 500),
        uniqueness: String(b.uniqueness ?? "").slice(0, 500),
      });
    } else if (type === "routeByDays") {
      const days = Array.isArray(b.days) ? b.days.slice(0, 30) : [];
      const cleanDays = [];
      for (const d of days) {
        if (!d || typeof d !== "object") continue;
        cleanDays.push({
          label: String(d.label ?? "").slice(0, 200),
          title: String(d.title ?? "").slice(0, 500),
          description: String(d.description ?? "").slice(0, 8000),
        });
      }
      if (cleanDays.length > 0) {
        out.push({
          type: "routeByDays",
          image: b.image ? String(b.image).slice(0, 2000) : "",
          days: cleanDays,
        });
      }
    }
  }
  return out;
}

/** Абзацы — блоки paragraph; <фото>, <карусель> — см. src/lib/blogBodyExpand.ts */
function paragraphsFromPlain(fragment) {
  return String(fragment)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((paragraph) => ({ type: "paragraph", text: paragraph }));
}

function parsePhotoTagInner(inner) {
  const raw = String(inner ?? "").trim();
  if (!raw) return { url: "" };
  const nl = raw.search(/\r?\n/);
  if (nl === -1) {
    return { url: raw.replace(/\s+/g, "").slice(0, 2000) };
  }
  const firstLine = raw.slice(0, nl).trim().replace(/\s+/g, "");
  const rest = raw.slice(nl + 1).trim();
  if (/^https?:\/\//i.test(firstLine)) {
    const caption = rest.slice(0, 2000);
    return {
      url: firstLine.slice(0, 2000),
      ...(caption ? { caption } : {}),
    };
  }
  const collapsed = raw.replace(/\s+/g, "");
  if (/^https?:\/\//i.test(collapsed)) {
    return { url: collapsed.slice(0, 2000) };
  }
  return { url: "" };
}

function parseCarouselLegacyJson(raw) {
  try {
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    const out = [];
    for (const item of data.slice(0, 15)) {
      if (!item || typeof item !== "object") continue;
      const image = String(item.image ?? "")
        .replace(/\s+/g, "")
        .trim()
        .slice(0, 2000);
      if (!isValidImageUrl(image)) continue;
      let caption =
        item.caption != null
          ? String(item.caption).trim().slice(0, 2000)
          : "";
      if (!caption) {
        const parts = [
          item.route,
          item.subtitle,
          item.price,
          item.oldPrice,
          item.badge,
          item.discount,
        ].filter((x) => x != null && String(x).trim());
        caption = parts.join("\n").trim().slice(0, 2000);
      }
      const slide = { image };
      if (caption) slide.caption = caption;
      out.push(slide);
    }
    return out;
  } catch {
    return [];
  }
}

function parseCarouselLineBased(raw) {
  const lines = String(raw)
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  const slides = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (/^https?:\/\//i.test(line)) {
      const image = line.replace(/\s+/g, "").slice(0, 2000);
      i++;
      const capLines = [];
      while (i < lines.length && !/^https?:\/\//i.test(lines[i])) {
        capLines.push(lines[i]);
        i++;
      }
      const caption = capLines.join("\n").trim().slice(0, 2000);
      const slide = { image };
      if (caption) slide.caption = caption;
      slides.push(slide);
    } else {
      i++;
    }
  }
  return slides.slice(0, 15);
}

function parseCarouselInner(raw) {
  const t = String(raw ?? "").trim();
  if (!t) return [];
  if (t.startsWith("[")) {
    const legacy = parseCarouselLegacyJson(t);
    if (legacy.length > 0) return legacy;
  }
  return parseCarouselLineBased(t);
}

function splitPhotosInText(fragment) {
  const t = String(fragment);
  if (!t.trim()) return [];
  const re =
    /<(?:[фФ]ото|photo)>\s*([\s\S]*?)\s*<\/\s*(?:[фФ]ото|photo)\s*>/gi;
  const blocks = [];
  let last = 0;
  let m;
  while ((m = re.exec(t)) !== null) {
    const before = t.slice(last, m.index);
    if (before.trim()) {
      blocks.push(...paragraphsFromPlain(before));
    }
    const { url, caption } = parsePhotoTagInner(String(m[1] ?? ""));
    if (url.length > 0 && /^https?:\/\/.+/i.test(url)) {
      blocks.push({
        type: "image",
        url,
        alt: "",
        caption: caption && String(caption).trim() ? String(caption).trim() : undefined,
      });
    } else {
      blocks.push({
        type: "paragraph",
        text: m[0].trim().slice(0, 80000),
      });
    }
    last = re.lastIndex;
  }
  const rest = t.slice(last);
  if (rest.trim()) {
    blocks.push(...paragraphsFromPlain(rest));
  }
  return blocks;
}

function bodyTextToBlocks(text) {
  const t = String(text ?? "").replace(/^\uFEFF/, "").trim();
  if (!t) return [];
  const carouselRe =
    /<(?:[кК]арусель|carousel)>\s*([\s\S]*?)\s*<\/\s*(?:[кК]арусель|carousel)\s*>/gi;
  const blocks = [];
  let last = 0;
  let m;
  while ((m = carouselRe.exec(t)) !== null) {
    const before = t.slice(last, m.index);
    if (before.trim()) {
      blocks.push(...splitPhotosInText(before));
    }
    const slides = parseCarouselInner(String(m[1] ?? "").trim());
    if (slides.length > 0) {
      blocks.push({ type: "carousel", slides });
    } else {
      blocks.push({
        type: "paragraph",
        text: m[0].trim().slice(0, 80000),
      });
    }
    last = carouselRe.lastIndex;
  }
  const rest = t.slice(last);
  if (rest.trim()) {
    blocks.push(...splitPhotosInText(rest));
  }
  return blocks;
}

function normalizeBadges(arr) {
  if (!Array.isArray(arr)) return ["own"];
  const u = [...new Set(arr.map((x) => String(x).toLowerCase()))].filter((x) =>
    ALLOWED_BADGES.has(x)
  );
  return u.length ? u : ["own"];
}

function normalizeTagIds(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.map((x) => String(x).trim().toLowerCase()).filter(Boolean);
}

function normalizeRelatedPostIds(arr) {
  if (!Array.isArray(arr)) return [];
  const uuids = arr
    .map((x) => String(x).trim())
    .filter((x) => /^[0-9a-f-]{36}$/i.test(x));
  return [...new Set(uuids)].slice(0, 5);
}

async function fetchRelatedPosts(relatedIds, excludeId) {
  const ids = normalizeRelatedPostIds(relatedIds).filter((id) => id !== excludeId);
  if (!ids.length) return [];
  const { rows } = await pool.query(
    `SELECT id, slug, title, excerpt, cover_image_url, published_at, reading_minutes,
            badges, channel, tag_ids, editors_pick, partner_carousel, sponsored_grid, views
     FROM blog_posts
     WHERE id = ANY($1::uuid[])
       AND status = 'published'
       AND published_at IS NOT NULL AND published_at <= NOW()
     ORDER BY array_position($1::uuid[], id)`,
    [ids],
  );
  return rows.map(rowToArticle);
}

function normalizeSlug(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function fallbackSlug(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function normalizeName(value) {
  return String(value || "").trim().slice(0, 120);
}

function normalizeUuidArray(arr) {
  if (!Array.isArray(arr)) return [];
  return [...new Set(arr.map((x) => String(x || "").trim()).filter(Boolean))];
}

const DEFAULT_BLOG_TAG_GROUPS = [
  {
    slug: "content-type",
    name: "По типу контента",
    sort_order: 10,
    tags: [
      { slug: "instructions", name: "Инструкции" },
      { slug: "lifehacks", name: "Лайфхаки" },
      { slug: "destinations", name: "Обзоры направлений" },
    ],
  },
  {
    slug: "travel-themes",
    name: "По темам путешествий",
    sort_order: 20,
    tags: [
      { slug: "flights", name: "Авиабилеты" },
      { slug: "trains", name: "Ж/д билеты" },
      { slug: "buses", name: "Автобусы" },
      { slug: "hotels", name: "Отели" },
      { slug: "visas", name: "Визы и документы" },
      { slug: "budget", name: "Бюджетные поездки" },
      { slug: "family", name: "Семейный отдых" },
      { slug: "solo", name: "Соло-тревел" },
      { slug: "eco", name: "Экотуризм" },
      { slug: "ski", name: "Горнолыжные курорты" },
    ],
  },
  {
    slug: "regions",
    name: "По регионам",
    sort_order: 30,
    tags: [
      { slug: "russia", name: "Россия" },
      { slug: "europe", name: "Европа" },
      { slug: "asia", name: "Азия" },
      { slug: "turkey", name: "Турция" },
      { slug: "cis", name: "СНГ" },
    ],
  },
  {
    slug: "service",
    name: "Новости и сервис",
    sort_order: 40,
    tags: [
      { slug: "service-news", name: "Новости сервиса TudaSuda" },
      { slug: "about-service", name: "О сервисе" },
      { slug: "for-partners", name: "Для партнёров" },
    ],
  },
];

let ensureBlogTagsReadyPromise = null;
async function ensureBlogTagTablesAndSeed() {
  if (ensureBlogTagsReadyPromise) return ensureBlogTagsReadyPromise;
  ensureBlogTagsReadyPromise = (async () => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(`
        CREATE TABLE IF NOT EXISTS blog_tag_groups (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          slug TEXT NOT NULL UNIQUE,
          name TEXT NOT NULL,
          sort_order INT NOT NULL DEFAULT 0,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);
      await client.query(`
        CREATE INDEX IF NOT EXISTS idx_blog_tag_groups_sort
          ON blog_tag_groups(sort_order, name)
      `);
      await client.query(`
        DROP TRIGGER IF EXISTS update_blog_tag_groups_updated_at ON blog_tag_groups
      `);
      await client.query(`
        CREATE TRIGGER update_blog_tag_groups_updated_at
          BEFORE UPDATE ON blog_tag_groups
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()
      `);

      await client.query(`
        CREATE TABLE IF NOT EXISTS blog_tags (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          slug TEXT NOT NULL UNIQUE,
          name TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);
      await client.query(`CREATE INDEX IF NOT EXISTS idx_blog_tags_name ON blog_tags(name)`);
      await client.query(`DROP TRIGGER IF EXISTS update_blog_tags_updated_at ON blog_tags`);
      await client.query(`
        CREATE TRIGGER update_blog_tags_updated_at
          BEFORE UPDATE ON blog_tags
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()
      `);

      await client.query(`
        CREATE TABLE IF NOT EXISTS blog_tag_group_links (
          tag_id UUID NOT NULL REFERENCES blog_tags(id) ON DELETE CASCADE,
          group_id UUID NOT NULL REFERENCES blog_tag_groups(id) ON DELETE CASCADE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          PRIMARY KEY (tag_id, group_id)
        )
      `);
      await client.query(`
        CREATE INDEX IF NOT EXISTS idx_blog_tag_group_links_group
          ON blog_tag_group_links(group_id, tag_id)
      `);

      for (const group of DEFAULT_BLOG_TAG_GROUPS) {
        const groupRow = (
          await client.query(
            `INSERT INTO blog_tag_groups (slug, name, sort_order)
             VALUES ($1, $2, $3)
             ON CONFLICT (slug) DO UPDATE
               SET name = EXCLUDED.name,
                   sort_order = EXCLUDED.sort_order
             RETURNING id`,
            [group.slug, group.name, group.sort_order],
          )
        ).rows[0];
        for (const tag of group.tags) {
          const tagRow = (
            await client.query(
              `INSERT INTO blog_tags (slug, name)
               VALUES ($1, $2)
               ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
               RETURNING id`,
              [tag.slug, tag.name],
            )
          ).rows[0];
          await client.query(
            `INSERT INTO blog_tag_group_links (tag_id, group_id)
             VALUES ($1::uuid, $2::uuid)
             ON CONFLICT DO NOTHING`,
            [tagRow.id, groupRow.id],
          );
        }
      }
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  })();
  return ensureBlogTagsReadyPromise;
}

async function fetchTagGroupsWithTags() {
  await ensureBlogTagTablesAndSeed();
  const [{ rows: groups }, { rows: tags }, { rows: links }] = await Promise.all([
    pool.query(
      `SELECT id, slug, name, sort_order, created_at, updated_at
       FROM blog_tag_groups
       ORDER BY sort_order ASC, name ASC`,
    ),
    pool.query(
      `SELECT id, slug, name, created_at, updated_at
       FROM blog_tags
       ORDER BY name ASC`,
    ),
    pool.query(`SELECT tag_id, group_id FROM blog_tag_group_links`),
  ]);

  const groupsMap = new Map(groups.map((g) => [g.id, { ...g, tags: [] }]));
  const tagsMap = new Map(tags.map((t) => [t.id, t]));

  for (const link of links) {
    const group = groupsMap.get(link.group_id);
    const tag = tagsMap.get(link.tag_id);
    if (group && tag) group.tags.push(tag);
  }

  return {
    groups: Array.from(groupsMap.values()).map((group) => ({
      ...group,
      tags: group.tags.sort((a, b) => a.name.localeCompare(b.name)),
    })),
    tags,
  };
}

function rowToArticle(row) {
  const pub = row.published_at
    ? new Date(row.published_at).toISOString()
    : new Date().toISOString();
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || "",
    coverImage: row.cover_image_url || "",
    publishedAt: pub,
    readingMinutes: row.reading_minutes ?? 5,
    badges: row.badges?.length ? row.badges : ["own"],
    channel: row.channel || "tudasuda",
    tagIds: Array.isArray(row.tag_ids) ? row.tag_ids : [],
    editorsPick: !!row.editors_pick,
    partnerCarousel: !!row.partner_carousel,
    sponsoredGrid: !!row.sponsored_grid,
    views: row.views ?? 0,
  };
}

async function fetchPublicTagGroups() {
  const { groups } = await fetchTagGroupsWithTags();
  return groups.map((group) => ({
    id: group.slug,
    title: group.name,
    tags: group.tags.map((tag) => ({
      id: tag.slug,
      label: tag.name,
    })),
  }));
}

function parseCreateBody(body) {
  const slug = String(body.slug || "")
    .trim()
    .toLowerCase();
  const title = String(body.title || "").trim();
  if (!slug || !SLUG_RE.test(slug)) {
    return { error: "Invalid slug (latin, digits, hyphens)" };
  }
  if (!title) return { error: "title required" };

  let blocks = [];
  if (Array.isArray(body.content_blocks) && body.content_blocks.length > 0) {
    blocks = sanitizeBlocks(body.content_blocks);
  } else if (body.body_text != null) {
    blocks = sanitizeBlocks(bodyTextToBlocks(body.body_text));
  }

  const status =
    body.status === "published" || body.status === "draft"
      ? body.status
      : "draft";
  let publishedAt = body.published_at
    ? new Date(body.published_at)
    : null;
  if (status === "published" && (!publishedAt || Number.isNaN(publishedAt.getTime()))) {
    publishedAt = new Date();
  }
  if (status === "draft") {
    publishedAt = publishedAt && !Number.isNaN(publishedAt.getTime()) ? publishedAt : null;
  }

  const channel = ALLOWED_CHANNELS.has(String(body.channel))
    ? String(body.channel)
    : "tudasuda";

  return {
    data: {
      slug,
      title,
      excerpt: String(body.excerpt ?? "").slice(0, 2000),
      cover_image_url: body.cover_image_url
        ? String(body.cover_image_url).slice(0, 2000)
        : null,
      content_blocks: blocks,
      status,
      published_at: publishedAt,
      reading_minutes: Math.min(
        240,
        Math.max(1, parseInt(String(body.reading_minutes || "5"), 10) || 5)
      ),
      badges: normalizeBadges(body.badges),
      channel,
      tag_ids: normalizeTagIds(body.tag_ids),
      editors_pick: !!body.editors_pick,
      partner_carousel: !!body.partner_carousel,
      sponsored_grid: !!body.sponsored_grid,
      related_post_ids: normalizeRelatedPostIds(body.related_post_ids),
    },
  };
}

/**
 * @param {import('express').Express} app
 */
export function registerBlogPublicRoutes(app) {
  app.get("/api/blog/tag-groups", async (_req, res) => {
    try {
      const groups = await fetchPublicTagGroups();
      res.json(groups);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "Failed to list tag groups" });
    }
  });

  app.get("/api/blog/posts", async (req, res) => {
    try {
      const { rows } = await pool.query(
        `SELECT id, slug, title, excerpt, cover_image_url, published_at, reading_minutes,
            badges, channel, tag_ids, editors_pick, partner_carousel, sponsored_grid, views
         FROM blog_posts
         WHERE status = 'published' AND published_at IS NOT NULL AND published_at <= NOW()
         ORDER BY published_at DESC`
      );
      res.json(rows.map(rowToArticle));
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "Failed to list posts" });
    }
  });

  app.get("/api/blog/posts/by-slug/:slug", async (req, res) => {
    const slug = String(req.params.slug || "").toLowerCase();
    if (!slug) return res.status(400).json({ error: "slug required" });
    try {
      const { rows } = await pool.query(
        `SELECT * FROM blog_posts
         WHERE slug = $1 AND status = 'published'
           AND published_at IS NOT NULL AND published_at <= NOW()`,
        [slug]
      );
      const row = rows[0];
      if (!row) return res.status(404).json({ error: "Not found" });

      pool
        .query(`UPDATE blog_posts SET views = views + 1 WHERE id = $1`, [row.id])
        .catch(() => {});

      const relatedPosts = await fetchRelatedPosts(row.related_post_ids, row.id);

      res.json({
        ...rowToArticle({ ...row, views: (row.views ?? 0) + 1 }),
        content_blocks: Array.isArray(row.content_blocks)
          ? row.content_blocks
          : [],
        relatedPosts,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "Failed to load post" });
    }
  });
}

/**
 * @param {import('express').Express} app
 */
export function registerAdminBlogRoutes(app) {
  app.get("/api/admin/blog/tag-groups", adminMiddleware, async (req, res) => {
    try {
      const withTags = String(req.query.withTags || "") === "1";
      const payload = await fetchTagGroupsWithTags();
      if (withTags) {
        return res.json(payload);
      }
      return res.json({ groups: payload.groups.map(({ tags, ...group }) => group) });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message || "Tag groups list failed" });
    }
  });

  app.post(
    "/api/admin/blog/tag-groups",
    adminMiddleware,
    express.json({ limit: "128kb" }),
    async (req, res) => {
      await ensureBlogTagTablesAndSeed();
      const name = normalizeName(req.body?.name);
      const slugRaw = normalizeSlug(req.body?.slug || name);
      const slug = slugRaw || fallbackSlug("tag-group");
      const sortOrder = parseInt(String(req.body?.sort_order ?? "0"), 10) || 0;
      if (!name) return res.status(400).json({ error: "name required" });
      if (!slug || !SLUG_RE.test(slug)) return res.status(400).json({ error: "Invalid slug" });
      try {
        const { rows } = await pool.query(
          `INSERT INTO blog_tag_groups (name, slug, sort_order)
           VALUES ($1, $2, $3)
           RETURNING *`,
          [name, slug, sortOrder],
        );
        return res.status(201).json(rows[0]);
      } catch (e) {
        if (e.code === "23505") return res.status(400).json({ error: "Slug already exists" });
        console.error(e);
        return res.status(500).json({ error: e.message || "Tag group create failed" });
      }
    },
  );

  app.patch(
    "/api/admin/blog/tag-groups/:id",
    adminMiddleware,
    express.json({ limit: "128kb" }),
    async (req, res) => {
      await ensureBlogTagTablesAndSeed();
      try {
        const current = (
          await pool.query(`SELECT * FROM blog_tag_groups WHERE id = $1::uuid`, [req.params.id])
        ).rows[0];
        if (!current) return res.status(404).json({ error: "Not found" });

        const name = req.body?.name != null ? normalizeName(req.body.name) : current.name;
        const slug =
          req.body?.slug != null
            ? normalizeSlug(req.body.slug) || current.slug
            : current.slug;
        const sortOrder =
          req.body?.sort_order != null
            ? parseInt(String(req.body.sort_order), 10) || 0
            : current.sort_order;
        if (!name) return res.status(400).json({ error: "name required" });
        if (!slug || !SLUG_RE.test(slug)) return res.status(400).json({ error: "Invalid slug" });

        const { rows } = await pool.query(
          `UPDATE blog_tag_groups
           SET name = $2, slug = $3, sort_order = $4, updated_at = NOW()
           WHERE id = $1::uuid
           RETURNING *`,
          [req.params.id, name, slug, sortOrder],
        );
        return res.json(rows[0]);
      } catch (e) {
        if (e.code === "23505") return res.status(400).json({ error: "Slug already exists" });
        console.error(e);
        return res.status(500).json({ error: e.message || "Tag group update failed" });
      }
    },
  );

  app.delete("/api/admin/blog/tag-groups/:id", adminMiddleware, async (req, res) => {
    await ensureBlogTagTablesAndSeed();
    try {
      const deleted = await pool.query(
        `DELETE FROM blog_tag_groups WHERE id = $1::uuid`,
        [req.params.id],
      );
      if (!deleted.rowCount) return res.status(404).json({ error: "Not found" });
      return res.json({ ok: true });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message || "Tag group delete failed" });
    }
  });

  app.post(
    "/api/admin/blog/tags",
    adminMiddleware,
    express.json({ limit: "128kb" }),
    async (req, res) => {
      await ensureBlogTagTablesAndSeed();
      const name = normalizeName(req.body?.name);
      const slugRaw = normalizeSlug(req.body?.slug || name);
      const slug = slugRaw || fallbackSlug("tag");
      const groupIds = normalizeUuidArray(req.body?.group_ids);
      if (!name) return res.status(400).json({ error: "name required" });
      if (!slug || !SLUG_RE.test(slug)) return res.status(400).json({ error: "Invalid slug" });
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        const { rows } = await client.query(
          `INSERT INTO blog_tags (name, slug)
           VALUES ($1, $2)
           RETURNING *`,
          [name, slug],
        );
        const tag = rows[0];

        if (groupIds.length) {
          const existingGroups = (
            await client.query(
              `SELECT id FROM blog_tag_groups WHERE id = ANY($1::uuid[])`,
              [groupIds],
            )
          ).rows.map((row) => row.id);
          for (const groupId of existingGroups) {
            await client.query(
              `INSERT INTO blog_tag_group_links (tag_id, group_id)
               VALUES ($1::uuid, $2::uuid)
               ON CONFLICT DO NOTHING`,
              [tag.id, groupId],
            );
          }
        }
        await client.query("COMMIT");
        return res.status(201).json(tag);
      } catch (e) {
        await client.query("ROLLBACK");
        if (e.code === "23505") return res.status(400).json({ error: "Slug already exists" });
        console.error(e);
        return res.status(500).json({ error: e.message || "Tag create failed" });
      } finally {
        client.release();
      }
    },
  );

  app.patch(
    "/api/admin/blog/tags/:id",
    adminMiddleware,
    express.json({ limit: "128kb" }),
    async (req, res) => {
      await ensureBlogTagTablesAndSeed();
      const client = await pool.connect();
      try {
        const current = (
          await client.query(`SELECT * FROM blog_tags WHERE id = $1::uuid`, [req.params.id])
        ).rows[0];
        if (!current) return res.status(404).json({ error: "Not found" });

        const name = req.body?.name != null ? normalizeName(req.body.name) : current.name;
        const slug =
          req.body?.slug != null
            ? normalizeSlug(req.body.slug) || current.slug
            : current.slug;
        const groupIds =
          req.body?.group_ids != null ? normalizeUuidArray(req.body.group_ids) : null;
        if (!name) return res.status(400).json({ error: "name required" });
        if (!slug || !SLUG_RE.test(slug)) return res.status(400).json({ error: "Invalid slug" });

        await client.query("BEGIN");
        const { rows } = await client.query(
          `UPDATE blog_tags
           SET name = $2, slug = $3, updated_at = NOW()
           WHERE id = $1::uuid
           RETURNING *`,
          [req.params.id, name, slug],
        );

        if (Array.isArray(groupIds)) {
          await client.query(`DELETE FROM blog_tag_group_links WHERE tag_id = $1::uuid`, [
            req.params.id,
          ]);
          if (groupIds.length) {
            const existingGroups = (
              await client.query(
                `SELECT id FROM blog_tag_groups WHERE id = ANY($1::uuid[])`,
                [groupIds],
              )
            ).rows.map((row) => row.id);
            for (const groupId of existingGroups) {
              await client.query(
                `INSERT INTO blog_tag_group_links (tag_id, group_id)
                 VALUES ($1::uuid, $2::uuid)
                 ON CONFLICT DO NOTHING`,
                [req.params.id, groupId],
              );
            }
          }
        }
        await client.query("COMMIT");
        return res.json(rows[0]);
      } catch (e) {
        await client.query("ROLLBACK");
        if (e.code === "23505") return res.status(400).json({ error: "Slug already exists" });
        console.error(e);
        return res.status(500).json({ error: e.message || "Tag update failed" });
      } finally {
        client.release();
      }
    },
  );

  app.delete("/api/admin/blog/tags/:id", adminMiddleware, async (req, res) => {
    await ensureBlogTagTablesAndSeed();
    try {
      const deleted = await pool.query(`DELETE FROM blog_tags WHERE id = $1::uuid`, [
        req.params.id,
      ]);
      if (!deleted.rowCount) return res.status(404).json({ error: "Not found" });
      return res.json({ ok: true });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message || "Tag delete failed" });
    }
  });

  app.get("/api/admin/blog/posts", adminMiddleware, async (req, res) => {
    try {
      const { rows } = await pool.query(
        `SELECT id, slug, title, excerpt, cover_image_url, status, published_at, updated_at, channel, editors_pick
         FROM blog_posts
         ORDER BY updated_at DESC`
      );
      res.json(rows);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "List failed" });
    }
  });

  app.get("/api/admin/blog/posts/id/:id", adminMiddleware, async (req, res) => {
    try {
      const { rows } = await pool.query(`SELECT * FROM blog_posts WHERE id = $1::uuid`, [
        req.params.id,
      ]);
      if (!rows.length) return res.status(404).json({ error: "Not found" });
      const row = rows[0];
      res.json({
        ...row,
        content_blocks: Array.isArray(row.content_blocks)
          ? row.content_blocks
          : [],
        body_text: blocksToPlainText(row.content_blocks),
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "Load failed" });
    }
  });

  app.post("/api/admin/blog/posts", adminMiddleware, express.json({ limit: "512kb" }), async (req, res) => {
    const parsed = parseCreateBody(req.body || {});
    if (parsed.error) return res.status(400).json({ error: parsed.error });
    const d = parsed.data;
    try {
      const { rows } = await pool.query(
        `INSERT INTO blog_posts (
          slug, title, excerpt, cover_image_url, content_blocks, status, published_at,
          reading_minutes, badges, channel, tag_ids, editors_pick, partner_carousel, sponsored_grid, related_post_ids, author_id
        ) VALUES ($1,$2,$3,$4,$5::jsonb,$6,$7,$8,$9::text[],$10,$11::text[],$12,$13,$14,$15::uuid[],$16)
        RETURNING *`,
        [
          d.slug,
          d.title,
          d.excerpt,
          d.cover_image_url,
          JSON.stringify(d.content_blocks),
          d.status,
          d.published_at,
          d.reading_minutes,
          d.badges,
          d.channel,
          d.tag_ids,
          d.editors_pick,
          d.partner_carousel,
          d.sponsored_grid,
          d.related_post_ids,
          req.userId,
        ]
      );
      res.status(201).json(rows[0]);
    } catch (e) {
      if (e.code === "23505")
        return res.status(400).json({ error: "Slug already exists" });
      console.error(e);
      res.status(500).json({ error: e.message || "Create failed" });
    }
  });

  app.patch(
    "/api/admin/blog/posts/id/:id",
    adminMiddleware,
    express.json({ limit: "512kb" }),
    async (req, res) => {
      const b = req.body || {};
      try {
        const cur = (
          await pool.query(`SELECT * FROM blog_posts WHERE id = $1::uuid`, [
            req.params.id,
          ])
        ).rows[0];
        if (!cur) return res.status(404).json({ error: "Not found" });

        const slug = (b.slug != null ? String(b.slug) : cur.slug)
          .trim()
          .toLowerCase();
        if (!SLUG_RE.test(slug))
          return res.status(400).json({ error: "Invalid slug" });
        const title = b.title !== undefined ? String(b.title).trim() : cur.title;
        if (!title) return res.status(400).json({ error: "title required" });

        let blocks;
        if (Array.isArray(b.content_blocks) && b.content_blocks.length > 0) {
          blocks = sanitizeBlocks(b.content_blocks);
        } else if (b.body_text !== undefined) {
          blocks = sanitizeBlocks(bodyTextToBlocks(b.body_text));
        } else {
          blocks = sanitizeBlocks(cur.content_blocks || []);
        }

        const status =
          b.status === "published" || b.status === "draft"
            ? b.status
            : cur.status;
        let publishedAt =
          b.published_at !== undefined
            ? b.published_at
              ? new Date(b.published_at)
              : null
            : cur.published_at
              ? new Date(cur.published_at)
              : null;
        if (status === "published") {
          if (!publishedAt || Number.isNaN(publishedAt.getTime())) {
            publishedAt = new Date();
          }
        }
        if (status === "draft" && b.published_at === undefined) {
          publishedAt = cur.published_at ? new Date(cur.published_at) : null;
        }

        const channel = ALLOWED_CHANNELS.has(String(b.channel))
          ? String(b.channel)
          : cur.channel;
        const readingMinutes = Math.min(
          240,
          Math.max(
            1,
            b.reading_minutes !== undefined
              ? parseInt(String(b.reading_minutes), 10) || cur.reading_minutes
              : cur.reading_minutes
          )
        );

        const { rows } = await pool.query(
          `UPDATE blog_posts SET
            slug = $2, title = $3, excerpt = $4, cover_image_url = $5,
            content_blocks = $6::jsonb, status = $7, published_at = $8,
            reading_minutes = $9, badges = $10::text[], channel = $11,
            tag_ids = $12::text[], editors_pick = $13, partner_carousel = $14, sponsored_grid = $15,
            related_post_ids = $16::uuid[],
            updated_at = NOW()
          WHERE id = $1::uuid
          RETURNING *`,
          [
            req.params.id,
            slug,
            title,
            b.excerpt !== undefined
              ? String(b.excerpt).slice(0, 2000)
              : cur.excerpt,
            b.cover_image_url !== undefined
              ? b.cover_image_url
                ? String(b.cover_image_url).slice(0, 2000)
                : null
              : cur.cover_image_url,
            JSON.stringify(blocks),
            status,
            publishedAt,
            readingMinutes,
            normalizeBadges(b.badges !== undefined ? b.badges : cur.badges),
            channel,
            normalizeTagIds(b.tag_ids !== undefined ? b.tag_ids : cur.tag_ids),
            b.editors_pick !== undefined ? !!b.editors_pick : cur.editors_pick,
            b.partner_carousel !== undefined
              ? !!b.partner_carousel
              : cur.partner_carousel,
            b.sponsored_grid !== undefined
              ? !!b.sponsored_grid
              : cur.sponsored_grid,
            b.related_post_ids !== undefined
              ? normalizeRelatedPostIds(b.related_post_ids).filter((id) => id !== req.params.id)
              : normalizeRelatedPostIds(cur.related_post_ids || []).filter((id) => id !== req.params.id),
          ]
        );
        res.json(rows[0]);
      } catch (e) {
        if (e.code === "23505")
          return res.status(400).json({ error: "Slug already exists" });
        console.error(e);
        res.status(500).json({ error: e.message || "Update failed" });
      }
    }
  );

  app.delete("/api/admin/blog/posts/id/:id", adminMiddleware, async (req, res) => {
    try {
      const r = await pool.query(`DELETE FROM blog_posts WHERE id = $1::uuid`, [
        req.params.id,
      ]);
      if (r.rowCount === 0) return res.status(404).json({ error: "Not found" });
      res.json({ ok: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "Delete failed" });
    }
  });
}

function blocksToPlainText(blocks) {
  if (!Array.isArray(blocks)) return "";
  const parts = [];
  for (const b of blocks) {
    if (!b || typeof b !== "object") continue;
    if (b.type === "paragraph" || b.type === "heading" || b.type === "quote") {
      if (b.text) parts.push(String(b.text));
    } else if (b.type === "image" && String(b.url || "").trim()) {
      const u = String(b.url).trim();
      const cap = b.caption ? String(b.caption).trim() : "";
      parts.push(
        cap
          ? `<фото>\n${u}\n${cap}\n</фото>`
          : `<фото>\n${u}\n</фото>`,
      );
    } else if (b.type === "carousel" && Array.isArray(b.slides) && b.slides.length) {
      const lines = ["<карусель>"];
      for (const s of b.slides) {
        lines.push(String(s.image || "").trim());
        const cap =
          (s.caption && String(s.caption).trim()) ||
          [
            s.route,
            s.subtitle,
            s.price,
            s.oldPrice,
            s.badge,
            s.discount,
          ]
            .filter((x) => x != null && String(x).trim())
            .join("\n")
            .trim();
        if (cap) lines.push(cap);
      }
      lines.push("</карусель>");
      parts.push(lines.join("\n"));
    }
  }
  return parts.join("\n\n");
}
