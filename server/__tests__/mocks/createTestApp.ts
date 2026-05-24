import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

export async function createTestApp() {
  const app = express();
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "1mb" }));
  app.use(
    "/api",
    rateLimit({
      windowMs: 60_000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  const { registerApiRoutes } = await import("../../registerApiRoutes.js");
  registerApiRoutes(app);
  app.get("/api/ping", (_req, res) => res.json({ ok: true }));
  return app;
}
