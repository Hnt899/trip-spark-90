import { pool } from "./db.js";
import { adminMiddleware } from "./authMiddleware.js";

const PAGE_KEYS = new Set(["home", "routes"]);
const LOCK_TTL_MS = 30 * 60 * 1000;

function isPageKey(key) {
  return PAGE_KEYS.has(key);
}

function isPlainObject(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

/** Shallow-sanitize page JSON: keep version, sectionOrder, sections */
function sanitizePageJson(input) {
  if (!isPlainObject(input)) return {};
  const out = {};
  if (typeof input.version === "number") out.version = input.version;
  if (Array.isArray(input.sectionOrder)) {
    out.sectionOrder = input.sectionOrder
      .filter((id) => typeof id === "string" && id.length > 0 && id.length < 64)
      .slice(0, 40);
  }
  if (isPlainObject(input.sections)) {
    out.sections = {};
    for (const [id, sec] of Object.entries(input.sections)) {
      if (typeof id !== "string" || id.length > 64 || !isPlainObject(sec)) continue;
      const section = {};
      if (typeof sec.visible === "boolean") section.visible = sec.visible;
      if (isPlainObject(sec.fields)) {
        section.fields = sec.fields;
      }
      out.sections[id] = section;
    }
  }
  return out;
}

async function ensureRow(pageKey) {
  await pool.query(
    `INSERT INTO page_contents (page_key) VALUES ($1)
     ON CONFLICT (page_key) DO NOTHING`,
    [pageKey]
  );
}

async function getRow(pageKey) {
  await ensureRow(pageKey);
  const { rows } = await pool.query(
    `SELECT page_key, draft_json, published_json, locked_by, locked_at, updated_by, updated_at
     FROM page_contents WHERE page_key = $1`,
    [pageKey]
  );
  return rows[0];
}

function lockActive(row) {
  if (!row?.locked_by || !row?.locked_at) return false;
  const age = Date.now() - new Date(row.locked_at).getTime();
  return age < LOCK_TTL_MS;
}

async function insertRevision(pageKey, snapshot, action, userId, sectionId = null) {
  await pool.query(
    `INSERT INTO page_content_revisions (page_key, snapshot, action, section_id, user_id)
     VALUES ($1, $2::jsonb, $3, $4, $5)`,
    [pageKey, JSON.stringify(snapshot), action, sectionId, userId]
  );
}

/**
 * @param {import('express').Express} app
 */
export function registerPagePublicRoutes(app) {
  app.get("/api/pages/:key", async (req, res) => {
    const key = String(req.params.key || "");
    if (!isPageKey(key)) {
      return res.status(404).json({ error: "Unknown page" });
    }
    try {
      const row = await getRow(key);
      res.json({
        pageKey: key,
        content: row.published_json || {},
        updatedAt: row.updated_at,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "Failed to load page" });
    }
  });
}

/**
 * @param {import('express').Express} app
 */
export function registerAdminPageRoutes(app) {
  app.get("/api/admin/pages/:key", adminMiddleware, async (req, res) => {
    const key = String(req.params.key || "");
    if (!isPageKey(key)) {
      return res.status(404).json({ error: "Unknown page" });
    }
    try {
      const row = await getRow(key);
      let lockUser = null;
      if (row.locked_by) {
        const u = await pool.query(
          `SELECT id, email FROM users WHERE id = $1`,
          [row.locked_by]
        );
        lockUser = u.rows[0] || null;
      }
      const active = lockActive(row);
      res.json({
        pageKey: key,
        draft: row.draft_json || {},
        published: row.published_json || {},
        lock: active
          ? {
              lockedBy: row.locked_by,
              lockedAt: row.locked_at,
              email: lockUser?.email || null,
              isMine: row.locked_by === req.userId,
            }
          : null,
        updatedAt: row.updated_at,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "Failed to load page" });
    }
  });

  app.post("/api/admin/pages/:key/lock", adminMiddleware, async (req, res) => {
    const key = String(req.params.key || "");
    if (!isPageKey(key)) {
      return res.status(404).json({ error: "Unknown page" });
    }
    try {
      const row = await getRow(key);
      if (lockActive(row) && row.locked_by !== req.userId) {
        return res.status(409).json({
          error: "Страница уже редактируется другим администратором",
          lockedBy: row.locked_by,
        });
      }
      await pool.query(
        `UPDATE page_contents
         SET locked_by = $2, locked_at = NOW(), updated_by = $2
         WHERE page_key = $1`,
        [key, req.userId]
      );
      res.json({ ok: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "Lock failed" });
    }
  });

  app.post("/api/admin/pages/:key/unlock", adminMiddleware, async (req, res) => {
    const key = String(req.params.key || "");
    if (!isPageKey(key)) {
      return res.status(404).json({ error: "Unknown page" });
    }
    try {
      const row = await getRow(key);
      if (lockActive(row) && row.locked_by !== req.userId) {
        return res.status(409).json({ error: "Нельзя снять чужую блокировку" });
      }
      await pool.query(
        `UPDATE page_contents
         SET locked_by = NULL, locked_at = NULL
         WHERE page_key = $1`,
        [key]
      );
      res.json({ ok: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "Unlock failed" });
    }
  });

  app.put("/api/admin/pages/:key/draft", adminMiddleware, async (req, res) => {
    const key = String(req.params.key || "");
    if (!isPageKey(key)) {
      return res.status(404).json({ error: "Unknown page" });
    }
    try {
      const row = await getRow(key);
      if (lockActive(row) && row.locked_by !== req.userId) {
        return res.status(409).json({
          error: "Страница заблокирована другим администратором",
        });
      }
      const draft = sanitizePageJson(req.body?.draft ?? req.body ?? {});
      await pool.query(
        `UPDATE page_contents
         SET draft_json = $2::jsonb,
             locked_by = $3,
             locked_at = NOW(),
             updated_by = $3
         WHERE page_key = $1`,
        [key, JSON.stringify(draft), req.userId]
      );
      await insertRevision(key, draft, "save_draft", req.userId);
      res.json({ ok: true, draft });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "Save draft failed" });
    }
  });

  app.post("/api/admin/pages/:key/publish", adminMiddleware, async (req, res) => {
    const key = String(req.params.key || "");
    if (!isPageKey(key)) {
      return res.status(404).json({ error: "Unknown page" });
    }
    try {
      const row = await getRow(key);
      if (lockActive(row) && row.locked_by !== req.userId) {
        return res.status(409).json({
          error: "Страница заблокирована другим администратором",
        });
      }
      const useBody = req.body?.draft != null;
      const draft = useBody
        ? sanitizePageJson(req.body.draft)
        : row.draft_json || {};
      await pool.query(
        `UPDATE page_contents
         SET draft_json = $2::jsonb,
             published_json = $2::jsonb,
             locked_by = $3,
             locked_at = NOW(),
             updated_by = $3
         WHERE page_key = $1`,
        [key, JSON.stringify(draft), req.userId]
      );
      await insertRevision(key, draft, "publish", req.userId);
      res.json({ ok: true, published: draft });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "Publish failed" });
    }
  });

  app.post("/api/admin/pages/:key/reset", adminMiddleware, async (req, res) => {
    const key = String(req.params.key || "");
    if (!isPageKey(key)) {
      return res.status(404).json({ error: "Unknown page" });
    }
    try {
      const row = await getRow(key);
      if (lockActive(row) && row.locked_by !== req.userId) {
        return res.status(409).json({
          error: "Страница заблокирована другим администратором",
        });
      }
      const scope = req.body?.scope === "section" ? "section" : "page";
      const sectionId =
        typeof req.body?.sectionId === "string" ? req.body.sectionId : null;

      let draft = isPlainObject(row.draft_json) ? { ...row.draft_json } : {};
      if (scope === "page") {
        draft = {};
      } else {
        if (!sectionId) {
          return res.status(400).json({ error: "sectionId required" });
        }
        draft = {
          ...draft,
          sections: { ...(draft.sections || {}) },
        };
        delete draft.sections[sectionId];
      }

      const action = scope === "page" ? "reset_page" : "reset_section";
      await pool.query(
        `UPDATE page_contents
         SET draft_json = $2::jsonb,
             locked_by = $3,
             locked_at = NOW(),
             updated_by = $3
         WHERE page_key = $1`,
        [key, JSON.stringify(draft), req.userId]
      );
      await insertRevision(key, draft, action, req.userId, sectionId);
      res.json({ ok: true, draft });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "Reset failed" });
    }
  });

  app.get("/api/admin/pages/:key/revisions", adminMiddleware, async (req, res) => {
    const key = String(req.params.key || "");
    if (!isPageKey(key)) {
      return res.status(404).json({ error: "Unknown page" });
    }
    try {
      const limit = Math.min(
        100,
        Math.max(1, parseInt(String(req.query.limit || "40"), 10) || 40)
      );
      const { rows } = await pool.query(
        `SELECT r.id, r.page_key, r.action, r.section_id, r.user_id, r.created_at,
                u.email AS user_email
         FROM page_content_revisions r
         LEFT JOIN users u ON u.id = r.user_id
         WHERE r.page_key = $1
         ORDER BY r.created_at DESC
         LIMIT $2`,
        [key, limit]
      );
      res.json({ revisions: rows });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || "Revisions failed" });
    }
  });

  app.post(
    "/api/admin/pages/:key/revisions/:id/restore",
    adminMiddleware,
    async (req, res) => {
      const key = String(req.params.key || "");
      const id = String(req.params.id || "");
      if (!isPageKey(key)) {
        return res.status(404).json({ error: "Unknown page" });
      }
      try {
        const row = await getRow(key);
        if (lockActive(row) && row.locked_by !== req.userId) {
          return res.status(409).json({
            error: "Страница заблокирована другим администратором",
          });
        }
        const { rows } = await pool.query(
          `SELECT snapshot FROM page_content_revisions
           WHERE id = $1 AND page_key = $2`,
          [id, key]
        );
        if (!rows[0]) {
          return res.status(404).json({ error: "Revision not found" });
        }
        const draft = sanitizePageJson(rows[0].snapshot);
        await pool.query(
          `UPDATE page_contents
           SET draft_json = $2::jsonb,
               locked_by = $3,
               locked_at = NOW(),
               updated_by = $3
           WHERE page_key = $1`,
          [key, JSON.stringify(draft), req.userId]
        );
        await insertRevision(key, draft, "restore", req.userId);
        res.json({ ok: true, draft });
      } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message || "Restore failed" });
      }
    }
  );
}
