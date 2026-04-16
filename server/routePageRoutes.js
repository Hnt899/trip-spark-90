import express from "express";
import { pool } from "./db.js";
import { adminMiddleware } from "./authMiddleware.js";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

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
        const image = String(s.image ?? "").replace(/\s+/g, "").trim().slice(0, 2000);
        if (!isValidImageUrl(image)) continue;
        const caption = s.caption != null ? String(s.caption).trim().slice(0, 2000) : "";
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
        attribution: b.attribution ? String(b.attribution).slice(0, 300) : undefined,
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

function parseBody(body) {
  const slug = String(body.slug || "").trim().toLowerCase();
  const name = String(body.name || "").trim();
  if (!slug || !SLUG_RE.test(slug)) {
    return { error: "Invalid slug (latin, digits, hyphens)" };
  }
  if (!name) return { error: "name required" };

  const blocks = Array.isArray(body.content_blocks)
    ? sanitizeBlocks(body.content_blocks)
    : [];

  const status =
    body.status === "published" || body.status === "draft"
      ? body.status
      : "draft";
  let publishedAt = body.published_at ? new Date(body.published_at) : null;
  if (status === "published" && (!publishedAt || Number.isNaN(publishedAt.getTime()))) {
    publishedAt = new Date();
  }
  if (status === "draft") {
    publishedAt = publishedAt && !Number.isNaN(publishedAt.getTime()) ? publishedAt : null;
  }

  return {
    data: {
      slug,
      name,
      legacy_id: body.legacy_id ? String(body.legacy_id).trim() : null,
      region: String(body.region ?? "").slice(0, 200),
      rating: Math.min(10, Math.max(0, parseFloat(String(body.rating || "0")) || 0)),
      cover_image_url: body.cover_image_url ? String(body.cover_image_url).slice(0, 2000) : null,
      excerpt: String(body.excerpt ?? "").slice(0, 2000),
      content_blocks: blocks,
      status,
      published_at: publishedAt,
    },
  };
}

/**
 * Public routes for route pages
 * @param {import('express').Express} app
 */
export function registerRoutePublicRoutes(app) {
  app.get("/api/routes", async (_req, res) => {
    try {
      const { rows } = await pool.query(
        `SELECT id, legacy_id, slug, name, region, rating, cover_image_url, excerpt, views
         FROM route_pages
         WHERE status = 'published'
         ORDER BY rating DESC, name ASC`
      );
      res.json(rows);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "Failed to list routes" });
    }
  });

  app.get("/api/routes/by-id/:id", async (req, res) => {
    const id = String(req.params.id || "");
    if (!id) return res.status(400).json({ error: "id required" });
    try {
      const { rows } = await pool.query(
        `SELECT * FROM route_pages
         WHERE (id::text = $1 OR legacy_id = $1) AND status = 'published'`,
        [id]
      );
      const row = rows[0];
      if (!row) return res.status(404).json({ error: "Not found" });

      pool
        .query(`UPDATE route_pages SET views = views + 1 WHERE id = $1`, [row.id])
        .catch(() => {});

      res.json({
        ...row,
        views: (row.views ?? 0) + 1,
        content_blocks: Array.isArray(row.content_blocks) ? row.content_blocks : [],
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "Failed to load route" });
    }
  });
}

/**
 * Admin CRUD routes
 * @param {import('express').Express} app
 */
export function registerAdminRouteRoutes(app) {
  app.get("/api/admin/routes", adminMiddleware, async (_req, res) => {
    try {
      const { rows } = await pool.query(
        `SELECT id, legacy_id, slug, name, region, rating, status, updated_at
         FROM route_pages
         ORDER BY updated_at DESC`
      );
      res.json(rows);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "List failed" });
    }
  });

  app.get("/api/admin/routes/id/:id", adminMiddleware, async (req, res) => {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM route_pages WHERE id = $1::uuid`,
        [req.params.id]
      );
      if (!rows.length) return res.status(404).json({ error: "Not found" });
      const row = rows[0];
      res.json({
        ...row,
        content_blocks: Array.isArray(row.content_blocks) ? row.content_blocks : [],
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "Load failed" });
    }
  });

  app.post(
    "/api/admin/routes",
    adminMiddleware,
    express.json({ limit: "512kb" }),
    async (req, res) => {
      const parsed = parseBody(req.body || {});
      if (parsed.error) return res.status(400).json({ error: parsed.error });
      const d = parsed.data;
      try {
        const { rows } = await pool.query(
          `INSERT INTO route_pages (
            slug, name, legacy_id, region, rating, cover_image_url, excerpt,
            content_blocks, status, published_at, author_id
          ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9,$10,$11)
          RETURNING *`,
          [
            d.slug, d.name, d.legacy_id, d.region, d.rating,
            d.cover_image_url, d.excerpt,
            JSON.stringify(d.content_blocks), d.status, d.published_at,
            req.userId,
          ]
        );
        res.status(201).json(rows[0]);
      } catch (e) {
        if (e.code === "23505")
          return res.status(400).json({ error: "Slug or legacy_id already exists" });
        console.error(e);
        res.status(500).json({ error: e.message || "Create failed" });
      }
    }
  );

  app.patch(
    "/api/admin/routes/id/:id",
    adminMiddleware,
    express.json({ limit: "512kb" }),
    async (req, res) => {
      const b = req.body || {};
      try {
        const cur = (
          await pool.query(`SELECT * FROM route_pages WHERE id = $1::uuid`, [req.params.id])
        ).rows[0];
        if (!cur) return res.status(404).json({ error: "Not found" });

        const slug = (b.slug != null ? String(b.slug) : cur.slug).trim().toLowerCase();
        if (!SLUG_RE.test(slug))
          return res.status(400).json({ error: "Invalid slug" });
        const name = b.name !== undefined ? String(b.name).trim() : cur.name;
        if (!name) return res.status(400).json({ error: "name required" });

        let blocks;
        if (Array.isArray(b.content_blocks)) {
          blocks = sanitizeBlocks(b.content_blocks);
        } else {
          blocks = sanitizeBlocks(cur.content_blocks || []);
        }

        const status =
          b.status === "published" || b.status === "draft" ? b.status : cur.status;
        let publishedAt =
          b.published_at !== undefined
            ? b.published_at ? new Date(b.published_at) : null
            : cur.published_at ? new Date(cur.published_at) : null;
        if (status === "published" && (!publishedAt || Number.isNaN(publishedAt.getTime()))) {
          publishedAt = new Date();
        }

        const { rows } = await pool.query(
          `UPDATE route_pages SET
            slug = $2, name = $3, legacy_id = $4, region = $5, rating = $6,
            cover_image_url = $7, excerpt = $8, content_blocks = $9::jsonb,
            status = $10, published_at = $11, updated_at = NOW()
          WHERE id = $1::uuid
          RETURNING *`,
          [
            req.params.id,
            slug,
            name,
            b.legacy_id !== undefined ? (b.legacy_id ? String(b.legacy_id).trim() : null) : cur.legacy_id,
            b.region !== undefined ? String(b.region).slice(0, 200) : cur.region,
            b.rating !== undefined ? Math.min(10, Math.max(0, parseFloat(String(b.rating)) || 0)) : cur.rating,
            b.cover_image_url !== undefined ? (b.cover_image_url ? String(b.cover_image_url).slice(0, 2000) : null) : cur.cover_image_url,
            b.excerpt !== undefined ? String(b.excerpt).slice(0, 2000) : cur.excerpt,
            JSON.stringify(blocks),
            status,
            publishedAt,
          ]
        );
        res.json(rows[0]);
      } catch (e) {
        if (e.code === "23505")
          return res.status(400).json({ error: "Slug or legacy_id already exists" });
        console.error(e);
        res.status(500).json({ error: e.message || "Update failed" });
      }
    }
  );

  app.delete("/api/admin/routes/id/:id", adminMiddleware, async (req, res) => {
    try {
      const r = await pool.query(`DELETE FROM route_pages WHERE id = $1::uuid`, [req.params.id]);
      if (r.rowCount === 0) return res.status(404).json({ error: "Not found" });
      res.json({ ok: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "Delete failed" });
    }
  });
}
