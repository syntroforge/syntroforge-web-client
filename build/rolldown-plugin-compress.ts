import { gzipAsync } from "@gfx/zopfli";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { promisify } from "node:util";
import { brotliCompress, constants as zlibConstants, zstdCompress } from "node:zlib";
import { Plugin, createFilter } from "vite";

/** Plugin options. */
export interface Options {
  /** Minimum size that files must have to write compressed copies of them. 1024 bytes by default. */
  readonly minSize?: number;

  /** Include filter. */
  readonly include?: string | RegExp | string[] | RegExp[];

  /** Exclude filter. */
  readonly exclude?: string | RegExp | string[] | RegExp[];
}

/** Asynchronous Brotli compression. */
const brotliAsync = promisify(brotliCompress);

/** Asynchronous Zstd compression. */
const zstdAsync = promisify(zstdCompress);

/**
 * Creates a Rolldown plugin that writes compressed copies of assets and chunks.
 *
 * @param options - Plugin options.
 * @returns The plugin.
 */
export default (options: Options = {}): Plugin => {
  const minSize = options.minSize ?? 1024;
  const filter = createFilter(options.include, options.exclude, { resolve: false });

  return {
    name: "rolldown-plugin-compress",
    apply: "build",

    async writeBundle(outputOptions, bundle) {
      const outputDir = outputOptions.dir;
      if (outputDir === undefined) {
        throw Error("No output directory specified");
      }

      await Promise.all(
        Object.values(bundle)
          .filter((assetOrChunk) => filter(assetOrChunk.fileName))
          .flatMap((assetOrChunk) => {
            let isText: boolean;
            let content: Buffer | Uint8Array;
            if (assetOrChunk.type === "asset") {
              if (typeof assetOrChunk.source === "string") {
                isText = true;
                content = Buffer.from(assetOrChunk.source, "utf8");
              } else {
                isText = false;
                content = assetOrChunk.source;
              }
            } else {
              isText = true;
              content = Buffer.from(assetOrChunk.code, "utf8");
            }

            // Do not compress small files.
            if (content.length < minSize) {
              return [];
            }

            const pathName = resolve(outputDir, assetOrChunk.fileName);
            return [
              brotliAsync(content, {
                params: {
                  [zlibConstants.BROTLI_PARAM_MODE]: isText
                    ? zlibConstants.BROTLI_MODE_TEXT
                    : zlibConstants.BROTLI_MODE_GENERIC,
                  [zlibConstants.BROTLI_PARAM_SIZE_HINT]: content.length,
                },
              }).then((content) => writeFile(pathName + ".br", content)),
              gzipAsync(content, {}).then((content) => writeFile(pathName + ".gz", content)),
              zstdAsync(content, {
                params: {
                  [zlibConstants.ZSTD_c_compressionLevel]: 99,
                },
              }).then((content) => writeFile(pathName + ".zst", content)),
            ];
          }),
      );
    },
  };
};
