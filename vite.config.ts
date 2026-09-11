import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { buildTokens } from "./scripts/build-tokens.mjs";

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

const port = Number(process.env.PORT ?? 5173);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${process.env.PORT}"`);
}

export default defineConfig({
  base: process.env.BASE_PATH ?? "/",
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