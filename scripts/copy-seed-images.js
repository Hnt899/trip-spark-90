/**
 * Копирует обложки из src/assets/ в uploads/ при старте сервера на Railway.
 * Не перезаписывает существующие файлы.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const UPLOAD_DIR = path.resolve(ROOT, "uploads");

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const imageMap = {
  "train-interior.jpg": "src/assets/images/transport/train-interior.jpg",
  "сапсан.jpeg": "src/assets/images/transport/сапсан.jpeg",
  "байкал1.jpg": "src/assets/images/routes/байкал1.jpg",
  "маршруты.png": "src/assets/images/features/маршруты.png",
  "интерфейс.png": "src/assets/images/features/интерфейс.png",
  "инфаструктура.png": "src/assets/images/features/инфаструктура.png",
  "moscow.jpg": "src/assets/images/cities/moscow.jpg",
  "скидка.png": "src/assets/images/features/скидка.png",
  "калиниград-1.jpg": "src/assets/images/routes/калиниград 1.jpg",
  "владивосток-1.jpg": "src/assets/images/routes/владивосток 1.jpg",
  "karelia.jpg": "src/assets/images/cities/karelia.jpg",
  "hero-train.jpg": "src/assets/images/hero/hero-train.jpg",
  "saint-petersburg.jpg": "src/assets/images/cities/saint-petersburg.jpg",
  "kazan.jpg": "src/assets/images/cities/kazan.jpg",
  "novgorod.jpg": "src/assets/images/cities/novgorod.jpg",
  "лояльность.png": "src/assets/images/features/лояльность.png",
  "россия-м.png": "src/assets/images/features/россия м.png",
  "приложение.png": "src/assets/images/features/приложение.png",
  "armenia.jpg": "src/assets/images/cities/armenia.jpg",
  "china.jpg": "src/assets/images/cities/china.jpg",
};

let copied = 0;
for (const [destName, srcRel] of Object.entries(imageMap)) {
  const dest = path.join(UPLOAD_DIR, destName);
  if (fs.existsSync(dest)) continue;
  const src = path.resolve(ROOT, srcRel);
  if (!fs.existsSync(src)) {
    console.log(`[images] skip: ${srcRel} not found`);
    continue;
  }
  fs.copyFileSync(src, dest);
  copied++;
}
console.log(`[images] ${copied} seed images copied to uploads/`);
