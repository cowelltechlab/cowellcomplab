import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { copyFileSync, existsSync } from "fs";
import { resolve } from "path";

/** Copy index.html to 404.html so GitHub Pages serves the SPA for direct/refresh on any route. */
function copyIndexTo404() {
  return {
    name: "copy-index-to-404",
    closeBundle() {
      const outDir = resolve(__dirname, "dist");
      const index = resolve(outDir, "index.html");
      const notFound = resolve(outDir, "404.html");
      if (existsSync(index)) {
        copyFileSync(index, notFound);
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [nodePolyfills(), tailwindcss(), react(), copyIndexTo404()],
  base: "/cowellcomplab/",
});
