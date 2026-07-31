import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import minifyIndexHtmlPlugin from "./build/vite-plugin-minify-index-html";

export default defineConfig({
  build: {
    assetsDir: "a",
    reportCompressedSize: false,
  },
  clearScreen: false,
  plugins: [solidPlugin(), minifyIndexHtmlPlugin()],
  resolve: { tsconfigPaths: true },
});
