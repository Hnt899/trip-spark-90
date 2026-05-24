import bcrypt from "bcryptjs";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { onQuery, poolMock, resetPgMock } from "../mocks/pgMock";

vi.mock("../../db.js", () => ({ pool: poolMock }));
vi.mock("../../sendSms.js", () => ({ sendExolveSms: vi.fn(async () => ({ success: true })) }));
vi.mock("../../emailOtp.js", () => ({ sendEmailOtp: vi.fn(async () => undefined) }));

describe("tickets api", () => {
  let passwordHash = "";

  beforeEach(async () => {
    resetPgMock();
    passwordHash = await bcrypt.hash("secret", 6);
  });

  async function getAuth() {
    onQuery(/SELECT \* FROM users WHERE email = \$1/, () => ({
      rows: [{ id: "u-1", email: "user@test.dev", password_hash: passwordHash, raw_user_meta: {}, is_admin: false }],
    }));
    onQuery(/SELECT is_2fa_enabled/, () => ({ rows: [{ en: false }] }));
    const { createTestApp } = await import("../mocks/createTestApp");
    const app = await createTestApp();
    const login = await request(app).post("/api/auth/login").send({ email: "user@test.dev", password: "secret" });
    return { app, token: login.body.access_token as string };
  }

  it("creates ticket with valid data", async () => {
    onQuery(/INSERT INTO tickets/, (_sql, params) => ({
      rows: [
        {
          id: "t-1",
          user_id: params?.[0],
          order_number: params?.[1],
          transport_type: params?.[2],
          total_price: params?.[3],
        },
      ],
    }));

    const { app, token } = await getAuth();
    const res = await request(app)
      .post("/api/tickets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        order_number: "T100",
        transport_type: "train",
        total_price: 1200,
        tickets_data: [{ seat: "1A" }],
        from_city: "Москва",
        to_city: "Санкт-Петербург",
        departure_date: "2026-06-01",
      });

    expect(res.status).toBe(200);
    expect(res.body.order_number).toBe("T100");
    expect(res.body.transport_type).toBe("train");
  });

  it("rejects ticket creation without auth", async () => {
    const { createTestApp } = await import("../mocks/createTestApp");
    const app = await createTestApp();
    const res = await request(app).post("/api/tickets").send({
      order_number: "T-no-auth",
      transport_type: "train",
      total_price: 1000,
    });

    expect(res.status).toBe(401);
  });

  it("returns current user's tickets list", async () => {
    onQuery(/SELECT \* FROM tickets WHERE user_id = \$1 ORDER BY created_at DESC/, () => ({
      rows: [
        { id: "t-1", order_number: "T101", transport_type: "train", total_price: 1000 },
        { id: "t-2", order_number: "T102", transport_type: "bus", total_price: 900 },
      ],
    }));

    const { app, token } = await getAuth();
    const res = await request(app)
      .get("/api/tickets")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(2);
  });
});
