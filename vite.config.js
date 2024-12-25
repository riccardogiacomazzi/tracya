import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true, // Automatically open the report in your browser
      filename: "stats.html", // Output file
    }),
  ],
  build: {
    sourcemap: false,
  },
  server: { host: "0.0.0.0" },
});
