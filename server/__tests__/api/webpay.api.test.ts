import bcrypt from "bcryptjs";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { onQuery, poolMock, resetPgMock } from "../mocks/pgMock";

vi.mock("../../db.js", () => ({ pool: poolMock }));
vi.mock("../../sendSms.js", () => ({ sendExolveSms: vi.fn(async () => ({ success: true })) }));
vi.mock("../../emailOtp.js", () => ({ sendEmailOtp: vi.fn(async () => undefined) }));

const fetchMock = vi.fn();
vi.mock("node-fetch", () => ({
  default: fetchMock,
}));

describe("checkout / ЮKassa", () => {
  let passwordHash = "";

  beforeEach(async () => {
    resetPgMock();
    passwordHash = await bcrypt.hash("secret", 6);
    process.env.SKIP_WEBPAY = "0";
    process.env.YOOKASSA_SHOP_ID = "test_shop";
    process.env.YOOKASSA_SECRET_KEY = "test_secret";
    fetchMock.mockReset();
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

  it("SKIP_WEBPAY: помечает билет оплаченным без ЮKassa", async () => {
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

  it("503 если ЮKassa не настроена", async () => {
    delete process.env.YOOKASSA_SECRET_KEY;
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
    expect(String(res.body.error)).toMatch(/YOOKASSA/i);
  });

  it("возвращает URL ЮKassa при успешном создании платежа", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: "pay_yoo_1",
        status: "pending",
        confirmation: {
          confirmation_url: "https://yoomoney.ru/checkout/payments/v2/contract?orderId=123",
        },
      }),
    });
    onQuery(/UPDATE tickets SET payment_transaction_id =/, () => ({ rows: [], rowCount: 1 }));
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
    expect(res.body.url).toMatch(/^https:\/\/yoomoney\.ru\//);
    expect(res.body.order_number).toBe("T503");
    expect(res.body.payment_id).toBe("pay_yoo_1");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("sync-payment: помечает билет paid после подтверждения в ЮKassa", async () => {
    onQuery(/SELECT \* FROM tickets WHERE order_number = \$1 AND user_id = \$2 LIMIT 1/, () => ({
      rows: [
        {
          id: "11111111-1111-1111-1111-111111111111",
          order_number: "T600",
          user_id: "u-1",
          payment_status: "pending",
          payment_transaction_id: "pay_yoo_2",
        },
      ],
    }));
    onQuery(/UPDATE tickets SET payment_status = \$2/, () => ({ rows: [], rowCount: 1 }));

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: "pay_yoo_2",
        status: "succeeded",
        metadata: { order_number: "T600", user_id: "u-1" },
      }),
    });

    const { app, token } = await getAuth();
    const res = await request(app)
      .post("/api/yookassa-sync-payment")
      .set("Authorization", `Bearer ${token}`)
      .send({ order_number: "T600" });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("paid");
  });

  it("user refund: возврат своего билета через ЮKassa", async () => {
    onQuery(/SELECT \* FROM tickets WHERE id = \$1::uuid AND user_id = \$2::uuid/, () => ({
      rows: [
        {
          id: "11111111-1111-1111-1111-111111111111",
          order_number: "T701",
          user_id: "u-1",
          payment_method: "yookassa",
          payment_status: "paid",
          payment_transaction_id: "pay_yoo_4",
          total_price: "900",
          order_status: "active",
          payment_raw: {},
        },
      ],
    }));
    onQuery(/UPDATE tickets SET/, () => ({ rows: [], rowCount: 1 }));

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "rfnd_2", status: "succeeded" }),
    });

    const { app, token } = await getAuth();
    const res = await request(app)
      .post("/api/tickets/11111111-1111-1111-1111-111111111111/refund")
      .set("Authorization", `Bearer ${token}`)
      .send({ amount: 810 });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.refund_amount).toBe("810.00");
  });

  it("admin refund: создаёт возврат и обновляет ticket", async () => {
    onQuery(/SELECT is_admin FROM users WHERE id = \$1/, () => ({ rows: [{ is_admin: true }] }));
    onQuery(/SELECT \* FROM tickets WHERE id = \$1::uuid/, () => ({
      rows: [
        {
          id: "11111111-1111-1111-1111-111111111111",
          order_number: "T700",
          payment_method: "yookassa",
          payment_status: "paid",
          payment_transaction_id: "pay_yoo_3",
          total_price: "1200",
          payment_raw: {},
        },
      ],
    }));
    onQuery(/UPDATE tickets SET payment_status = \$2/, () => ({ rows: [], rowCount: 1 }));

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: "rfnd_1",
        status: "succeeded",
      }),
    });

    const { app, token } = await getAuth();
    const res = await request(app)
      .post("/api/admin/tickets/11111111-1111-1111-1111-111111111111/refund")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.refund?.id).toBe("rfnd_1");
  });
});
