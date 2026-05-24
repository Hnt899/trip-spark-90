import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    name: "server",
    environment: "node",
    include: ["server/__tests__/**/*.test.ts"],
    setupFiles: ["server/__tests__/setup.ts"],
    globals: true,
    clearMocks: true,
    restoreMocks: true,
    env: {
      NODE_ENV: "test",
      JWT_SECRET: "test-jwt-secret",
      JWT_EXPIRES_IN: "1h",
      WEBPAY_STORE_ID: "test-store",
      WEBPAY_SECRET_KEY: "test-webpay-secret",
      WEBPAY_CURRENCY_ID: "933",
      WEBPAY_TEST_MODE: "1",
      WEBPAY_PUBLIC_API_BASE: "http://localhost:4000/api",
      HF_API_TOKEN: "hf-test-token",
      HF_MODEL: "meta-llama/Meta-Llama-3.1-8B-Instruct",
      EXOLVE_API_KEY: "test-exolve-key",
      EXOLVE_SENDER: "TUDASUDA",
      SMTP_HOST: "smtp.test.local",
      SMTP_PORT: "587",
      SMTP_USER: "test@tudasuda.local",
      SMTP_PASS: "test-pass",
      SMTP_FROM: "test@tudasuda.local",
      DATABASE_URL: "postgres://test:test@localhost:5432/test",
      ALLOWED_ORIGINS: "http://localhost:5173",
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      reportsDirectory: "coverage/server",
      include: ["server/webpayNode.js"],
      thresholds: {
        lines: 80,
        functions: 75,
        branches: 70,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      "@server": path.resolve(__dirname),
    },
  },
});
