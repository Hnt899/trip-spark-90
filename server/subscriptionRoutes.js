import express from "express";
import { pool } from "./db.js";
import { adminMiddleware } from "./authMiddleware.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Простой in-memory rate limit: IP → массив timestamp'ов
const rateLimitMap = new Map();
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 час
const RATE_MAX = 5; // макс 5 подписок с одного IP в час

function checkRateLimit(ip) {
  const now = Date.now();
  const arr = (rateLimitMap.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (arr.length >= RATE_MAX) return false;
  arr.push(now);
  rateLimitMap.set(ip, arr);
  return true;
}

// Периодическая очистка (раз в час)
setInterval(() => {
  const now = Date.now();
  for (const [ip, arr] of rateLimitMap.entries()) {
    const fresh = arr.filter((t) => now - t < RATE_WINDOW_MS);
    if (fresh.length === 0) rateLimitMap.delete(ip);
    else rateLimitMap.set(ip, fresh);
  }
}, RATE_WINDOW_MS);

export function registerSubscriptionRoutes(app) {
  // ===== Публичный: подписаться =====
  app.post(
    "/api/subscriptions",
    express.json({ limit: "16kb" }),
    async (req, res) => {
      try {
        const rawEmail = String(req.body?.email ?? "").trim().toLowerCase();
        if (!rawEmail || rawEmail.length > 254 || !EMAIL_RE.test(rawEmail)) {
          return res.status(400).json({ error: "Invalid email" });
        }

        const ip = String(req.ip || req.headers["x-forwarded-for"] || "").slice(0, 64);
        if (ip && !checkRateLimit(ip)) {
          return res.status(429).json({ error: "Too many requests" });
        }

        const userAgent = String(req.headers["user-agent"] || "").slice(0, 500);

        // Проверяем, есть ли активная подписка
        const existing = await pool.query(
          `SELECT id FROM subscriptions
           WHERE LOWER(email) = $1 AND unsubscribed_at IS NULL
           LIMIT 1`,
          [rawEmail]
        );
        if (existing.rows.length > 0) {
          return res.json({ ok: true, already: true });
        }

        await pool.query(
          `INSERT INTO subscriptions (email, source, user_agent, ip)
           VALUES ($1, 'footer', $2, $3)`,
          [rawEmail, userAgent || null, ip || null]
        );

        res.status(201).json({ ok: true });
      } catch (e) {
        console.error("[subscriptions] POST failed:", e);
        res.status(500).json({ error: "Failed to subscribe" });
      }
    }
  );

  // ===== Админ: список =====
  app.get(
    "/api/admin/subscriptions",
    adminMiddleware,
    async (req, res) => {
      try {
        const limit = Math.min(200, Math.max(1, parseInt(String(req.query.limit || "50"), 10) || 50));
        const offset = Math.max(0, parseInt(String(req.query.offset || "0"), 10) || 0);
        const search = String(req.query.search || "").trim().toLowerCase();
        const onlyActive = String(req.query.active || "") === "1";

        const params = [];
        const where = [];
        if (search) {
          params.push(`%${search}%`);
          where.push(`LOWER(email) LIKE $${params.length}`);
        }
        if (onlyActive) {
          where.push(`unsubscribed_at IS NULL`);
        }
        const whereSql = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

        const countQ = await pool.query(
          `SELECT COUNT(*)::int AS c FROM subscriptions ${whereSql}`,
          params
        );

        params.push(limit);
        params.push(offset);
        const listQ = await pool.query(
          `SELECT id, email, source, created_at, unsubscribed_at
           FROM subscriptions
           ${whereSql}
           ORDER BY created_at DESC
           LIMIT $${params.length - 1} OFFSET $${params.length}`,
          params
        );

        res.json({
          items: listQ.rows,
          total: countQ.rows[0]?.c ?? 0,
          limit,
          offset,
        });
      } catch (e) {
        console.error("[subscriptions] list failed:", e);
        res.status(500).json({ error: "Failed to list subscriptions" });
      }
    }
  );

  // ===== Админ: отписать (soft delete) =====
  app.delete(
    "/api/admin/subscriptions/:id",
    adminMiddleware,
    async (req, res) => {
      try {
        const r = await pool.query(
          `UPDATE subscriptions
           SET unsubscribed_at = NOW()
           WHERE id = $1::uuid AND unsubscribed_at IS NULL
           RETURNING id`,
          [req.params.id]
        );
        if (r.rowCount === 0) {
          return res.status(404).json({ error: "Not found or already unsubscribed" });
        }
        res.json({ ok: true });
      } catch (e) {
        console.error("[subscriptions] delete failed:", e);
        res.status(500).json({ error: "Failed to unsubscribe" });
      }
    }
  );

  // ===== Админ: экспорт CSV =====
  app.get(
    "/api/admin/subscriptions/export",
    adminMiddleware,
    async (_req, res) => {
      try {
        const { rows } = await pool.query(
          `SELECT email, created_at
           FROM subscriptions
           WHERE unsubscribed_at IS NULL
           ORDER BY created_at DESC`
        );

        const header = "email,created_at";
        const lines = rows.map(
          (r) =>
            `${r.email},${new Date(r.created_at).toISOString()}`
        );
        const csv = [header, ...lines].join("\n");

        res.setHeader("Content-Type", "text/csv; charset=utf-8");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="subscriptions-${new Date().toISOString().slice(0, 10)}.csv"`
        );
        res.send(csv);
      } catch (e) {
        console.error("[subscriptions] export failed:", e);
        res.status(500).json({ error: "Failed to export" });
      }
    }
  );
}
