import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  build: {
    assetsDir: "a",
    reportCompressedSize: false,
  },
  clearScreen: false,
  plugins: [solidPlugin()],
  resolve: { tsconfigPaths: true },
});
