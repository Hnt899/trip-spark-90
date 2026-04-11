/**
 * Создаёт пользователя в PostgreSQL для входа на сайт (email + пароль).
 *
 * Использование:
 *   npm run create-user -- email@example.com ВашПароль
 *
 * Если такой email уже есть — скрипт завершится с ошибкой.
 * Чтобы сбросить пароль существующему пользователю:
 *   npm run create-user -- email@example.com НовыйПароль --reset
 *
 * Администратор (доступ к /admin):
 *   npm run create-user -- email@example.com Пароль --admin
 *   npm run create-user -- email@example.com НовыйПароль --reset --admin
 *
 * Требуется DATABASE_URL в файле .env в корне проекта.
 */

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import bcrypt from "bcryptjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const reset = process.argv.includes("--reset");
const makeAdmin = process.argv.includes("--admin");
const args = process.argv.slice(2).filter((a) => a !== "--reset" && a !== "--admin");
const email = args[0];
const password = args[1];

if (!email || !password) {
  console.error(`
Укажите почту и пароль:

  npm run create-user -- you@mail.com ваш_пароль

Сброс пароля, если пользователь уже есть:

  npm run create-user -- you@mail.com новый_пароль --reset
`);
  process.exit(1);
}

if (password.length < 6) {
  console.error("Пароль должен быть не короче 6 символов.");
  process.exit(1);
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("В .env не задан DATABASE_URL.");
  process.exit(1);
}

const normalizedEmail = email.trim().toLowerCase();
const pool = new pg.Pool({ connectionString: databaseUrl });

async function main() {
  const passwordHash = await bcrypt.hash(password, 10);
  const meta = JSON.stringify({ has_password: true });

  if (reset) {
    const u = await pool.query(
      `UPDATE users SET password_hash = $2, raw_user_meta = raw_user_meta || $3::jsonb,
         is_admin = CASE WHEN $4::boolean THEN true ELSE is_admin END, updated_at = NOW()
       WHERE email = $1
       RETURNING id, email, is_admin`,
      [normalizedEmail, passwordHash, meta, makeAdmin]
    );
    if (u.rowCount === 0) {
      console.error(`Пользователь с email "${normalizedEmail}" не найден. Создайте без --reset.`);
      process.exit(1);
    }
    await pool.query(
      `INSERT INTO user_profiles (user_id, email) VALUES ($1, $2)
       ON CONFLICT (user_id) DO UPDATE SET email = COALESCE(user_profiles.email, EXCLUDED.email)`,
      [u.rows[0].id, normalizedEmail]
    );
    console.log("Пароль обновлён:", u.rows[0]);
    return;
  }

  try {
    const r = await pool.query(
      `INSERT INTO users (email, password_hash, raw_user_meta, is_admin)
       VALUES ($1, $2, $3::jsonb, $4)
       RETURNING id, email, created_at, is_admin`,
      [normalizedEmail, passwordHash, meta, makeAdmin]
    );
    const row = r.rows[0];
    await pool.query(
      `INSERT INTO user_profiles (user_id, email) VALUES ($1, $2)
       ON CONFLICT (user_id) DO UPDATE SET email = COALESCE(user_profiles.email, EXCLUDED.email)`,
      [row.id, normalizedEmail]
    );
    console.log("Пользователь создан. Вход на сайте: почта + этот пароль.");
    console.log(row);
  } catch (e) {
    if (e.code === "23505") {
      console.error(
        `Email "${normalizedEmail}" уже занят. Используйте другой email или:\n  npm run create-user -- ${normalizedEmail} новый_пароль --reset`
      );
      process.exit(1);
    }
    throw e;
  }
}

try {
  await main();
} catch (e) {
  console.error(e.message || e);
  process.exit(1);
} finally {
  await pool.end();
}
