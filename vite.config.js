import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "./src",
  base: "/peru-travel-api/",  // Adjusted base for Netlify deployment

  build: {
    outDir: "./dist",
    rollupOptions: {
      input: {
        Index: resolve(__dirname, "src/index.html"),
      },
    },
  },
});
