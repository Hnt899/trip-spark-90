import express from "express";
import { pool } from "./db.js";
import { adminMiddleware } from "./authMiddleware.js";

export function registerSettingsRoutes(app) {
  app.get("/api/settings/:key", async (req, res) => {
    const key = String(req.params.key || "").trim();
    if (!key || key.length > 64) return res.status(400).json({ error: "invalid key" });
    try {
      const { rows } = await pool.query(`SELECT value_json FROM site_settings WHERE key = $1`, [key]);
      res.json(rows[0]?.value_json ?? {});
    } catch (e) { console.error("[settings] GET error:", e); res.status(500).json({ error: "failed to load settings" }); }
  });

  app.put("/api/admin/settings/:key", adminMiddleware, express.json({ limit: "1mb" }), async (req, res) => {
    const key = String(req.params.key || "").trim();
    if (!key || key.length > 64) return res.status(400).json({ error: "invalid key" });
    const body = req.body;
    if (!body || typeof body !== "object" || Array.isArray(body)) return res.status(400).json({ error: "body must be an object" });
    try {
      const { rows } = await pool.query(
        `INSERT INTO site_settings (key, value_json, updated_by)
         VALUES ($1, $2::jsonb, $3)
         ON CONFLICT (key) DO UPDATE SET value_json = EXCLUDED.value_json, updated_by = EXCLUDED.updated_by, updated_at = NOW()
         RETURNING value_json`,
        [key, JSON.stringify(body), req.userId]
      );
      res.json(rows[0].value_json);
    } catch (e) { console.error("[settings] PUT error:", e); res.status(500).json({ error: "failed to save settings" }); }
  });
}
