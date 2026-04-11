import jwt from "jsonwebtoken";
import { pool } from "./db.js";

export function getJwtSecret() {
  const s = process.env.JWT_SECRET;
  if (s) return s;
  if (process.env.NODE_ENV !== "production") {
    return "dev-insecure-change-me";
  }
  throw new Error("JWT_SECRET is required in production");
}

export function signAccessToken(userId, email, rawUserMeta, isAdmin = false) {
  return jwt.sign(
    {
      typ: "access",
      sub: userId,
      email,
      meta: rawUserMeta || {},
      adm: !!isAdmin,
    },
    getJwtSecret(),
    { expiresIn: process.env.JWT_EXPIRES_IN || "30d" }
  );
}

export function signPre2faToken(userId, email) {
  return jwt.sign(
    { typ: "pre_2fa", sub: userId, email },
    getJwtSecret(),
    { expiresIn: "15m" }
  );
}

export function authMiddleware(req, res, next) {
  try {
    let token = null;
    const h = req.headers.authorization;
    if (h?.startsWith("Bearer ")) token = h.slice(7);
    if (!token && req.headers.cookie) {
      const m = req.headers.cookie.match(/(?:^|;\s*)access_token=([^;]+)/);
      if (m) token = decodeURIComponent(m[1]);
    }
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    const p = jwt.verify(token, getJwtSecret());
    if (p.typ !== "access")
      return res.status(401).json({ error: "Invalid token type" });
    req.userId = p.sub;
    req.userEmail = p.email;
    req.userMeta = p.meta || {};
    next();
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

export function pre2faMiddleware(req, res, next) {
  try {
    const h = req.headers.authorization;
    if (!h?.startsWith("Bearer "))
      return res.status(401).json({ error: "Unauthorized" });
    const token = h.slice(7);
    const p = jwt.verify(token, getJwtSecret());
    if (p.typ !== "pre_2fa")
      return res.status(401).json({ error: "Invalid token" });
    req.pre2faUserId = p.sub;
    req.pre2faEmail = p.email;
    next();
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

export function adminMiddleware(req, res, next) {
  authMiddleware(req, res, () => {
    pool
      .query(`SELECT is_admin FROM users WHERE id = $1`, [req.userId])
      .then(({ rows }) => {
        if (!rows[0]?.is_admin) {
          return res.status(403).json({ error: "Admin access required" });
        }
        next();
      })
      .catch((e) => {
        console.error(e);
        res.status(500).json({ error: "Server error" });
      });
  });
}

export function formatUser(row) {
  return {
    id: row.id,
    email: row.email,
    user_metadata: row.raw_user_meta || {},
    is_admin: !!row.is_admin,
  };
}

export async function getUserById(client, id) {
  const { rows } = await client.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return rows[0] || null;
}
