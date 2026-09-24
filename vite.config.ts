import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { readFileSync } from "fs";
import { buildTokens } from "./scripts/build-tokens.mjs";

/**
 * Regenerates src/index.css and src/generated/tokens.tsx from tokens.json on startup and
 * whenever tokens.json changes, so editing the single source of truth
 * hot-reloads the running app.
 */
function designTokensPlugin(): Plugin {
  const tokensFile = path.resolve(import.meta.dirname, "tokens.json");
  return {
    name: "design-tokens",
    buildStart() {
      buildTokens();
      this.addWatchFile(tokensFile);
    },
    configureServer(server) {
      server.watcher.add(tokensFile);
      server.watcher.on("change", (file) => {
        if (path.resolve(file) === tokensFile) {
          buildTokens();
          server.ws.send({ type: "full-reload" });
        }
      });
    },
  };
}

// PORT and BASE_PATH are optional overrides so the preview also runs standalone.
const port = Number(process.env.PORT ?? 5173);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${process.env.PORT}"`);
}

// Load VITE_GITHUB_TOKEN from the shared secrets folder (outside the package).
let githubToken = "";
try {
  const envFile = path.resolve(import.meta.dirname, "../../../secrets/.env.local");
  const content = readFileSync(envFile, "utf-8");
  const match = content.match(/^VITE_GITHUB_TOKEN=(.+)$/m);
  if (match) githubToken = match[1].trim();
} catch {
  // .env.local not present — token stays empty, releases fetch will fail gracefully.
}

export default defineConfig({
  base: process.env.BASE_PATH ?? "/",
  define: {
    "import.meta.env.VITE_GITHUB_TOKEN": JSON.stringify(githubToken),
  },
  plugins: [designTokensPlugin(), react(), tailwindcss()],
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});