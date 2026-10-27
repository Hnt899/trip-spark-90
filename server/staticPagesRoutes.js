import express from "express";
import { pool } from "./db.js";
import { adminMiddleware } from "./authMiddleware.js";

export function registerStaticPagesRoutes(app) {
  // Публичный: получить страницу по slug.
  // ВАЖНО: если slug не найден в static_pages — передаём управление дальше (next()),
  // иначе этот обработчик перехватывает /api/pages/home и /api/pages/routes,
  // которые обслуживает pageContentRoutes.js → главная и маршруты отдавали 404.
  app.get("/api/pages/:slug", async (req, res, next) => {
    const slug = String(req.params.slug || "").trim();
    if (!slug || slug.length > 64) return res.status(400).json({ error: "invalid slug" });
    try {
      const { rows } = await pool.query(
        `SELECT id, slug, title, content_blocks, seo_title, seo_description, status, updated_at
         FROM static_pages WHERE slug = $1 AND status = 'published' LIMIT 1`,
        [slug]
      );
      if (!rows[0]) return next();
      res.json(rows[0]);
    } catch (e) {
      console.error("[pages] GET error:", e);
      res.status(500).json({ error: "failed to load page" });
    }
  });

  // Админ: список всех страниц
  app.get("/api/admin/pages-list", adminMiddleware, async (_req, res) => {
    try {
      const { rows } = await pool.query(
        `SELECT id, slug, title, status, updated_at FROM static_pages ORDER BY slug`
      );
      res.json(rows);
    } catch (e) {
      console.error("[pages] admin list error:", e);
      res.status(500).json({ error: "failed to load list" });
    }
  });

  // Админ: создать страницу
  app.post("/api/admin/pages-list", adminMiddleware, express.json({ limit: "2mb" }), async (req, res) => {
    const b = req.body || {};
    const slug = String(b.slug || "").trim().toLowerCase();
    const title = String(b.title || "").trim();
    const status = b.status === "draft" ? "draft" : "published";
    const content_blocks = Array.isArray(b.content_blocks) ? b.content_blocks : [];
    if (!slug || !/^[a-z0-9-]+$/.test(slug)) return res.status(400).json({ error: "invalid slug" });
    if (!title) return res.status(400).json({ error: "title required" });
    try {
      const { rows } = await pool.query(
        `INSERT INTO static_pages (slug, title, content_blocks, status, updated_by)
         VALUES ($1, $2, $3::jsonb, $4, $5)
         ON CONFLICT (slug) DO NOTHING
         RETURNING *`,
        [slug, title, JSON.stringify(content_blocks), status, req.userId]
      );
      if (!rows[0]) return res.status(409).json({ error: "slug already exists" });
      res.json(rows[0]);
    } catch (e) {
      console.error("[pages] admin create error:", e);
      res.status(500).json({ error: "failed to create page" });
    }
  });

  // Админ: получить одну страницу (для редактирования, включая draft).
  // Здесь та же логика: не наша страница (home/routes) → next() в pageContentRoutes.
  app.get("/api/admin/pages/:slug", adminMiddleware, async (req, res, next) => {
    const slug = String(req.params.slug || "").trim();
    if (!slug || slug.length > 64) return res.status(400).json({ error: "invalid slug" });
    try {
      const { rows } = await pool.query(
        `SELECT * FROM static_pages WHERE slug = $1 LIMIT 1`,
        [slug]
      );
      if (!rows[0]) return next();
      res.json(rows[0]);
    } catch (e) {
      console.error("[pages] admin get error:", e);
      res.status(500).json({ error: "failed to load page" });
    }
  });

  // Админ: сохранить страницу
  app.put("/api/admin/pages/:slug", adminMiddleware, express.json({ limit: "2mb" }), async (req, res, next) => {
    const slug = String(req.params.slug || "").trim();
    if (!slug || slug.length > 64) return res.status(400).json({ error: "invalid slug" });
    const b = req.body || {};
    const title = String(b.title || "").trim();
    if (!title) return res.status(400).json({ error: "title required" });
    const content_blocks = Array.isArray(b.content_blocks) ? b.content_blocks : [];
    const status = b.status === "draft" ? "draft" : "published";
    const seo_title = b.seo_title ? String(b.seo_title) : null;
    const seo_description = b.seo_description ? String(b.seo_description) : null;

    try {
      // Не даём "сохранить" несуществующую статическую страницу молча — уводим дальше.
      const exists = await pool.query(
        `SELECT 1 FROM static_pages WHERE slug = $1 LIMIT 1`,
        [slug]
      );
      if (!exists.rows[0]) return next();

      const { rows } = await pool.query(
        `UPDATE static_pages
         SET title = $2,
             content_blocks = $3::jsonb,
             seo_title = $4,
             seo_description = $5,
             status = $6,
             updated_by = $7,
             updated_at = NOW()
         WHERE slug = $1
         RETURNING *`,
        [slug, title, JSON.stringify(content_blocks), seo_title, seo_description, status, req.userId]
      );
      if (!rows[0]) return res.status(404).json({ error: "not found" });
      res.json(rows[0]);
    } catch (e) {
      console.error("[pages] admin put error:", e);
      res.status(500).json({ error: "failed to save page" });
    }
  });
}
