import { Router } from "express";
import multer from "multer";
import crypto from "crypto";
import path from "path";
import fs from "fs";
import { adminMiddleware } from "./authMiddleware.js";

const UPLOAD_DIR = path.resolve("uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || ".bin";
    const name = crypto.randomUUID() + ext;
    cb(null, name);
  },
});

const ALLOWED_IMAGE_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "image/avif",
]);

const ALLOWED_VIDEO_MIME = new Set([
  "video/mp4",
  "video/webm",
  "video/quicktime",
]);

const ALLOWED_MIME = new Set([...ALLOWED_IMAGE_MIME, ...ALLOWED_VIDEO_MIME]);

const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME.has(file.mimetype)) {
      return cb(new Error("Only image or video files are allowed"));
    }
    cb(null, true);
  },
});

const router = Router();

router.post(
  "/api/upload",
  adminMiddleware,
  upload.array("files", 20),
  (req, res) => {
    const files = /** @type {Express.Multer.File[]} */ (req.files) || [];
    const urls = files.map((f) => `/uploads/${f.filename}`);
    res.json({ urls });
  },
);

router.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        error: "Файл слишком большой. Максимум 200 МБ для видео/изображений.",
      });
    }
    return res.status(400).json({ error: err.message });
  }
  if (err?.message) {
    return res.status(400).json({ error: err.message });
  }
  res.status(500).json({ error: "Upload failed" });
});

export { router as uploadRouter, UPLOAD_DIR };
