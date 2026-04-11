import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const { Pool } = pg;

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error(
    "[db] В .env не задан DATABASE_URL (или .env загружается слишком поздно)."
  );
}

export const pool = new Pool({
  connectionString: databaseUrl,
  max: 20,
});
