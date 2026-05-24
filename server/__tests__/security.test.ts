import express from "express";
import request from "supertest";
import rateLimit from "express-rate-limit";
import { describe, expect, it } from "vitest";

describe("security middleware", () => {
  it("applies rate-limit after max requests", async () => {
    const app = express();
    app.set("trust proxy", 1);
    app.use(
      "/api",
      rateLimit({
        windowMs: 60_000,
        max: 2,
        message: { error: "Too many requests" },
        standardHeaders: true,
        legacyHeaders: false,
      }),
    );
    app.get("/api/test", (_req, res) => res.json({ ok: true }));

    const r1 = await request(app).get("/api/test");
    const r2 = await request(app).get("/api/test");
    const r3 = await request(app).get("/api/test");

    expect(r1.status).toBe(200);
    expect(r2.status).toBe(200);
    expect(r3.status).toBe(429);
    expect(r3.body).toEqual({ error: "Too many requests" });
  });
});
