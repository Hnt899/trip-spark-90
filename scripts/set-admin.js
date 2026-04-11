/**
 * Назначить или снять права администратора у пользователя по email.
 *
 * Рекомендуется (на Windows npm иногда «съедает» --grant):
 *   npm run set-admin -- grant email@example.com
 *   npm run set-admin -- revoke email@example.com
 *
 * Также:
 *   npm run set-admin -- email@example.com grant
 *   node scripts/set-admin.js grant email@example.com
 *   npm run set-admin -- email@example.com -- --grant
 */

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const raw = process.argv.slice(2);
const emailArg = raw.find((a) => String(a).includes("@"));

let grant = raw.includes("--grant");
let revoke = raw.includes("--revoke");

if (raw[0] === "grant") grant = true;
if (raw[0] === "revoke") revoke = true;

const emailIdx = raw.findIndex((a) => String(a).includes("@"));
if (emailIdx !== -1) {
  const next = raw[emailIdx + 1];
  if (next === "grant") grant = true;
  if (next === "revoke") revoke = true;
}

if (!emailArg || (!grant && !revoke) || (grant && revoke)) {
  console.error(`
Использование (на Windows лучше слово grant/revoke вместо флага --grant):
  npm run set-admin -- grant email@example.com
  npm run set-admin -- revoke email@example.com

Альтернатива:
  npm run set-admin -- email@example.com grant
  npm run set-admin -- email@example.com -- --grant
`);
  process.exit(1);
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("В .env не задан DATABASE_URL.");
  process.exit(1);
}

const normalizedEmail = emailArg.trim().toLowerCase();
const pool = new pg.Pool({ connectionString: databaseUrl });

try {
  const r = await pool.query(
    `UPDATE users SET is_admin = $2, updated_at = NOW() WHERE email = $1 RETURNING id, email, is_admin`,
    [normalizedEmail, grant]
  );
  if (r.rowCount === 0) {
    console.error(`Пользователь "${normalizedEmail}" не найден.`);
    process.exit(1);
  }
  console.log(grant ? "Права администратора выданы:" : "Права администратора сняты:", r.rows[0]);
  console.log("Перелогиньтесь на сайте, чтобы обновился JWT.");
} catch (e) {
  console.error(e.message || e);
  process.exit(1);
} finally {
  await pool.end();
}
