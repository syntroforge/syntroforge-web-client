import type { Plugin } from "vite";
import { Options, minify } from "html-minifier-terser";

/**
 * Creates a Vite plugin that minifies the `index.html` file.
 *
 * @param options - Options passed to the HTML minifier.
 * @returns The plugin.
 */
export default (options: Options = {}): Plugin => {
  options = {
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    decodeEntities: true,
    ignoreCustomComments: [],
    ignoreCustomFragments: [],
    removeComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    sortAttributes: true,
    sortClassName: true,
    ...options,
  };

  return {
    name: "vite-plugin-minify-index-html",
    apply: "build",

    transformIndexHtml(html) {
      return minify(html, options);
    },
  };
};
