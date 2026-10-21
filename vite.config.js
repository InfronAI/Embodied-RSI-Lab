import { defineConfig } from "vite";
export default defineConfig({
  root: "frontend",
  build: { outDir: "../src/embodied_jev/web", emptyOutDir: true,
    rollupOptions: {
      preserveEntrySignatures: "strict",
      input: {index: "frontend/index.html", "lab-workbench": "frontend/lab-entry.js"},
      output: {entryFileNames: "assets/[name].js"},
    } },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8092/workbench",
        configure(proxy) {
          proxy.on("proxyReq", (req) =>
            req.setHeader("origin", "http://127.0.0.1:8092/workbench"),
          );
        },
      },
    },
  },
});
