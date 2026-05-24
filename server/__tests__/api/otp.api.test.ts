import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { onQuery, poolMock, resetPgMock } from "../mocks/pgMock";

const sendEmailOtpMock = vi.fn(async () => undefined);

vi.mock("../../db.js", () => ({ pool: poolMock }));
vi.mock("../../sendSms.js", () => ({ sendExolveSms: vi.fn(async () => ({ success: true })) }));
vi.mock("../../emailOtp.js", () => ({ sendEmailOtp: sendEmailOtpMock }));

describe("otp api", () => {
  beforeEach(() => {
    resetPgMock();
    sendEmailOtpMock.mockClear();
  });

  it("sends email otp successfully", async () => {
    onQuery(/INSERT INTO email_otp_challenges/, () => ({ rows: [], rowCount: 1 }));

    const { createTestApp } = await import("../mocks/createTestApp");
    const app = await createTestApp();
    const res = await request(app).post("/api/auth/email/send-otp").send({ email: "otp@test.dev" });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(sendEmailOtpMock).toHaveBeenCalled();
  });

  it("sms send returns 503 while SMS login is disabled", async () => {
    const { createTestApp } = await import("../mocks/createTestApp");
    const app = await createTestApp();
    const res = await request(app).post("/api/auth/sms/send").send({ phone: "+79990000000" });

    expect(res.status).toBe(503);
    expect(String(res.body.error)).toMatch(/SMS временно отключён/i);
  });

  it("verifies email otp with valid code", async () => {
    const email = "otp@test.dev";
    onQuery(/SELECT \* FROM email_otp_challenges/, () => ({
      rows: [{ id: "otp-1", email, code: "123456", used: false }],
    }));
    onQuery(/UPDATE email_otp_challenges SET used = true/, () => ({ rows: [], rowCount: 1 }));
    onQuery(/SELECT \* FROM users WHERE email = \$1/, () => ({
      rows: [{ id: "u-1", email, raw_user_meta: {}, is_admin: false }],
    }));

    const { createTestApp } = await import("../mocks/createTestApp");
    const app = await createTestApp();
    const res = await request(app).post("/api/auth/email/verify-otp").send({
      email,
      token: "123456",
      isRegistration: false,
    });

    expect(res.status).toBe(200);
    expect(res.body.access_token).toBeTruthy();
  });

  it("returns error for expired or wrong email otp", async () => {
    onQuery(/SELECT \* FROM email_otp_challenges/, () => ({ rows: [] }));

    const { createTestApp } = await import("../mocks/createTestApp");
    const app = await createTestApp();
    const res = await request(app).post("/api/auth/email/verify-otp").send({
      email: "otp@test.dev",
      token: "000000",
      isRegistration: false,
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Invalid or expired code/i);
  });
});
