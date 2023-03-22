/*
 * @Author: Donnie
 * @LastEditors: Donnie
 * @Date: 2022-10-10 14:46:20
 * @LastEditTime: 2023-03-22 15:56:24
 * @FilePath: /super-page-web/vite.config.ts
 */
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url).href),
      stream: require.resolve("stream-browserify"),
    },
  },
  // root: "api3",
  base: "page",
  // base: "/public/",
  // base: "http://127.0.0.1:7001/public/",
  // base: "./",
  server: {
    open: true,
    port: 9527,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://127.0.0.1:7001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // publicPath: "/public/dist/",
        // path: path.join(__dirname, "../public/dist"),
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
});
