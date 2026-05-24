import bcrypt from "bcryptjs";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { onQuery, poolMock, resetPgMock } from "../mocks/pgMock";

vi.mock("../../db.js", () => ({ pool: poolMock }));
vi.mock("../../sendSms.js", () => ({ sendExolveSms: vi.fn(async () => ({ success: true })) }));
vi.mock("../../emailOtp.js", () => ({ sendEmailOtp: vi.fn(async () => undefined) }));

describe("auth api", () => {
  beforeEach(() => {
    resetPgMock();
  });

  it("registers via email otp verification for new user", async () => {
    const email = "new-user@test.dev";

    onQuery(/SELECT \* FROM email_otp_challenges/, () => ({
      rows: [{ id: "otp-1", email, code: "123456", used: false }],
    }));
    onQuery(/UPDATE email_otp_challenges SET used = true/, () => ({ rows: [], rowCount: 1 }));
    onQuery(/SELECT \* FROM users WHERE email = \$1/, () => ({ rows: [] }));
    onQuery(/INSERT INTO users/, () => ({
      rows: [{ id: "u-1", email, raw_user_meta: { has_password: false }, is_admin: false }],
    }));

    const { createTestApp } = await import("../mocks/createTestApp");
    const app = await createTestApp();

    const res = await request(app)
      .post("/api/auth/email/verify-otp")
      .send({ email, token: "123456", isRegistration: true });

    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(email);
    expect(res.body.access_token).toBeTruthy();
  });

  it("rejects invalid otp for registration/login", async () => {
    onQuery(/SELECT \* FROM email_otp_challenges/, () => ({ rows: [] }));

    const { createTestApp } = await import("../mocks/createTestApp");
    const app = await createTestApp();

    const res = await request(app)
      .post("/api/auth/email/verify-otp")
      .send({ email: "new-user@test.dev", token: "000000", isRegistration: true });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Invalid or expired code/i);
  });

  it("logs in with valid password and returns access token", async () => {
    const passwordHash = await bcrypt.hash("secret", 6);
    onQuery(/SELECT \* FROM users WHERE email = \$1/, () => ({
      rows: [
        {
          id: "u-1",
          email: "user@test.dev",
          password_hash: passwordHash,
          raw_user_meta: {},
          is_admin: false,
        },
      ],
    }));
    onQuery(/SELECT is_2fa_enabled/, () => ({ rows: [{ en: false }] }));

    const { createTestApp } = await import("../mocks/createTestApp");
    const app = await createTestApp();

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "user@test.dev", password: "secret" });

    expect(res.status).toBe(200);
    expect(res.body.access_token).toBeTruthy();
    expect(res.body.user.email).toBe("user@test.dev");
  });

  it("returns 401 for wrong password", async () => {
    const passwordHash = await bcrypt.hash("secret", 6);
    onQuery(/SELECT \* FROM users WHERE email = \$1/, () => ({
      rows: [{ id: "u-1", email: "user@test.dev", password_hash: passwordHash, raw_user_meta: {}, is_admin: false }],
    }));

    const { createTestApp } = await import("../mocks/createTestApp");
    const app = await createTestApp();

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "user@test.dev", password: "bad-password" });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Invalid login credentials");
  });

  it("returns 401 for unknown user", async () => {
    onQuery(/SELECT \* FROM users WHERE email = \$1/, () => ({ rows: [] }));

    const { createTestApp } = await import("../mocks/createTestApp");
    const app = await createTestApp();

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "missing@test.dev", password: "secret" });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Invalid login credentials");
  });
});
