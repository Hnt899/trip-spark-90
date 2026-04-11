/**
 * Применяет schema.sql + все миграции из postgres/migrations/ по порядку.
 * Безопасно запускать повторно — все CREATE TABLE используют IF NOT EXISTS,
 * ALTER TABLE использует IF NOT EXISTS для колонок.
 *
 * Вызывается автоматически при старте Railway (см. railway.json).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../server/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

async function run() {
  const client = await pool.connect();
  try {
    const schemaPath = path.join(ROOT, "postgres", "schema.sql");
    if (fs.existsSync(schemaPath)) {
      console.log("[migrate] applying schema.sql …");
      await client.query(fs.readFileSync(schemaPath, "utf8"));
      console.log("[migrate] schema.sql ✓");
    }

    const migrDir = path.join(ROOT, "postgres", "migrations");
    if (fs.existsSync(migrDir)) {
      const files = fs
        .readdirSync(migrDir)
        .filter((f) => f.endsWith(".sql"))
        .sort();

      for (const f of files) {
        console.log(`[migrate] applying ${f} …`);
        const sql = fs.readFileSync(path.join(migrDir, f), "utf8");
        await client.query(sql);
        console.log(`[migrate] ${f} ✓`);
      }
    }

    console.log("[migrate] done!");
  } finally {
    client.release();
    await pool.end();
  }
}

run().catch((e) => {
  console.error("[migrate] FAILED:", e);
  process.exit(1);
});
