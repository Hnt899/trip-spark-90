import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { describe, expect, it } from "vitest";

import { signAccessToken, signPre2faToken } from "../authMiddleware.js";

describe("auth unit", () => {
  it("hashes password and validates hash", async () => {
    const password = "SuperSecret123!";
    const hash = await bcrypt.hash(password, 10);

    expect(hash).not.toBe(password);
    expect(await bcrypt.compare(password, hash)).toBe(true);
    expect(await bcrypt.compare("wrong-password", hash)).toBe(false);
  });

  it("creates valid access token with required claims", () => {
    const token = signAccessToken("user-1", "user@test.dev", { role: "user" }, true);
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;

    expect(decoded.typ).toBe("access");
    expect(decoded.sub).toBe("user-1");
    expect(decoded.email).toBe("user@test.dev");
    expect(decoded.adm).toBe(true);
    expect(decoded.meta).toEqual({ role: "user" });
  });

  it("creates pre-2fa token with limited claims", () => {
    const token = signPre2faToken("user-2", "otp@test.dev");
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;

    expect(decoded.typ).toBe("pre_2fa");
    expect(decoded.sub).toBe("user-2");
    expect(decoded.email).toBe("otp@test.dev");
  });
});
