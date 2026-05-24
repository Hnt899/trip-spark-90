import express from "express";
import { pool } from "./db.js";
import { adminMiddleware } from "./authMiddleware.js";

const KINDS = new Set(["trains", "flights", "buses"]);
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

function normalizeKind(v) {
  const kind = String(v || "").trim().toLowerCase();
  return KINDS.has(kind) ? kind : null;
}

function normalizeSlug(v) {
  return String(v || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function ensureKind(kind, res) {
  if (!kind) {
    res.status(400).json({ error: "Invalid kind. Expected trains/flights/buses" });
    return false;
  }
  return true;
}

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
      const mode = modeRaw === "auto" || modeRaw === "hybrid" ? modeRaw : "manual";
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

async function loadSectionById(sectionId) {
  if (!sectionId) return null;
  const { rows } = await pool.query(
    `SELECT id, kind, parent_id, slug, name, sort_order
     FROM reference_sections
     WHERE id = $1::uuid`,
    [sectionId],
  );
  return rows[0] || null;
}

/**
 * @param {import('express').Express} app
 */
export function registerReferencePublicRoutes(app) {
  app.get("/api/reference/sections", async (req, res) => {
    const kind = normalizeKind(req.query.kind);
    if (!ensureKind(kind, res)) return;
    try {
      const { rows } = await pool.query(
        `SELECT s.id, s.parent_id, s.kind, s.slug, s.name, s.sort_order,
                COUNT(p.id)::int AS published_count
         FROM reference_sections s
         LEFT JOIN reference_posts p
           ON p.section_id = s.id
          AND p.status = 'published'
          AND p.published_at IS NOT NULL
          AND p.published_at <= NOW()
         WHERE s.kind = $1
         GROUP BY s.id
         ORDER BY s.parent_id NULLS FIRST, s.sort_order ASC, s.name ASC`,
        [kind],
      );
      res.json(rows);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "Failed to load sections" });
    }
  });

  app.get("/api/reference/posts", async (req, res) => {
    const kind = normalizeKind(req.query.kind);
    if (!ensureKind(kind, res)) return;
    try {
      const { rows } = await pool.query(
        `SELECT p.id, p.kind, p.slug, p.title, p.excerpt, p.section_id, p.published_at,
                s.name AS section_name, s.slug AS section_slug, s.parent_id AS section_parent_id
         FROM reference_posts p
         JOIN reference_sections s ON s.id = p.section_id
         WHERE p.kind = $1
           AND p.status = 'published'
           AND p.published_at IS NOT NULL
           AND p.published_at <= NOW()
         ORDER BY s.sort_order ASC, s.name ASC, p.title ASC`,
        [kind],
      );
      res.json(rows);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "Failed to load posts" });
    }
  });

  app.get("/api/reference/posts/by-kind/:kind/:slug", async (req, res) => {
    const kind = normalizeKind(req.params.kind);
    if (!ensureKind(kind, res)) return;
    const slug = normalizeSlug(req.params.slug);
    if (!slug) return res.status(400).json({ error: "slug required" });
    try {
      const { rows } = await pool.query(
        `SELECT p.*, s.name AS section_name, s.slug AS section_slug, s.parent_id AS section_parent_id
         FROM reference_posts p
         JOIN reference_sections s ON s.id = p.section_id
         WHERE p.kind = $1
           AND p.slug = $2
           AND p.status = 'published'
           AND p.published_at IS NOT NULL
           AND p.published_at <= NOW()
         LIMIT 1`,
        [kind, slug],
      );
      const row = rows[0];
      if (!row) return res.status(404).json({ error: "Not found" });
      pool
        .query(`UPDATE reference_posts SET views = views + 1 WHERE id = $1::uuid`, [row.id])
        .catch(() => {});
      res.json({
        ...row,
        views: (row.views ?? 0) + 1,
        content_blocks: Array.isArray(row.content_blocks) ? row.content_blocks : [],
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
export function registerAdminReferenceRoutes(app) {
  app.get("/api/admin/reference/sections", adminMiddleware, async (req, res) => {
    const kind = normalizeKind(req.query.kind);
    if (req.query.kind && !kind) return res.status(400).json({ error: "Invalid kind" });
    try {
      const where = kind ? "WHERE s.kind = $1" : "";
      const params = kind ? [kind] : [];
      const { rows } = await pool.query(
        `SELECT s.id, s.parent_id, s.kind, s.slug, s.name, s.sort_order, s.created_at, s.updated_at,
                COUNT(p.id)::int AS total_posts
         FROM reference_sections s
         LEFT JOIN reference_posts p ON p.section_id = s.id
         ${where}
         GROUP BY s.id
         ORDER BY s.kind ASC, s.parent_id NULLS FIRST, s.sort_order ASC, s.name ASC`,
        params,
      );
      res.json(rows);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "List sections failed" });
    }
  });

  app.post(
    "/api/admin/reference/sections",
    adminMiddleware,
    express.json({ limit: "256kb" }),
    async (req, res) => {
      const kind = normalizeKind(req.body?.kind);
      if (!ensureKind(kind, res)) return;
      const name = String(req.body?.name || "").trim();
      if (!name) return res.status(400).json({ error: "name required" });
      const slug = normalizeSlug(req.body?.slug || name);
      if (!slug || !SLUG_RE.test(slug)) return res.status(400).json({ error: "Invalid slug" });
      let parentId = req.body?.parent_id ? String(req.body.parent_id) : null;
      try {
        if (parentId) {
          const parent = await loadSectionById(parentId);
          if (!parent) return res.status(400).json({ error: "Parent section not found" });
          if (parent.kind !== kind) {
            return res.status(400).json({ error: "Parent must have same kind" });
          }
        }
        const sortOrder = parseInt(String(req.body?.sort_order ?? "0"), 10) || 0;
        const { rows } = await pool.query(
          `INSERT INTO reference_sections (parent_id, kind, slug, name, sort_order)
           VALUES ($1::uuid, $2, $3, $4, $5)
           RETURNING *`,
          [parentId, kind, slug, name, sortOrder],
        );
        res.status(201).json(rows[0]);
      } catch (e) {
        if (e.code === "23505") {
          return res.status(400).json({ error: "Section slug already exists in this level" });
        }
        console.error(e);
        res.status(500).json({ error: e.message || "Create section failed" });
      }
    },
  );

  app.patch(
    "/api/admin/reference/sections/:id",
    adminMiddleware,
    express.json({ limit: "256kb" }),
    async (req, res) => {
      try {
        const current = await loadSectionById(req.params.id);
        if (!current) return res.status(404).json({ error: "Section not found" });
        const nextKind = req.body?.kind ? normalizeKind(req.body.kind) : current.kind;
        if (!ensureKind(nextKind, res)) return;
        const nextName =
          req.body?.name !== undefined ? String(req.body.name).trim() : current.name;
        if (!nextName) return res.status(400).json({ error: "name required" });
        const nextSlug =
          req.body?.slug !== undefined
            ? normalizeSlug(req.body.slug)
            : current.slug;
        if (!nextSlug || !SLUG_RE.test(nextSlug)) {
          return res.status(400).json({ error: "Invalid slug" });
        }
        const nextSort =
          req.body?.sort_order !== undefined
            ? parseInt(String(req.body.sort_order), 10) || 0
            : current.sort_order;
        let nextParent =
          req.body?.parent_id !== undefined
            ? req.body.parent_id
              ? String(req.body.parent_id)
              : null
            : current.parent_id;
        if (nextParent === req.params.id) {
          return res.status(400).json({ error: "Section cannot be parent of itself" });
        }
        if (nextParent) {
          const parent = await loadSectionById(nextParent);
          if (!parent) return res.status(400).json({ error: "Parent section not found" });
          if (parent.kind !== nextKind) {
            return res.status(400).json({ error: "Parent must have same kind" });
          }
        }
        const { rows } = await pool.query(
          `UPDATE reference_sections SET
             parent_id = $2::uuid,
             kind = $3,
             slug = $4,
             name = $5,
             sort_order = $6,
             updated_at = NOW()
           WHERE id = $1::uuid
           RETURNING *`,
          [req.params.id, nextParent, nextKind, nextSlug, nextName, nextSort],
        );
        if (current.kind !== nextKind) {
          await pool.query(
            `UPDATE reference_posts SET kind = $2, updated_at = NOW() WHERE section_id = $1::uuid`,
            [req.params.id, nextKind],
          );
        }
        res.json(rows[0]);
      } catch (e) {
        if (e.code === "23505") {
          return res.status(400).json({ error: "Section slug already exists in this level" });
        }
        console.error(e);
        res.status(500).json({ error: e.message || "Update section failed" });
      }
    },
  );

  app.delete("/api/admin/reference/sections/:id", adminMiddleware, async (req, res) => {
    try {
      const section = await loadSectionById(req.params.id);
      if (!section) return res.status(404).json({ error: "Section not found" });
      const childCount = (
        await pool.query(
          `SELECT COUNT(*)::int AS c FROM reference_sections WHERE parent_id = $1::uuid`,
          [req.params.id],
        )
      ).rows[0]?.c;
      if (childCount > 0) {
        return res.status(400).json({ error: "Section has child sections" });
      }
      const postCount = (
        await pool.query(
          `SELECT COUNT(*)::int AS c FROM reference_posts WHERE section_id = $1::uuid`,
          [req.params.id],
        )
      ).rows[0]?.c;
      if (postCount > 0) {
        return res.status(400).json({ error: "Section has articles" });
      }
      await pool.query(`DELETE FROM reference_sections WHERE id = $1::uuid`, [req.params.id]);
      res.json({ ok: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "Delete section failed" });
    }
  });

  app.get("/api/admin/reference/posts", adminMiddleware, async (req, res) => {
    try {
      const values = [];
      const where = [];
      const kind = normalizeKind(req.query.kind);
      if (req.query.kind && !kind) return res.status(400).json({ error: "Invalid kind" });
      if (kind) {
        values.push(kind);
        where.push(`p.kind = $${values.length}`);
      }
      const sectionId = req.query.section_id ? String(req.query.section_id) : "";
      if (sectionId) {
        values.push(sectionId);
        where.push(`p.section_id = $${values.length}::uuid`);
      }
      const status = req.query.status ? String(req.query.status) : "";
      if (status === "draft" || status === "published") {
        values.push(status);
        where.push(`p.status = $${values.length}`);
      }
      const q = String(req.query.q || "").trim();
      if (q) {
        values.push(`%${q}%`);
        where.push(`(p.title ILIKE $${values.length} OR p.slug ILIKE $${values.length})`);
      }
      const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
      const { rows } = await pool.query(
        `SELECT p.id, p.kind, p.slug, p.title, p.excerpt, p.status, p.published_at, p.updated_at,
                p.section_id, s.name AS section_name
         FROM reference_posts p
         JOIN reference_sections s ON s.id = p.section_id
         ${whereSql}
         ORDER BY p.updated_at DESC`,
        values,
      );
      res.json(rows);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "List posts failed" });
    }
  });

  app.get("/api/admin/reference/posts/id/:id", adminMiddleware, async (req, res) => {
    try {
      const { rows } = await pool.query(
        `SELECT p.*, s.name AS section_name, s.slug AS section_slug
         FROM reference_posts p
         JOIN reference_sections s ON s.id = p.section_id
         WHERE p.id = $1::uuid`,
        [req.params.id],
      );
      if (!rows.length) return res.status(404).json({ error: "Not found" });
      const row = rows[0];
      res.json({
        ...row,
        content_blocks: Array.isArray(row.content_blocks) ? row.content_blocks : [],
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "Load post failed" });
    }
  });

  app.post(
    "/api/admin/reference/posts",
    adminMiddleware,
    express.json({ limit: "1024kb" }),
    async (req, res) => {
      try {
        const slug = normalizeSlug(req.body?.slug);
        if (!slug || !SLUG_RE.test(slug)) {
          return res.status(400).json({ error: "Invalid slug" });
        }
        const title = String(req.body?.title || "").trim();
        if (!title) return res.status(400).json({ error: "title required" });
        const sectionId = String(req.body?.section_id || "").trim();
        if (!sectionId) return res.status(400).json({ error: "section_id required" });
        const section = await loadSectionById(sectionId);
        if (!section) return res.status(400).json({ error: "Section not found" });
        const status =
          req.body?.status === "published" || req.body?.status === "draft"
            ? req.body.status
            : "draft";
        let publishedAt = req.body?.published_at ? new Date(req.body.published_at) : null;
        if (status === "published" && (!publishedAt || Number.isNaN(publishedAt.getTime()))) {
          publishedAt = new Date();
        }
        const blocks = sanitizeBlocks(
          Array.isArray(req.body?.content_blocks) ? req.body.content_blocks : [],
        );
        const { rows } = await pool.query(
          `INSERT INTO reference_posts (
             section_id, kind, slug, title, excerpt, content_blocks,
             status, published_at, author_id
           ) VALUES ($1::uuid, $2, $3, $4, $5, $6::jsonb, $7, $8, $9::uuid)
           RETURNING *`,
          [
            section.id,
            section.kind,
            slug,
            title,
            String(req.body?.excerpt ?? "").slice(0, 2000),
            JSON.stringify(blocks),
            status,
            publishedAt,
            req.userId,
          ],
        );
        res.status(201).json(rows[0]);
      } catch (e) {
        if (e.code === "23505") {
          return res.status(400).json({ error: "Slug already exists for this transport" });
        }
        console.error(e);
        res.status(500).json({ error: e.message || "Create post failed" });
      }
    },
  );

  app.patch(
    "/api/admin/reference/posts/id/:id",
    adminMiddleware,
    express.json({ limit: "1024kb" }),
    async (req, res) => {
      try {
        const currentRows = await pool.query(
          `SELECT * FROM reference_posts WHERE id = $1::uuid`,
          [req.params.id],
        );
        const current = currentRows.rows[0];
        if (!current) return res.status(404).json({ error: "Not found" });

        const slug =
          req.body?.slug !== undefined ? normalizeSlug(req.body.slug) : current.slug;
        if (!slug || !SLUG_RE.test(slug)) {
          return res.status(400).json({ error: "Invalid slug" });
        }
        const title =
          req.body?.title !== undefined ? String(req.body.title).trim() : current.title;
        if (!title) return res.status(400).json({ error: "title required" });

        let section = null;
        if (req.body?.section_id !== undefined) {
          const nextSectionId = String(req.body.section_id || "").trim();
          if (!nextSectionId) return res.status(400).json({ error: "section_id required" });
          section = await loadSectionById(nextSectionId);
          if (!section) return res.status(400).json({ error: "Section not found" });
        } else {
          section = await loadSectionById(current.section_id);
        }

        const status =
          req.body?.status === "published" || req.body?.status === "draft"
            ? req.body.status
            : current.status;
        let publishedAt =
          req.body?.published_at !== undefined
            ? req.body.published_at
              ? new Date(req.body.published_at)
              : null
            : current.published_at
              ? new Date(current.published_at)
              : null;
        if (status === "published" && (!publishedAt || Number.isNaN(publishedAt.getTime()))) {
          publishedAt = new Date();
        }
        const blocks = Array.isArray(req.body?.content_blocks)
          ? sanitizeBlocks(req.body.content_blocks)
          : sanitizeBlocks(current.content_blocks || []);

        const { rows } = await pool.query(
          `UPDATE reference_posts SET
             section_id = $2::uuid,
             kind = $3,
             slug = $4,
             title = $5,
             excerpt = $6,
             content_blocks = $7::jsonb,
             status = $8,
             published_at = $9,
             updated_at = NOW()
           WHERE id = $1::uuid
           RETURNING *`,
          [
            req.params.id,
            section.id,
            section.kind,
            slug,
            title,
            req.body?.excerpt !== undefined
              ? String(req.body.excerpt ?? "").slice(0, 2000)
              : current.excerpt,
            JSON.stringify(blocks),
            status,
            publishedAt,
          ],
        );
        res.json(rows[0]);
      } catch (e) {
        if (e.code === "23505") {
          return res.status(400).json({ error: "Slug already exists for this transport" });
        }
        console.error(e);
        res.status(500).json({ error: e.message || "Update post failed" });
      }
    },
  );

  app.delete("/api/admin/reference/posts/id/:id", adminMiddleware, async (req, res) => {
    try {
      const result = await pool.query(
        `DELETE FROM reference_posts WHERE id = $1::uuid`,
        [req.params.id],
      );
      if (result.rowCount === 0) return res.status(404).json({ error: "Not found" });
      res.json({ ok: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "Delete post failed" });
    }
  });
}
