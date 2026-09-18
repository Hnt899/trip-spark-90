import express from "express";
import { pool } from "./db.js";
import { adminMiddleware } from "./authMiddleware.js";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function slugify(str) {
  const map = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh",
    з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
    п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c",
    ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu",
    я: "ya",
  };
  return String(str)
    .toLowerCase()
    .split("")
    .map((c) => (map[c] !== undefined ? map[c] : c))
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 64);
}

export function registerRegionRoutes(app) {
  // ===== Публичный список =====
  app.get("/api/regions", async (_req, res) => {
    try {
      const { rows } = await pool.query(
        `SELECT id, name, slug, sort_order FROM regions ORDER BY sort_order ASC, name ASC`
      );
      res.json(rows);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to list regions" });
    }
  });

  // ===== Публичный: маршруты региона =====
  app.get("/api/regions/:slug/routes", async (req, res) => {
    try {
      const { rows: regionRows } = await pool.query(
        `SELECT id, name FROM regions WHERE slug = $1`,
        [req.params.slug]
      );
      if (!regionRows.length) return res.status(404).json({ error: "Region not found" });
      const region = regionRows[0];

      const { rows } = await pool.query(
        `SELECT id, legacy_id, slug, name, region, rating, cover_image_url, excerpt
         FROM route_pages
         WHERE region = $1 AND status = 'published'
         ORDER BY rating DESC, name ASC`,
        [region.name]
      );
      res.json({ region, routes: rows });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to load region routes" });
    }
  });

  // ===== Админ: список =====
  app.get("/api/admin/regions", adminMiddleware, async (_req, res) => {
    try {
      const { rows } = await pool.query(
        `SELECT id, name, slug, sort_order, created_at, updated_at
         FROM regions ORDER BY sort_order ASC, name ASC`
      );
      res.json(rows);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to list regions" });
    }
  });

  // ===== Админ: создать =====
  app.post(
    "/api/admin/regions",
    adminMiddleware,
    express.json({ limit: "16kb" }),
    async (req, res) => {
      try {
        const name = String(req.body?.name || "").trim();
        if (!name) return res.status(400).json({ error: "name required" });
        const slug = String(req.body?.slug || slugify(name)).trim().toLowerCase();
        if (!SLUG_RE.test(slug)) return res.status(400).json({ error: "Invalid slug" });

        const maxOrderQ = await pool.query(`SELECT COALESCE(MAX(sort_order), 0) AS m FROM regions`);
        const sortOrder = (maxOrderQ.rows[0]?.m ?? 0) + 1;

        const { rows } = await pool.query(
          `INSERT INTO regions (name, slug, sort_order) VALUES ($1, $2, $3) RETURNING *`,
          [name, slug, sortOrder]
        );
        res.status(201).json(rows[0]);
      } catch (e) {
        if (e.code === "23505") return res.status(400).json({ error: "Slug already exists" });
        console.error(e);
        res.status(500).json({ error: "Failed to create region" });
      }
    }
  );

  // ===== Админ: обновить (название, slug, sort_order) =====
  app.patch(
    "/api/admin/regions/:id",
    adminMiddleware,
    express.json({ limit: "16kb" }),
    async (req, res) => {
      try {
        const cur = (await pool.query(`SELECT * FROM regions WHERE id = $1::uuid`, [req.params.id])).rows[0];
        if (!cur) return res.status(404).json({ error: "Not found" });

        const name = req.body?.name !== undefined ? String(req.body.name).trim() : cur.name;
        if (!name) return res.status(400).json({ error: "name required" });
        const slug = req.body?.slug !== undefined ? String(req.body.slug).trim().toLowerCase() : cur.slug;
        if (!SLUG_RE.test(slug)) return res.status(400).json({ error: "Invalid slug" });
        const sortOrder = req.body?.sort_order !== undefined ? parseInt(String(req.body.sort_order), 10) || 0 : cur.sort_order;

        // Если имя региона изменилось — обновим и в маршрутах
        if (name !== cur.name) {
          await pool.query(`UPDATE route_pages SET region = $1 WHERE region = $2`, [name, cur.name]);
        }

        const { rows } = await pool.query(
          `UPDATE regions SET name = $2, slug = $3, sort_order = $4, updated_at = NOW()
           WHERE id = $1::uuid RETURNING *`,
          [req.params.id, name, slug, sortOrder]
        );
        res.json(rows[0]);
      } catch (e) {
        if (e.code === "23505") return res.status(400).json({ error: "Slug already exists" });
        console.error(e);
        res.status(500).json({ error: "Failed to update region" });
      }
    }
  );

  // ===== Админ: порядок (массовое обновление sort_order) =====
  app.put(
    "/api/admin/regions/reorder",
    adminMiddleware,
    express.json({ limit: "32kb" }),
    async (req, res) => {
      try {
        const items = Array.isArray(req.body?.items) ? req.body.items : [];
        if (!items.length) return res.status(400).json({ error: "items required" });

        const client = await pool.connect();
        try {
          await client.query("BEGIN");
          for (let i = 0; i < items.length; i++) {
            const id = String(items[i]?.id || "");
            if (!id) continue;
            await client.query(
              `UPDATE regions SET sort_order = $2, updated_at = NOW() WHERE id = $1::uuid`,
              [id, i + 1]
            );
          }
          await client.query("COMMIT");
        } catch (e) {
          await client.query("ROLLBACK");
          throw e;
        } finally {
          client.release();
        }
        res.json({ ok: true });
      } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to reorder regions" });
      }
    }
  );

  // ===== Админ: удалить (с проверкой маршрутов) =====
  app.delete(
    "/api/admin/regions/:id",
    adminMiddleware,
    async (req, res) => {
      try {
        const region = (await pool.query(`SELECT * FROM regions WHERE id = $1::uuid`, [req.params.id])).rows[0];
        if (!region) return res.status(404).json({ error: "Not found" });

        // Проверяем, есть ли маршруты в этом регионе
        const countQ = await pool.query(
          `SELECT COUNT(*)::int AS c FROM route_pages WHERE region = $1`,
          [region.name]
        );
        const count = countQ.rows[0]?.c ?? 0;

        if (count > 0) {
          return res.status(409).json({
            error: "Region has routes",
            routeCount: count,
          });
        }

        await pool.query(`DELETE FROM regions WHERE id = $1::uuid`, [req.params.id]);
        res.json({ ok: true });
      } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to delete region" });
      }
    }
  );
}
