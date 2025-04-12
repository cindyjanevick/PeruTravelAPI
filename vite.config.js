import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "./src",
  base: "/peru-travel-api/",  // Adjusted base for Netlify deployment

  build: {
    outDir: "./dist",
    rollupOptions: {
      input: {
        Index: resolve(__dirname, "PeruTravelAPI/src/index.html"),
        Destinations: resolve(__dirname, "src/pages/destinations.html"),
        Attractions: resolve(__dirname, "src/pages/attractions.html"),
        Recommendations: resolve(__dirname, "src/pages/recommendations.html"),
        Restaurants: resolve(__dirname, "src/pages/restaurants.html"),
      },
    },
  },
});
