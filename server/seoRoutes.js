import express from "express";
import { pool } from "./db.js";
import { adminMiddleware } from "./authMiddleware.js";

const PAGE_KEYS = new Set([
  "home", "routes", "routes-list", "blog", "reference", "guide"
]);

export function registerSeoRoutes(app) {
  // ===== Публичный: получить SEO для страницы =====
  app.get("/api/seo/:pageKey", async (req, res) => {
    const pageKey = String(req.params.pageKey || "");
    if (!PAGE_KEYS.has(pageKey)) {
      return res.status(404).json({ error: "Unknown page" });
    }
    try {
      const { rows } = await pool.query(
        `SELECT title, description FROM page_seo WHERE page_key = $1`,
        [pageKey]
      );
      const row = rows[0];
      res.json({
        title: row?.title || "",
        description: row?.description || "",
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to load SEO" });
    }
  });

  // ===== Админ: список всех =====
  app.get("/api/admin/seo", adminMiddleware, async (_req, res) => {
    try {
      const { rows } = await pool.query(
        `SELECT id, page_key, title, description, updated_at
         FROM page_seo ORDER BY page_key ASC`
      );
      res.json(rows);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to list SEO" });
    }
  });

  // ===== Админ: обновить =====
  app.put(
    "/api/admin/seo/:pageKey",
    adminMiddleware,
    express.json({ limit: "16kb" }),
    async (req, res) => {
      const pageKey = String(req.params.pageKey || "");
      if (!PAGE_KEYS.has(pageKey)) {
        return res.status(404).json({ error: "Unknown page" });
      }
      try {
        const title = String(req.body?.title || "").slice(0, 200).trim();
        const description = String(req.body?.description || "").slice(0, 500).trim();

        const { rows } = await pool.query(
          `INSERT INTO page_seo (page_key, title, description)
           VALUES ($1, $2, $3)
           ON CONFLICT (page_key)
           DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, updated_at = NOW()
           RETURNING id, page_key, title, description, updated_at`,
          [pageKey, title, description]
        );
        res.json(rows[0]);
      } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to update SEO" });
      }
    }
  );
}
