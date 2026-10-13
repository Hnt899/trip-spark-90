import { Router } from "express";
import multer from "multer";
import crypto from "crypto";
import path from "path";
import fs from "fs";
import sharp from "sharp";
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

const ALLOWED_DOC_MIME = new Set(["application/pdf"]);
const ALLOWED_MIME = new Set([...ALLOWED_IMAGE_MIME, ...ALLOWED_VIDEO_MIME, ...ALLOWED_DOC_MIME]);

const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME.has(file.mimetype)) {
      return cb(new Error("Only image, video or PDF files are allowed"));
    }
    cb(null, true);
  },
});

const router = Router();

// РћР±СЂР°Р±РѕС‚РєР° РёР·РѕР±СЂР°Р¶РµРЅРёР№ РґР»СЏ РјР°СЂС€СЂСѓС‚РѕРІ: РѕР±СЂРµР·Р°С‚СЊ/СЂР°СЃС‚СЏРЅСѓС‚СЊ РґРѕ 896x560
async function processRouteImage(inputPath, outputPath) {
  await sharp(inputPath)
    .resize(896, 560, {
      fit: "cover",
      position: "center",
    })
    .toFile(outputPath);
}

router.post(
  "/api/upload/route",
  adminMiddleware,
  upload.array("files", 20),
  async (req, res) => {
    const files = req.files || [];
    
    const urls = [];
    
    for (const file of files) {
      if (ALLOWED_IMAGE_MIME.has(file.mimetype)) {
        // РћР±СЂР°Р±Р°С‚С‹РІР°РµРј РёР·РѕР±СЂР°Р¶РµРЅРёРµ: РѕР±СЂРµР·Р°РµРј/СЂР°СЃС‚СЏРіРёРІР°РµРј РґРѕ 896x560
        const ext = path.extname(file.filename);
        const processedFilename = `route_${crypto.randomUUID()}${ext}`;
        const processedPath = path.join(UPLOAD_DIR, processedFilename);
        
        try {
          await processRouteImage(file.path, processedPath);
          // РЈРґР°Р»СЏРµРј РѕСЂРёРіРёРЅР°Р»
          fs.unlinkSync(file.path);
          urls.push(`/uploads/${processedFilename}`);
        } catch (err) {
          console.error("Error processing route image:", err);
          // Р•СЃР»Рё РѕС€РёР±РєР° РѕР±СЂР°Р±РѕС‚РєРё, РёСЃРїРѕР»СЊР·СѓРµРј РѕСЂРёРіРёРЅР°Р»
          urls.push(`/uploads/${file.filename}`);
        }
      } else {
        // Р’РёРґРµРѕ РёР»Рё РґСЂСѓРіРёРµ С„Р°Р№Р»С‹ РѕСЃС‚Р°РІР»СЏРµРј РєР°Рє РµСЃС‚СЊ
        urls.push(`/uploads/${file.filename}`);
      }
    }
    
    res.json({ urls });
  },
);

// РЎС‚Р°СЂС‹Р№ СЌРЅРґРїРѕРёРЅС‚ РґР»СЏ РѕСЃС‚Р°Р»СЊРЅС‹С… Р·Р°РіСЂСѓР·РѕРє (Р±РµР· РѕР±СЂР°Р±РѕС‚РєРё)
router.post(
  "/api/upload",
  adminMiddleware,
  upload.array("files", 20),
  (req, res) => {
    const files = req.files || [];
    const urls = files.map((f) => `/uploads/${f.filename}`);
    res.json({ urls });
  },
);

router.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        error: "Р¤Р°Р№Р» СЃР»РёС€РєРѕРј Р±РѕР»СЊС€РѕР№. РњР°РєСЃРёРјСѓРј 200 РњР‘ РґР»СЏ РІРёРґРµРѕ/РёР·РѕР±СЂР°Р¶РµРЅРёР№.",
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
