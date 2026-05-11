import bcrypt from "bcryptjs";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { onQuery, poolMock, resetPgMock } from "../mocks/pgMock";

vi.mock("../../db.js", () => ({ pool: poolMock }));
vi.mock("../../sendSms.js", () => ({ sendExolveSms: vi.fn(async () => ({ success: true })) }));
vi.mock("../../emailOtp.js", () => ({ sendEmailOtp: vi.fn(async () => undefined) }));

const checkoutCreate = vi.fn().mockResolvedValue({
  id: "cs_test_123",
  url: "https://checkout.stripe.com/c/pay/cs_test_123",
});

vi.mock("stripe", () => ({
  default: class MockStripe {
    checkout: { sessions: { create: typeof checkoutCreate } };
    webhooks: { constructEvent: () => ({ type: "checkout.session.completed", data: {} }) };
    constructor() {
      this.checkout = { sessions: { create: checkoutCreate } };
      this.webhooks = {
        constructEvent: vi.fn(),
      };
    }
  },
}));

describe("checkout / Stripe", () => {
  let passwordHash = "";

  beforeEach(async () => {
    resetPgMock();
    passwordHash = await bcrypt.hash("secret", 6);
    process.env.SKIP_WEBPAY = "0";
    process.env.STRIPE_SECRET_KEY = "sk_test_mock";
    checkoutCreate.mockClear();
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

  it("SKIP_WEBPAY: помечает билет оплаченным без Stripe", async () => {
    process.env.SKIP_WEBPAY = "1";
    onQuery(/UPDATE tickets SET/, () => ({ rows: [{ id: "t-1" }], rowCount: 1 }));
    const { app, token } = await getAuth();
    const res = await request(app)
      .post("/api/webpay-create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        ticket_id: "t-1",
        order_number: "T500",
        total_price: 4999.99,
        customer_id: "u-1",
        base_url: "http://localhost:5173",
      });

    expect(res.status).toBe(200);
    expect(res.body.skip_webpay).toBe(true);
    expect(res.body.order_number).toBe("T500");
    process.env.SKIP_WEBPAY = "0";
  });

  it("отклоняет нулевую total_price", async () => {
    const { app, token } = await getAuth();
    const res = await request(app)
      .post("/api/webpay-create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        ticket_id: "t-1",
        order_number: "T501",
        total_price: 0,
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/total_price must be positive/i);
  });

  it("503 если Stripe не настроен", async () => {
    delete process.env.STRIPE_SECRET_KEY;
    const { app, token } = await getAuth();
    const res = await request(app)
      .post("/api/webpay-create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        ticket_id: "t-1",
        order_number: "T502",
        total_price: 100,
        base_url: "http://localhost:5173",
      });

    expect(res.status).toBe(503);
    expect(String(res.body.error)).toMatch(/STRIPE_SECRET_KEY/i);
  });

  it("возвращает url Stripe Checkout при настроенном ключе", async () => {
    process.env.STRIPE_SECRET_KEY = "sk_test_mock";
    onQuery(/UPDATE tickets SET payment_method = 'stripe'/, () => ({ rows: [], rowCount: 1 }));
    const { app, token } = await getAuth();
    const res = await request(app)
      .post("/api/webpay-create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        ticket_id: "11111111-1111-1111-1111-111111111111",
        order_number: "T503",
        total_price: 1500,
        base_url: "http://localhost:5173",
      });

    expect(res.status).toBe(200);
    expect(res.body.url).toMatch(/^https:\/\/checkout\.stripe\.com\//);
    expect(res.body.order_number).toBe("T503");
    expect(checkoutCreate).toHaveBeenCalled();
  });
});
