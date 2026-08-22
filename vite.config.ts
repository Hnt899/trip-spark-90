import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Существующий прокси для вашего бэкенда
      "/api": {
        target: "http://127.0.0.1:4000",
        changeOrigin: true,
      },
      "/uploads": {
        target: "http://127.0.0.1:4000",
        changeOrigin: true,
      },
      // ===== НОВЫЙ ПРОКСИ ДЛЯ TRAVELPAYOUTS =====
      "/travelpayouts": {
        target: "http://autocomplete.travelpayouts.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/travelpayouts/, "/places2"),
        secure: false,        // ← добавляем
        followRedirects: false, // ← добавляем
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));