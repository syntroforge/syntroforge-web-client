import { dirname } from "node:path";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

/** Root directory, i.e., the directory containing this file. */
const ROOT_DIR = dirname(new URL(import.meta.url).pathname);

export default defineConfig({
  plugins: [solidPlugin()],
  resolve: { alias: { "~": `${ROOT_DIR}/src` } },
});
