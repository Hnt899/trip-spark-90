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

function normalizeSlug(v) {
  return String(v || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
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

async function loadCategoryById(categoryId) {
  if (!categoryId) return null;
  const { rows } = await pool.query(
    `SELECT id, parent_id, slug, name, sort_order
     FROM guide_categories
     WHERE id = $1::uuid`,
    [categoryId],
  );
  return rows[0] || null;
}

/**
 * @param {import('express').Express} app
 */
export function registerGuidePublicRoutes(app) {
  app.get("/api/guide/categories", async (_req, res) => {
    try {
      const { rows } = await pool.query(
        `SELECT c.id, c.parent_id, c.slug, c.name, c.sort_order,
                COUNT(p.id)::int AS published_count
         FROM guide_categories c
         LEFT JOIN guide_posts p
           ON p.category_id = c.id
          AND p.status = 'published'
          AND p.published_at IS NOT NULL
          AND p.published_at <= NOW()
         GROUP BY c.id
         ORDER BY c.parent_id NULLS FIRST, c.sort_order ASC, c.name ASC`,
      );
      res.json(rows);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "Failed to load categories" });
    }
  });

  app.get("/api/guide/posts", async (req, res) => {
    try {
      const values = [];
      const where = [
        `p.status = 'published'`,
        `p.published_at IS NOT NULL`,
        `p.published_at <= NOW()`,
      ];
      const category = normalizeSlug(req.query.category);
      if (category) {
        values.push(category);
        where.push(`p.category_slug = $${values.length}`);
      }
      const q = String(req.query.q || "").trim();
      if (q) {
        values.push(`%${q}%`);
        where.push(`(p.title ILIKE $${values.length} OR p.slug ILIKE $${values.length})`);
      }
      const whereSql = `WHERE ${where.join(" AND ")}`;
      const { rows } = await pool.query(
        `SELECT p.id, p.category_id, p.category_slug, p.slug, p.title, p.excerpt, p.published_at,
                c.name AS category_name, c.parent_id AS category_parent_id, c.sort_order AS category_sort_order
         FROM guide_posts p
         JOIN guide_categories c ON c.id = p.category_id
         ${whereSql}
         ORDER BY c.sort_order ASC, c.name ASC, p.title ASC`,
        values,
      );
      res.json(rows);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "Failed to load posts" });
    }
  });

  app.get("/api/guide/posts/by-category/:category/:slug", async (req, res) => {
    const category = normalizeSlug(req.params.category);
    const slug = normalizeSlug(req.params.slug);
    if (!category) return res.status(400).json({ error: "category required" });
    if (!slug) return res.status(400).json({ error: "slug required" });
    try {
      const { rows } = await pool.query(
        `SELECT p.*, c.name AS category_name, c.parent_id AS category_parent_id
         FROM guide_posts p
         JOIN guide_categories c ON c.id = p.category_id
         WHERE p.category_slug = $1
           AND p.slug = $2
           AND p.status = 'published'
           AND p.published_at IS NOT NULL
           AND p.published_at <= NOW()
         LIMIT 1`,
        [category, slug],
      );
      const row = rows[0];
      if (!row) return res.status(404).json({ error: "Not found" });
      pool.query(`UPDATE guide_posts SET views = views + 1 WHERE id = $1::uuid`, [row.id]).catch(() => {});
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
export function registerAdminGuideRoutes(app) {
  app.get("/api/admin/guide/categories", adminMiddleware, async (_req, res) => {
    try {
      const { rows } = await pool.query(
        `SELECT c.id, c.parent_id, c.slug, c.name, c.sort_order, c.created_at, c.updated_at,
                COUNT(p.id)::int AS total_posts
         FROM guide_categories c
         LEFT JOIN guide_posts p ON p.category_id = c.id
         GROUP BY c.id
         ORDER BY c.parent_id NULLS FIRST, c.sort_order ASC, c.name ASC`,
      );
      res.json(rows);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "List categories failed" });
    }
  });

  app.post(
    "/api/admin/guide/categories",
    adminMiddleware,
    express.json({ limit: "256kb" }),
    async (req, res) => {
      const name = String(req.body?.name || "").trim();
      if (!name) return res.status(400).json({ error: "name required" });
      const slug = normalizeSlug(req.body?.slug || name);
      if (!slug || !SLUG_RE.test(slug)) return res.status(400).json({ error: "Invalid slug" });
      const parentId = req.body?.parent_id ? String(req.body.parent_id) : null;
      try {
        if (parentId) {
          const parent = await loadCategoryById(parentId);
          if (!parent) return res.status(400).json({ error: "Parent category not found" });
        }
        const sortOrder = parseInt(String(req.body?.sort_order ?? "0"), 10) || 0;
        const { rows } = await pool.query(
          `INSERT INTO guide_categories (parent_id, slug, name, sort_order)
           VALUES ($1::uuid, $2, $3, $4)
           RETURNING *`,
          [parentId, slug, name, sortOrder],
        );
        res.status(201).json(rows[0]);
      } catch (e) {
        if (e.code === "23505") {
          return res.status(400).json({ error: "Category slug already exists in this level" });
        }
        console.error(e);
        res.status(500).json({ error: e.message || "Create category failed" });
      }
    },
  );

  app.patch(
    "/api/admin/guide/categories/:id",
    adminMiddleware,
    express.json({ limit: "256kb" }),
    async (req, res) => {
      try {
        const current = await loadCategoryById(req.params.id);
        if (!current) return res.status(404).json({ error: "Category not found" });
        const nextName =
          req.body?.name !== undefined ? String(req.body.name).trim() : current.name;
        if (!nextName) return res.status(400).json({ error: "name required" });
        const nextSlug =
          req.body?.slug !== undefined ? normalizeSlug(req.body.slug) : current.slug;
        if (!nextSlug || !SLUG_RE.test(nextSlug)) {
          return res.status(400).json({ error: "Invalid slug" });
        }
        const nextSort =
          req.body?.sort_order !== undefined
            ? parseInt(String(req.body.sort_order), 10) || 0
            : current.sort_order;
        const nextParent =
          req.body?.parent_id !== undefined
            ? req.body.parent_id
              ? String(req.body.parent_id)
              : null
            : current.parent_id;
        if (nextParent === req.params.id) {
          return res.status(400).json({ error: "Category cannot be parent of itself" });
        }
        if (nextParent) {
          const parent = await loadCategoryById(nextParent);
          if (!parent) return res.status(400).json({ error: "Parent category not found" });
        }
        const { rows } = await pool.query(
          `UPDATE guide_categories SET
             parent_id = $2::uuid,
             slug = $3,
             name = $4,
             sort_order = $5,
             updated_at = NOW()
           WHERE id = $1::uuid
           RETURNING *`,
          [req.params.id, nextParent, nextSlug, nextName, nextSort],
        );
        if (current.slug !== nextSlug) {
          await pool.query(
            `UPDATE guide_posts SET category_slug = $2, updated_at = NOW() WHERE category_id = $1::uuid`,
            [req.params.id, nextSlug],
          );
        }
        res.json(rows[0]);
      } catch (e) {
        if (e.code === "23505") {
          return res.status(400).json({ error: "Category slug already exists in this level" });
        }
        console.error(e);
        res.status(500).json({ error: e.message || "Update category failed" });
      }
    },
  );

  app.delete("/api/admin/guide/categories/:id", adminMiddleware, async (req, res) => {
    try {
      const category = await loadCategoryById(req.params.id);
      if (!category) return res.status(404).json({ error: "Category not found" });
      const childCount = (
        await pool.query(
          `SELECT COUNT(*)::int AS c FROM guide_categories WHERE parent_id = $1::uuid`,
          [req.params.id],
        )
      ).rows[0]?.c;
      if (childCount > 0) return res.status(400).json({ error: "Category has child categories" });
      const postCount = (
        await pool.query(`SELECT COUNT(*)::int AS c FROM guide_posts WHERE category_id = $1::uuid`, [
          req.params.id,
        ])
      ).rows[0]?.c;
      if (postCount > 0) return res.status(400).json({ error: "Category has articles" });
      await pool.query(`DELETE FROM guide_categories WHERE id = $1::uuid`, [req.params.id]);
      res.json({ ok: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "Delete category failed" });
    }
  });

  app.get("/api/admin/guide/posts", adminMiddleware, async (req, res) => {
    try {
      const values = [];
      const where = [];
      const category = normalizeSlug(req.query.category);
      if (category) {
        values.push(category);
        where.push(`p.category_slug = $${values.length}`);
      }
      const categoryId = req.query.category_id ? String(req.query.category_id) : "";
      if (categoryId) {
        values.push(categoryId);
        where.push(`p.category_id = $${values.length}::uuid`);
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
        `SELECT p.id, p.category_id, p.category_slug, p.slug, p.title, p.excerpt, p.status, p.published_at, p.updated_at,
                c.name AS category_name
         FROM guide_posts p
         JOIN guide_categories c ON c.id = p.category_id
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

  app.get("/api/admin/guide/posts/id/:id", adminMiddleware, async (req, res) => {
    try {
      const { rows } = await pool.query(
        `SELECT p.*, c.name AS category_name
         FROM guide_posts p
         JOIN guide_categories c ON c.id = p.category_id
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
    "/api/admin/guide/posts",
    adminMiddleware,
    express.json({ limit: "1024kb" }),
    async (req, res) => {
      try {
        const slug = normalizeSlug(req.body?.slug);
        if (!slug || !SLUG_RE.test(slug)) return res.status(400).json({ error: "Invalid slug" });
        const title = String(req.body?.title || "").trim();
        if (!title) return res.status(400).json({ error: "title required" });
        const categoryId = String(req.body?.category_id || "").trim();
        if (!categoryId) return res.status(400).json({ error: "category_id required" });
        const category = await loadCategoryById(categoryId);
        if (!category) return res.status(400).json({ error: "Category not found" });
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
          `INSERT INTO guide_posts (
             category_id, category_slug, slug, title, excerpt, content_blocks,
             status, published_at, author_id
           ) VALUES ($1::uuid, $2, $3, $4, $5, $6::jsonb, $7, $8, $9::uuid)
           RETURNING *`,
          [
            category.id,
            category.slug,
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
          return res.status(400).json({ error: "Slug already exists for this category" });
        }
        console.error(e);
        res.status(500).json({ error: e.message || "Create post failed" });
      }
    },
  );

  app.patch(
    "/api/admin/guide/posts/id/:id",
    adminMiddleware,
    express.json({ limit: "1024kb" }),
    async (req, res) => {
      try {
        const currentRows = await pool.query(`SELECT * FROM guide_posts WHERE id = $1::uuid`, [
          req.params.id,
        ]);
        const current = currentRows.rows[0];
        if (!current) return res.status(404).json({ error: "Not found" });

        const slug = req.body?.slug !== undefined ? normalizeSlug(req.body.slug) : current.slug;
        if (!slug || !SLUG_RE.test(slug)) return res.status(400).json({ error: "Invalid slug" });
        const title =
          req.body?.title !== undefined ? String(req.body.title).trim() : current.title;
        if (!title) return res.status(400).json({ error: "title required" });

        let category = null;
        if (req.body?.category_id !== undefined) {
          const nextCategoryId = String(req.body.category_id || "").trim();
          if (!nextCategoryId) return res.status(400).json({ error: "category_id required" });
          category = await loadCategoryById(nextCategoryId);
          if (!category) return res.status(400).json({ error: "Category not found" });
        } else {
          category = await loadCategoryById(current.category_id);
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
          `UPDATE guide_posts SET
             category_id = $2::uuid,
             category_slug = $3,
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
            category.id,
            category.slug,
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
          return res.status(400).json({ error: "Slug already exists for this category" });
        }
        console.error(e);
        res.status(500).json({ error: e.message || "Update post failed" });
      }
    },
  );

  app.delete("/api/admin/guide/posts/id/:id", adminMiddleware, async (req, res) => {
    try {
      const result = await pool.query(`DELETE FROM guide_posts WHERE id = $1::uuid`, [req.params.id]);
      if (result.rowCount === 0) return res.status(404).json({ error: "Not found" });
      res.json({ ok: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "Delete post failed" });
    }
  });
}
