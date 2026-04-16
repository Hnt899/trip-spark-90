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
      out.push({ type, text: String(b.text ?? "").slice(0, 80000) });
    } else if (type === "heading") {
      const level = [1, 2, 3].includes(Number(b.level)) ? Number(b.level) : 2;
      out.push({ type, level, text: String(b.text ?? "").slice(0, 500) });
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
    },
  };
}

/**
 * @param {import('express').Express} app
 */
export function registerBlogPublicRoutes(app) {
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

      res.json({
        ...rowToArticle({ ...row, views: (row.views ?? 0) + 1 }),
        content_blocks: Array.isArray(row.content_blocks)
          ? row.content_blocks
          : [],
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
  app.get("/api/admin/blog/posts", adminMiddleware, async (req, res) => {
    try {
      const { rows } = await pool.query(
        `SELECT id, slug, title, excerpt, status, published_at, updated_at, channel, editors_pick
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
          reading_minutes, badges, channel, tag_ids, editors_pick, partner_carousel, sponsored_grid, author_id
        ) VALUES ($1,$2,$3,$4,$5::jsonb,$6,$7,$8,$9::text[],$10,$11::text[],$12,$13,$14,$15)
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
