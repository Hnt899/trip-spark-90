import { afterEach, vi } from "vitest";

process.env.NODE_ENV = "test";
process.env.JWT_SECRET = process.env.JWT_SECRET || "test-jwt-secret";
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
process.env.WEBPAY_STORE_ID = process.env.WEBPAY_STORE_ID || "test-store";
process.env.WEBPAY_SECRET_KEY = process.env.WEBPAY_SECRET_KEY || "test-webpay-secret";
process.env.WEBPAY_CURRENCY_ID = process.env.WEBPAY_CURRENCY_ID || "933";
process.env.WEBPAY_TEST_MODE = process.env.WEBPAY_TEST_MODE || "1";
process.env.WEBPAY_PUBLIC_API_BASE = process.env.WEBPAY_PUBLIC_API_BASE || "http://localhost:4000/api";
process.env.ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || "http://localhost:5173";
process.env.HF_API_TOKEN = process.env.HF_API_TOKEN || "hf-test-token";
process.env.HF_MODEL = process.env.HF_MODEL || "meta-llama/Meta-Llama-3.1-8B-Instruct";
process.env.EXOLVE_API_KEY = process.env.EXOLVE_API_KEY || "test-exolve-key";
process.env.EXOLVE_SENDER = process.env.EXOLVE_SENDER || "TUDASUDA";
process.env.SMTP_HOST = process.env.SMTP_HOST || "smtp.test.local";
process.env.SMTP_PORT = process.env.SMTP_PORT || "587";
process.env.SMTP_USER = process.env.SMTP_USER || "test@tudasuda.local";
process.env.SMTP_PASS = process.env.SMTP_PASS || "test-pass";
process.env.SMTP_FROM = process.env.SMTP_FROM || "test@tudasuda.local";

afterEach(() => {
  vi.clearAllMocks();
});
