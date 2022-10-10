/*
 * @Author: Donnie
 * @LastEditors: Donnie
 * @Date: 2022-08-29 18:15:12
 * @LastEditTime: 2022-10-10 10:55:28
 * @FilePath: /my-page/vite.config.ts
 */
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      stream: require.resolve("stream-browserify"),
    },
  },
  // root: "api3",
  base: "api3",
  server: {
    open: true,
    port: 9527,
    host: "0.0.0.0",
  },
});
