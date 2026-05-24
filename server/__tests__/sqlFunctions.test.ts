import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import bcrypt from "bcryptjs";

import { onQuery, resetPgMock, poolMock } from "./mocks/pgMock";

vi.mock("../db.js", () => ({ pool: poolMock }));
vi.mock("../sendSms.js", () => ({ sendExolveSms: vi.fn(async () => ({ success: true })) }));
vi.mock("../emailOtp.js", () => ({ sendEmailOtp: vi.fn(async () => undefined) }));

describe("sql-backed rpc endpoints", () => {
  let passwordHash = "";

  beforeEach(() => {
    resetPgMock();
  });

  beforeEach(async () => {
    passwordHash = await bcrypt.hash("secret", 6);
  });

  it("calls create_certificate SQL function", async () => {
    onQuery(/SELECT \* FROM users WHERE email = \$1/, () => ({
      rows: [{ id: "u-1", email: "user@test.dev", password_hash: passwordHash, raw_user_meta: {}, is_admin: false }],
    }));
    onQuery(/SELECT is_2fa_enabled/, () => ({ rows: [{ en: false }] }));
    onQuery(/SELECT \* FROM create_certificate/, () => ({
      rows: [{ id: "c1", certificate_code: "0000000001", amount: "500.00", expires_at: new Date().toISOString() }],
    }));

    const { createTestApp } = await import("./mocks/createTestApp");
    const app = await createTestApp();
    const login = await request(app).post("/api/auth/login").send({ email: "user@test.dev", password: "secret" });
    const token = login.body.access_token;

    const res = await request(app)
      .post("/api/rpc/create_certificate")
      .set("Authorization", `Bearer ${token}`)
      .send({ p_transport_type: "train", p_amount: 500 });

    expect(res.status).toBe(200);
    expect(res.body.certificate_code).toBe("0000000001");
    expect(poolMock.query).toHaveBeenCalledWith(
      expect.stringMatching(/create_certificate/),
      expect.any(Array),
    );
  });

  it("calls expire_old_certificates SQL function", async () => {
    onQuery(/SELECT \* FROM users WHERE email = \$1/, () => ({
      rows: [{ id: "u-1", email: "user@test.dev", password_hash: passwordHash, raw_user_meta: {}, is_admin: false }],
    }));
    onQuery(/SELECT is_2fa_enabled/, () => ({ rows: [{ en: false }] }));
    onQuery(/SELECT expire_old_certificates\(\)/, () => ({ rows: [] }));

    const { createTestApp } = await import("./mocks/createTestApp");
    const app = await createTestApp();
    const login = await request(app).post("/api/auth/login").send({ email: "user@test.dev", password: "secret" });
    const token = login.body.access_token;

    const res = await request(app)
      .post("/api/rpc/expire_old_certificates")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(poolMock.query).toHaveBeenCalledWith(expect.stringMatching(/expire_old_certificates/));
  });
});
