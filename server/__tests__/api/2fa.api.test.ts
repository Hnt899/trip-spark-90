import bcrypt from "bcryptjs";
import request from "supertest";
import { authenticator } from "otplib";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { onQuery, poolMock, resetPgMock } from "../mocks/pgMock";
import { signPre2faToken } from "../../authMiddleware.js";

const sendEmailOtpMock = vi.fn(async () => undefined);

vi.mock("../../db.js", () => ({ pool: poolMock }));
vi.mock("../../sendSms.js", () => ({ sendExolveSms: vi.fn(async () => ({ success: true })) }));
vi.mock("../../emailOtp.js", () => ({ sendEmailOtp: sendEmailOtpMock }));

describe("2fa api", () => {
  let passwordHash = "";

  beforeEach(async () => {
    resetPgMock();
    sendEmailOtpMock.mockClear();
    passwordHash = await bcrypt.hash("secret", 6);
  });

  async function loginAndApp() {
    onQuery(/SELECT \* FROM users WHERE email = \$1/, () => ({
      rows: [{ id: "u-1", email: "user@test.dev", password_hash: passwordHash, raw_user_meta: {}, is_admin: false }],
    }));
    onQuery(/SELECT is_2fa_enabled/, () => ({ rows: [{ en: false }] }));
    const { createTestApp } = await import("../mocks/createTestApp");
    const app = await createTestApp();
    const login = await request(app).post("/api/auth/login").send({ email: "user@test.dev", password: "secret" });
    return { app, token: login.body.access_token as string };
  }

  it("generates 2fa secret and backup codes", async () => {
    onQuery(/SELECT generate_2fa_secret/, () => ({
      rows: [{ j: { secret: "BASE32SECRET3232", backup_codes: ["A1", "A2"] } }],
    }));
    const { app, token } = await loginAndApp();

    const res = await request(app).post("/api/2fa/generate-secret").set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.secret).toBe("BASE32SECRET3232");
    expect(res.body.backup_codes).toEqual(["A1", "A2"]);
  });

  it("verifies totp token when 2fa enabled", async () => {
    const secret = authenticator.generateSecret();
    const totp = authenticator.generate(secret);
    onQuery(/SELECT secret, enabled FROM user_2fa WHERE user_id = \$1/, () => ({
      rows: [{ secret, enabled: true }],
    }));
    onQuery(/UPDATE user_2fa SET last_used_at = NOW\(\), updated_at = NOW\(\) WHERE user_id = \$1/, () => ({
      rows: [],
      rowCount: 1,
    }));

    const { app, token } = await loginAndApp();
    const res = await request(app)
      .post("/api/2fa/verify-totp")
      .set("Authorization", `Bearer ${token}`)
      .send({ token: totp });

    expect(res.status).toBe(200);
    expect(res.body.valid).toBe(true);
  });

  it("uses backup code successfully", async () => {
    onQuery(/SELECT use_backup_code/, () => ({ rows: [{ ok: true }] }));
    const { app, token } = await loginAndApp();
    const res = await request(app)
      .post("/api/2fa/use-backup")
      .set("Authorization", `Bearer ${token}`)
      .send({ code: "A1" });

    expect(res.status).toBe(200);
    expect(res.body.data).toBe(true);
  });

  it("supports pre-2fa login verification flow", async () => {
    const preToken = signPre2faToken("u-1", "user@test.dev");
    onQuery(/SELECT \* FROM email_otp_challenges WHERE email = \$1 AND code = \$2 AND purpose = '2fa_login'/, () => ({
      rows: [{ id: "otp-2fa" }],
    }));
    onQuery(/UPDATE email_otp_challenges SET used = true WHERE id = \$1/, () => ({ rows: [], rowCount: 1 }));
    onQuery(/SELECT \* FROM users WHERE id = \$1/, () => ({
      rows: [{ id: "u-1", email: "user@test.dev", raw_user_meta: {}, is_admin: false }],
    }));

    const { createTestApp } = await import("../mocks/createTestApp");
    const app = await createTestApp();
    const res = await request(app)
      .post("/api/auth/2fa-login/verify")
      .set("Authorization", `Bearer ${preToken}`)
      .send({ code: "123456" });

    expect(res.status).toBe(200);
    expect(res.body.access_token).toBeTruthy();
  });
});
