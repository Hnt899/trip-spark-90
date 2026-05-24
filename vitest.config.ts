import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    name: "frontend",
    environment: "jsdom",
    setupFiles: ["src/__tests__/setup.ts", "server/__tests__/setup.ts"],
    include: ["src/__tests__/**/*.test.ts?(x)", "server/__tests__/**/*.test.ts"],
    exclude: ["e2e/**", "node_modules/**"],
    globals: true,
    clearMocks: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      reportsDirectory: "coverage/frontend",
      include: ["src/lib/api.ts", "src/pages/admin/AdminDashboard.tsx"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
