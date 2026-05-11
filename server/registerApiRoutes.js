import express from "express";
import bcrypt from "bcryptjs";
import { authenticator } from "otplib";
import { pool } from "./db.js";
import {
  signAccessToken,
  signPre2faToken,
  authMiddleware,
  pre2faMiddleware,
  formatUser,
  getUserById,
} from "./authMiddleware.js";
import { registerAdminRoutes } from "./adminApiRoutes.js";
import { registerBlogPublicRoutes } from "./blogRoutes.js";
import { registerRoutePublicRoutes } from "./routePageRoutes.js";
import { sendExolveSms } from "./sendSms.js";
import { sendEmailOtp } from "./emailOtp.js";
import { registerRzdTrainSearchRoutes } from "./rzdTrainSearchRoutes.js";
import { registerStripePaymentRoutes } from "./stripePayments.js";

function normalizePhoneE164(input) {
  const digits = input.replace(/\D/g, "");
  if (digits.startsWith("8")) return "+7" + digits.slice(1);
  if (digits.startsWith("7")) return "+" + digits;
  return "+7" + digits;
}

function randomDigits(n) {
  let s = "";
  for (let i = 0; i < n; i++) s += Math.floor(Math.random() * 10);
  return s;
}

/**
 * @param {import('express').Express} app
 */
export function registerApiRoutes(app) {
  registerRzdTrainSearchRoutes(app);
  registerStripePaymentRoutes(app);

  // --- Auth: session ---
  app.get("/api/auth/session", authMiddleware, async (req, res) => {
    const row = await getUserById(pool, req.userId);
    if (!row) return res.status(401).json({ error: "Unauthorized" });
    res.json({
      user: formatUser(row),
      access_token: req.headers.authorization?.replace(/^Bearer\s+/i, "") || "",
    });
  });

  // --- Auth: password login (email or phone) ---
  app.post("/api/auth/login", express.json(), async (req, res) => {
    const { email, phone, password } = req.body || {};
    if (!password) return res.status(400).json({ error: "password required" });

    let loginEmail = email ? String(email).trim().toLowerCase() : null;
    if (!loginEmail && phone) {
      const normalized = normalizePhoneE164(phone);
      const last10 = normalized.replace(/\D/g, "").slice(-10);
      const { rows: matches } = await pool.query(
        `SELECT email FROM user_profiles
         WHERE length(regexp_replace(COALESCE(phone,''), '[^0-9]', '', 'g')) >= 10
         AND right(regexp_replace(COALESCE(phone,''), '[^0-9]', '', 'g'), 10) = $1
         LIMIT 1`,
        [last10]
      );
      if (matches[0]?.email) loginEmail = matches[0].email.trim().toLowerCase();
      if (!loginEmail) {
        const digits = normalized.replace(/\D/g, "");
        const tempEmail = `${digits}@temp.com`;
        const { rows: u } = await pool.query(
          `SELECT email FROM users WHERE email = $1`,
          [tempEmail]
        );
        if (u[0]?.email) loginEmail = u[0].email;
      }
    }
    if (!loginEmail)
      return res.status(400).json({ error: "email or phone required" });

    const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      loginEmail,
    ]);
    const row = rows[0];
    if (!row || !(await bcrypt.compare(password, row.password_hash))) {
      return res.status(401).json({ error: "Invalid login credentials" });
    }
    const { rows: fa } = await pool.query(
      `SELECT is_2fa_enabled($1::uuid) AS en`,
      [row.id]
    );
    if (fa[0]?.en) {
      const preAuthToken = signPre2faToken(row.id, row.email);
      return res.json({
        requires2FA: true,
        userEmail: row.email,
        preAuthToken,
      });
    }
    const access_token = signAccessToken(
      row.id,
      row.email,
      row.raw_user_meta,
      row.is_admin
    );
    res.json({ user: formatUser(row), access_token });
  });

  app.post("/api/auth/2fa-login/send-email", pre2faMiddleware, async (req, res) => {
    const email = req.pre2faEmail;
    const code = randomDigits(6);
    const exp = new Date(Date.now() + 10 * 60 * 1000);
    await pool.query(
      `INSERT INTO email_otp_challenges (email, code, purpose, expires_at) VALUES ($1, $2, '2fa_login', $3)`,
      [email.toLowerCase(), code, exp.toISOString()]
    );
    try {
      await sendEmailOtp(email, code, "2fa_login");
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message || "Email send failed" });
    }
    res.json({ ok: true });
  });

  app.post("/api/auth/2fa-login/verify", pre2faMiddleware, express.json(), async (req, res) => {
    const { code } = req.body || {};
    const email = req.pre2faEmail.toLowerCase();
    if (!code) return res.status(400).json({ error: "code required" });
    const { rows } = await pool.query(
      `SELECT * FROM email_otp_challenges WHERE email = $1 AND code = $2 AND purpose = '2fa_login' AND used = false AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1`,
      [email, String(code).trim()]
    );
    if (!rows.length)
      return res.status(400).json({ error: "Invalid or expired code" });
    await pool.query(`UPDATE email_otp_challenges SET used = true WHERE id = $1`, [
      rows[0].id,
    ]);
    const row = await getUserById(pool, req.pre2faUserId);
    if (!row) return res.status(400).json({ error: "User not found" });
    const access_token = signAccessToken(
      row.id,
      row.email,
      row.raw_user_meta,
      row.is_admin
    );
    res.json({ user: formatUser(row), access_token });
  });

  // --- Email OTP (signup / login) ---
  app.post("/api/auth/email/send-otp", express.json(), async (req, res) => {
    const { email } = req.body || {};
    if (!email || !String(email).includes("@"))
      return res.status(400).json({ error: "valid email required" });
    const em = String(email).trim().toLowerCase();
    const code = randomDigits(6);
    const exp = new Date(Date.now() + 10 * 60 * 1000);
    const purpose = "email_auth";
    await pool.query(
      `INSERT INTO email_otp_challenges (email, code, purpose, expires_at) VALUES ($1, $2, $3, $4)`,
      [em, code, purpose, exp.toISOString()]
    );
    try {
      await sendEmailOtp(em, code, purpose);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message || "Email send failed" });
    }
    res.json({ ok: true });
  });

  app.post("/api/auth/email/verify-otp", express.json(), async (req, res) => {
    const { email, token, isRegistration } = req.body || {};
    if (!email || !token)
      return res.status(400).json({ error: "email and token required" });
    const em = String(email).trim().toLowerCase();
    const { rows: ch } = await pool.query(
      `SELECT * FROM email_otp_challenges WHERE email = $1 AND code = $2 AND purpose = 'email_auth' AND used = false AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1`,
      [em, String(token).trim()]
    );
    if (!ch.length)
      return res.status(400).json({ error: "Invalid or expired code" });
    await pool.query(`UPDATE email_otp_challenges SET used = true WHERE id = $1`, [
      ch[0].id,
    ]);

    let row = (
      await pool.query(`SELECT * FROM users WHERE email = $1`, [em])
    ).rows[0];

    if (!row) {
      if (!isRegistration)
        return res.status(400).json({ error: "User not found" });
      const autoPassword =
        Math.random().toString(36).slice(-12) +
        Math.random().toString(36).slice(-12);
      const hash = await bcrypt.hash(autoPassword, 10);
      const meta = { has_password: false, auto_password: autoPassword };
      const ins = await pool.query(
        `INSERT INTO users (email, password_hash, raw_user_meta) VALUES ($1, $2, $3::jsonb) RETURNING *`,
        [em, hash, JSON.stringify(meta)]
      );
      row = ins.rows[0];
    }

    const access_token = signAccessToken(
      row.id,
      row.email,
      row.raw_user_meta,
      row.is_admin
    );
    res.json({ user: formatUser(row), access_token });
  });

  // --- SMS ---
  app.post("/api/auth/sms/send", express.json(), async (req, res) => {
    const { phone } = req.body || {};
    if (!phone) return res.status(400).json({ error: "phone required" });
    const normalized = normalizePhoneE164(phone);
    const digits = normalized.replace(/\D/g, "");
    const phoneWithPlus = "+" + digits;
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { rows: recent } = await pool.query(
      `SELECT id FROM verification_codes WHERE (phone = $1 OR phone = $2 OR phone LIKE $3) AND created_at >= $4`,
      [phoneWithPlus, digits, `%${digits.slice(-10)}`, oneHourAgo]
    );
    if (recent.length >= 3) {
      return res.status(429).json({
        success: false,
        error: "Превышен лимит отправки SMS (3 в час). Попробуйте позже.",
      });
    }
    const code = randomDigits(6);
    const message = `Ваш код: ${code}`;
    try {
      await sendExolveSms(normalized, message);
    } catch (e) {
      console.error(e);
      return res.status(400).json({
        success: false,
        error: e.message || "SMS failed",
      });
    }
    const exp = new Date(Date.now() + 10 * 60 * 1000);
    await pool.query(
      `INSERT INTO verification_codes (phone, code, expires_at) VALUES ($1, $2, $3)`,
      [phoneWithPlus, code, exp.toISOString()]
    );
    res.json({ success: true, message_id: "ok" });
  });

  app.post("/api/auth/sms/verify", express.json(), async (req, res) => {
    const { phone, token, isRegistration } = req.body || {};
    if (!phone || !token)
      return res.status(400).json({ error: "phone and token required" });
    const normalized = normalizePhoneE164(phone);
    const digits = normalized.replace(/\D/g, "");
    const phoneWithPlus = "+" + digits;
    const tempEmail = `${digits}@temp.com`;
    const tempPassword = `phone_${digits}_${digits.slice(-4)}`;

    const { rows: codes } = await pool.query(
      `SELECT * FROM verification_codes WHERE (phone = $1 OR phone = $2) AND code = $3 AND used = false AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1`,
      [phoneWithPlus, digits, String(token).trim()]
    );
    if (!codes.length)
      return res.status(400).json({ error: "Invalid or expired code" });
    await pool.query(`UPDATE verification_codes SET used = true WHERE id = $1`, [
      codes[0].id,
    ]);

    const { rows: prof } = await pool.query(
      `SELECT user_id FROM user_profiles WHERE phone = $1 OR phone = $2 LIMIT 1`,
      [phoneWithPlus, normalized]
    );

    let userId;
    let row;

    if (prof.length) {
      userId = prof[0].user_id;
      row = await getUserById(pool, userId);
    } else {
      const existing = (
        await pool.query(`SELECT * FROM users WHERE email = $1`, [tempEmail])
      ).rows[0];
      if (existing) {
        row = existing;
      } else {
        if (!isRegistration) {
          return res.status(400).json({
            error: "User not found",
            code: "PHONE_NOT_REGISTERED",
          });
        }
        const hash = await bcrypt.hash(tempPassword, 10);
        const meta = { phone: phoneWithPlus, temp_password: tempPassword };
        const ins = await pool.query(
          `INSERT INTO users (email, password_hash, phone, raw_user_meta) VALUES ($1, $2, $3, $4::jsonb) RETURNING *`,
          [tempEmail, hash, phoneWithPlus, JSON.stringify(meta)]
        );
        row = ins.rows[0];
      }
    }

    await pool.query(
      `INSERT INTO user_profiles (user_id, phone, email) VALUES ($1, $2, $3)
       ON CONFLICT (user_id) DO UPDATE SET phone = EXCLUDED.phone, email = COALESCE(user_profiles.email, EXCLUDED.email)`,
      [row.id, phoneWithPlus, tempEmail]
    );

    const metaObj = row.raw_user_meta || {};
    if (!metaObj.has_password) {
      const autoPassword =
        Math.random().toString(36).slice(-12) +
        Math.random().toString(36).slice(-12);
      const newHash = await bcrypt.hash(autoPassword, 10);
      const meta = {
        ...metaObj,
        has_password: false,
        auto_password: autoPassword,
      };
      await pool.query(
        `UPDATE users SET password_hash = $2, raw_user_meta = $3::jsonb WHERE id = $1`,
        [row.id, newHash, JSON.stringify(meta)]
      );
      row = await getUserById(pool, row.id);
    }

    const access_token = signAccessToken(
      row.id,
      row.email,
      row.raw_user_meta,
      row.is_admin
    );
    res.json({ user: formatUser(row), access_token });
  });

  // --- Update current user (auth.users parity) ---
  app.patch("/api/auth/me", authMiddleware, express.json(), async (req, res) => {
    const { phone, email, password, user_metadata } = req.body || {};
    const row = await getUserById(pool, req.userId);
    if (!row) return res.status(404).json({ error: "Not found" });

    let newEmail = row.email;
    let newPhone = row.phone;
    let newHash = row.password_hash;
    let meta = row.raw_user_meta || {};

    if (user_metadata && typeof user_metadata === "object") {
      meta = { ...meta, ...user_metadata };
    }
    if (phone) {
      newPhone = normalizePhoneE164(phone);
    }
    if (email && String(email).includes("@")) {
      newEmail = String(email).trim().toLowerCase();
    }
    if (password) {
      newHash = await bcrypt.hash(password, 10);
      meta = { ...meta, has_password: true };
    }

    try {
      await pool.query(
        `UPDATE users SET email = $2, phone = $3, password_hash = $4, raw_user_meta = $5::jsonb WHERE id = $1`,
        [req.userId, newEmail, newPhone, newHash, JSON.stringify(meta)]
      );
    } catch (e) {
      if (e.code === "23505")
        return res.status(400).json({ error: "Email already in use" });
      throw e;
    }
    const updated = await getUserById(pool, req.userId);
    res.json({ user: formatUser(updated) });
  });

  // --- User profiles ---
  app.get("/api/user-profiles/me", authMiddleware, async (req, res) => {
    const { rows } = await pool.query(
      `SELECT * FROM user_profiles WHERE user_id = $1`,
      [req.userId]
    );
    res.json(rows[0] || null);
  });

  app.put("/api/user-profiles/me", authMiddleware, express.json(), async (req, res) => {
    const body = req.body || {};
    const { rows: existing } = await pool.query(
      `SELECT id FROM user_profiles WHERE user_id = $1`,
      [req.userId]
    );
    if (existing.length) {
      const { rows } = await pool.query(
        `UPDATE user_profiles SET
          first_name = $2, last_name = $3, patronymic = $4, phone = $5, email = $6, birth_date = $7,
          updated_at = NOW()
        WHERE user_id = $1 RETURNING *`,
        [
          req.userId,
          body.first_name ?? null,
          body.last_name ?? null,
          body.patronymic ?? null,
          body.phone ?? null,
          body.email ?? null,
          body.birth_date ?? null,
        ]
      );
      return res.json(rows[0]);
    }
    const { rows } = await pool.query(
      `INSERT INTO user_profiles (user_id, first_name, last_name, patronymic, phone, email, birth_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        req.userId,
        body.first_name ?? null,
        body.last_name ?? null,
        body.patronymic ?? null,
        body.phone ?? null,
        body.email ?? null,
        body.birth_date ?? null,
      ]
    );
    res.json(rows[0]);
  });

  // --- Passengers ---
  app.get("/api/passengers", authMiddleware, async (req, res) => {
    const { rows } = await pool.query(
      `SELECT * FROM passengers WHERE user_id = $1 ORDER BY created_at DESC`,
      [req.userId]
    );
    res.json(rows);
  });

  app.post("/api/passengers", authMiddleware, express.json(), async (req, res) => {
    const b = req.body || {};
    const { rows } = await pool.query(
      `INSERT INTO passengers (user_id, display_name, name, surname, patronymic, gender, passport_series, passport_number, birth_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        req.userId,
        b.display_name ?? null,
        b.name,
        b.surname,
        b.patronymic ?? null,
        b.gender ?? null,
        b.passport_series,
        b.passport_number,
        b.birth_date,
      ]
    );
    res.json(rows[0]);
  });

  app.patch("/api/passengers/:id", authMiddleware, express.json(), async (req, res) => {
    const b = req.body || {};
    const { rows } = await pool.query(
      `UPDATE passengers SET
        display_name = $3, name = $4, surname = $5, patronymic = $6, gender = $7,
        passport_series = $8, passport_number = $9, birth_date = $10, updated_at = NOW()
      WHERE id = $1 AND user_id = $2 RETURNING *`,
      [
        req.params.id,
        req.userId,
        b.display_name ?? null,
        b.name,
        b.surname,
        b.patronymic ?? null,
        b.gender ?? null,
        b.passport_series,
        b.passport_number,
        b.birth_date,
      ]
    );
    if (!rows.length) return res.status(404).json({ error: "Not found" });
    res.json(rows[0]);
  });

  app.delete("/api/passengers/:id", authMiddleware, async (req, res) => {
    const r = await pool.query(
      `DELETE FROM passengers WHERE id = $1 AND user_id = $2`,
      [req.params.id, req.userId]
    );
    if (!r.rowCount) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  });

  // --- Tickets ---
  app.get("/api/tickets", authMiddleware, async (req, res) => {
    const { rows } = await pool.query(
      `SELECT * FROM tickets WHERE user_id = $1 ORDER BY created_at DESC`,
      [req.userId]
    );
    res.json(rows);
  });

  app.get("/api/tickets/by-order/:orderNumber", authMiddleware, async (req, res) => {
    const { rows } = await pool.query(
      `SELECT * FROM tickets WHERE order_number = $1 AND user_id = $2`,
      [req.params.orderNumber, req.userId]
    );
    res.json(rows[0] || null);
  });

  app.get("/api/tickets/:id", authMiddleware, async (req, res) => {
    const { rows } = await pool.query(
      `SELECT * FROM tickets WHERE id = $1::uuid AND user_id = $2`,
      [req.params.id, req.userId]
    );
    res.json(rows[0] || null);
  });

  app.post("/api/tickets", authMiddleware, express.json(), async (req, res) => {
    const b = req.body || {};
    const { rows } = await pool.query(
      `INSERT INTO tickets (
        user_id, order_number, transport_type, total_price, tickets_data,
        from_city, to_city, departure_date, electronic_registration_status, payment_status
      ) VALUES ($1, $2, $3, $4, $5::jsonb, $6, $7, $8, $9, $10) RETURNING *`,
      [
        req.userId,
        b.order_number,
        b.transport_type,
        b.total_price,
        JSON.stringify(b.tickets_data || []),
        b.from_city,
        b.to_city,
        b.departure_date,
        b.electronic_registration_status || "pending",
        b.payment_status || "pending",
      ]
    );
    res.json(rows[0]);
  });

  app.patch("/api/tickets/:id", authMiddleware, express.json(), async (req, res) => {
    const allowed = [
      "electronic_registration_status",
      "order_status",
      "payment_status",
      "payment_transaction_id",
      "payment_paid_at",
      "payment_method",
      "payment_raw",
    ];
    const b = req.body || {};
    const sets = [];
    const vals = [req.params.id, req.userId];
    let i = 3;
    for (const k of allowed) {
      if (b[k] !== undefined) {
        sets.push(
          k === "payment_raw" ? `payment_raw = $${i}::jsonb` : `${k} = $${i}`
        );
        vals.push(k === "payment_raw" ? JSON.stringify(b[k]) : b[k]);
        i++;
      }
    }
    if (!sets.length) return res.status(400).json({ error: "No fields" });
    sets.push("updated_at = NOW()");
    const { rows } = await pool.query(
      `UPDATE tickets SET ${sets.join(", ")} WHERE id = $1 AND user_id = $2 RETURNING *`,
      vals
    );
    if (!rows.length) return res.status(404).json({ error: "Not found" });
    res.json(rows[0]);
  });

  // --- Certificates ---
  app.post("/api/rpc/expire_old_certificates", authMiddleware, async (req, res) => {
    await pool.query(`SELECT expire_old_certificates()`);
    res.json({ ok: true });
  });

  app.post("/api/rpc/create_certificate", authMiddleware, express.json(), async (req, res) => {
    const { p_transport_type, p_amount, p_order_id } = req.body || {};
    const { rows } = await pool.query(
      `SELECT * FROM create_certificate($1::uuid, $2::text, $3::numeric, $4::uuid)`,
      [req.userId, p_transport_type, p_amount, p_order_id || null]
    );
    res.json(rows[0] || null);
  });

  app.post("/api/rpc/is_2fa_enabled", authMiddleware, express.json(), async (req, res) => {
    const uid = req.body?.p_user_id || req.userId;
    if (uid !== req.userId)
      return res.status(403).json({ error: "Forbidden" });
    const { rows } = await pool.query(`SELECT is_2fa_enabled($1::uuid) AS v`, [uid]);
    res.json({ data: rows[0]?.v ?? false });
  });

  app.get("/api/certificates", authMiddleware, async (req, res) => {
    const tt = req.query.transport_type;
    const all = req.query.all === "1" || req.query.all === "true";
    let q = `SELECT * FROM certificates WHERE user_id = $1`;
    const p = [req.userId];
    if (!all) {
      q += ` AND status = 'active' AND expires_at > NOW()`;
    }
    if (tt) {
      q += ` AND transport_type = $${p.length + 1}`;
      p.push(tt);
    }
    q += ` ORDER BY amount DESC`;
    const { rows } = await pool.query(q, p);
    res.json(rows);
  });

  app.get("/api/certificates/by-code/:code", authMiddleware, async (req, res) => {
    const { rows } = await pool.query(
      `SELECT * FROM certificates WHERE certificate_code = $1 AND user_id = $2`,
      [req.params.code, req.userId]
    );
    res.json(rows[0] || null);
  });

  app.patch("/api/certificates/:id", authMiddleware, express.json(), async (req, res) => {
    const b = req.body || {};
    const { rows } = await pool.query(
      `UPDATE certificates SET
        status = COALESCE($3, status),
        used_at = COALESCE($4, used_at),
        updated_at = NOW()
      WHERE id = $1 AND user_id = $2 RETURNING *`,
      [req.params.id, req.userId, b.status, b.used_at ?? null]
    );
    if (!rows.length) return res.status(404).json({ error: "Not found" });
    res.json(rows[0]);
  });

  // --- 2FA ---
  app.post("/api/2fa/generate-secret", authMiddleware, async (req, res) => {
    const { rows } = await pool.query(
      `SELECT generate_2fa_secret($1::uuid) AS j`,
      [req.userId]
    );
    let j = rows[0]?.j;
    if (typeof j === "string") {
      try {
        j = JSON.parse(j);
      } catch {
        j = {};
      }
    }
    res.json(j && typeof j === "object" ? j : {});
  });

  app.get("/api/2fa/status", authMiddleware, async (req, res) => {
    const { rows } = await pool.query(
      `SELECT enabled FROM user_2fa WHERE user_id = $1`,
      [req.userId]
    );
    res.json({ enabled: rows[0]?.enabled ?? false });
  });

  app.post("/api/2fa/verify-totp", authMiddleware, express.json(), async (req, res) => {
    const { token } = req.body || {};
    if (!token) return res.status(400).json({ error: "token required" });
    const { rows } = await pool.query(
      `SELECT secret, enabled FROM user_2fa WHERE user_id = $1`,
      [req.userId]
    );
    const u = rows[0];
    if (!u?.enabled || !u.secret)
      return res.json({ valid: false, error: "2FA not configured" });
    const valid = authenticator.verify({ token: String(token), secret: u.secret });
    if (valid) {
      await pool.query(
        `UPDATE user_2fa SET last_used_at = NOW(), updated_at = NOW() WHERE user_id = $1`,
        [req.userId]
      );
    }
    res.json({ valid, error: valid ? undefined : "Invalid token" });
  });

  app.post("/api/2fa/enable", authMiddleware, express.json(), async (req, res) => {
    await pool.query(
      `INSERT INTO user_2fa (user_id, secret, enabled, backup_codes)
       VALUES ($1, '', false, ARRAY[]::text[])
       ON CONFLICT (user_id) DO NOTHING`,
      [req.userId]
    );
    await pool.query(
      `UPDATE user_2fa SET enabled = true, updated_at = NOW() WHERE user_id = $1`,
      [req.userId]
    );
    res.json({ ok: true });
  });

  app.post("/api/2fa/disable", authMiddleware, async (req, res) => {
    await pool.query(`SELECT disable_2fa($1::uuid)`, [req.userId]);
    res.json({ ok: true });
  });

  app.post("/api/2fa/use-backup", authMiddleware, express.json(), async (req, res) => {
    const { code } = req.body || {};
    const { rows } = await pool.query(
      `SELECT use_backup_code($1::uuid, $2) AS ok`,
      [req.userId, String(code || "")]
    );
    res.json({ data: rows[0]?.ok ?? false });
  });

  app.post("/api/2fa/profile/send-email", authMiddleware, express.json(), async (req, res) => {
    const { email } = req.body || {};
    if (!email) return res.status(400).json({ error: "email required" });
    const em = String(email).trim().toLowerCase();
    const code = randomDigits(6);
    const exp = new Date(Date.now() + 10 * 60 * 1000);
    await pool.query(
      `INSERT INTO email_otp_challenges (email, code, purpose, expires_at) VALUES ($1, $2, '2fa_profile_setup', $3)`,
      [em, code, exp.toISOString()]
    );
    try {
      await sendEmailOtp(em, code, "2fa_profile_setup");
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message || "Email send failed" });
    }
    res.json({ ok: true });
  });

  app.post("/api/2fa/profile/verify-email", authMiddleware, express.json(), async (req, res) => {
    const { email, code } = req.body || {};
    if (!email || !code)
      return res.status(400).json({ error: "email and code required" });
    const em = String(email).trim().toLowerCase();
    const { rows } = await pool.query(
      `SELECT * FROM email_otp_challenges WHERE email = $1 AND code = $2 AND purpose = '2fa_profile_setup' AND used = false AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1`,
      [em, String(code).trim()]
    );
    if (!rows.length)
      return res.status(400).json({ error: "Invalid or expired code" });
    await pool.query(`UPDATE email_otp_challenges SET used = true WHERE id = $1`, [
      rows[0].id,
    ]);
    res.json({ ok: true });
  });

  // --- Security logs ---
  app.post("/api/logs", express.json({ limit: "32kb" }), async (req, res) => {
    const b = req.body || {};
    try {
      await pool.query(
        `INSERT INTO security_logs (level, message, user_id, ip_address, user_agent, metadata)
         VALUES ($1, $2, $3, $4, $5, $6::jsonb)`,
        [
          b.level || "info",
          String(b.message || "").slice(0, 2000),
          b.user_id || null,
          b.ip_address || null,
          b.user_agent ? String(b.user_agent).slice(0, 500) : null,
          JSON.stringify(b.metadata || {}),
        ]
      );
    } catch (e) {
      console.error("log insert", e);
    }
    res.json({ ok: true });
  });

  app.get("/api/auth/public/profile-by-phone", async (req, res) => {
    const phone = req.query.phone;
    if (!phone) return res.status(400).json({ error: "phone required" });
    const { rows } = await pool.query(
      `SELECT email, user_id, phone FROM user_profiles WHERE phone = $1 LIMIT 1`,
      [String(phone)]
    );
    res.json(rows[0] || null);
  });

  app.post("/api/auth/match-profiles-last10", express.json(), async (req, res) => {
    const last10 = String(req.body?.last10 || "")
      .replace(/\D/g, "")
      .slice(-10);
    if (last10.length < 10) return res.json({ matches: [] });
    const { rows } = await pool.query(
      `SELECT email, user_id, phone FROM user_profiles
       WHERE length(regexp_replace(COALESCE(phone,''), '[^0-9]', '', 'g')) >= 10
       AND right(regexp_replace(COALESCE(phone,''), '[^0-9]', '', 'g'), 10) = $1`,
      [last10]
    );
    res.json({ matches: rows });
  });

  // --- OTP SMS count (optional; client may skip) ---
  app.get("/api/auth/sms/count-recent", async (req, res) => {
    const phone = req.query.phone;
    if (!phone) return res.status(400).json({ error: "phone required" });
    const normalized = normalizePhoneE164(String(phone));
    const digits = normalized.replace(/\D/g, "");
    const phoneWithPlus = "+" + digits;
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { rows } = await pool.query(
      `SELECT id FROM verification_codes WHERE (phone = $1 OR phone = $2 OR phone LIKE $3) AND created_at >= $4`,
      [phoneWithPlus, digits, `%${digits.slice(-10)}`, oneHourAgo]
    );
    res.json({ count: rows.length });
  });

  registerBlogPublicRoutes(app);
  registerRoutePublicRoutes(app);
  registerAdminRoutes(app);
}
