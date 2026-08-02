import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import compressPlugin from "./build/rolldown-plugin-compress.ts";
import minifyIndexHtmlPlugin from "./build/vite-plugin-minify-index-html.ts";

export default defineConfig({
  build: {
    assetsDir: "a",
    reportCompressedSize: false,
  },
  clearScreen: false,
  plugins: [solidPlugin(), vanillaExtractPlugin(), minifyIndexHtmlPlugin(), compressPlugin()],
  resolve: { tsconfigPaths: true },
});
