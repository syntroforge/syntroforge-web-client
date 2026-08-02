import solid from "eslint-plugin-solid/configs/typescript";
import { defineConfig } from "oxlint";

export default defineConfig({
  categories: { correctness: "error" },
  env: {},
  options: { typeAware: true, typeCheck: true },
  plugins: ["eslint", "typescript", "unicorn", "oxc", "import", "jsdoc", "promise"],
  overrides: [
    {
      files: ["src/**"],
      excludeFiles: ["src/**/*.css.ts"],
      env: {
        es2023: true,
        browser: true,
      },
      jsPlugins: ["eslint-plugin-solid"],
      plugins: ["jsx-a11y"],
      rules: { ...solid.rules },
    },
    {
      files: ["*", "build/**", "src/**/*.css.ts"],
      env: {
        es2025: true,
        node: true,
      },
    },
  ],
});
