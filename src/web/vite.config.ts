import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5051,
    proxy: {
      "/api": "http://localhost:7071",
    },
  },
  test: {
    environment: "node",
    globals: true,
  },
});
