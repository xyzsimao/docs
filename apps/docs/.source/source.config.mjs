// source.config.ts
import { z } from "zod";
import { defineDocs, metaSchema, frontmatterSchema, defineConfig } from "xyzdocs-mdx/config";
import lastModified from "xyzdocs-mdx/plugins/last-modified";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { remarkMdxMermaid, remarkSteps } from "xyzdocs-core/mdx-plugins";
import { rehypeCodeDefaultOptions } from "xyzdocs-core/mdx-plugins";
import codeImport from "remark-code-import";
var docs = defineDocs({
  dir: "content/docs",
  meta: {
    schema: metaSchema.extend({
      description: z.string().optional()
    })
  },
  docs: {
    schema: frontmatterSchema.extend({
      preview: z.string().optional(),
      index: z.boolean().default(false),
      /**
       * API routes only
       */
      method: z.string().optional()
    })
  }
});
function parseMetaString(str = "") {
  return Object.fromEntries(
    str.split(" ").reduce((acc, cur) => {
      const matched = cur.match(/(.+)?=("(.+)"|'(.+)')$/);
      if (matched === null) return acc;
      const key = matched[1];
      const value = matched[3] || matched[4] || true;
      acc = [...acc, [key, value]];
      return acc;
    }, [])
  );
}
var source_config_default = defineConfig({
  plugins: [lastModified()],
  mdxOptions: {
    remarkPlugins: [remarkMath, remarkMdxMermaid, remarkSteps, codeImport],
    //   // Place it at first, it should be executed before the syntax highlighter
    rehypePlugins: (v) => [rehypeKatex, ...v],
    rehypeCodeOptions: {
      langs: ["ts", "js", "html", "tsx", "mdx"],
      inline: "tailing-curly-colon",
      themes: {
        light: "one-light",
        dark: "one-dark-pro"
      },
      transformers: [
        {
          name: "transformer:test",
          preprocess() {
            if (!this.options.meta) return;
            const rawMeta = this.options.meta?.__raw;
            if (!rawMeta) return;
            const meta = parseMetaString(rawMeta);
            Object.assign(this.options.meta, meta);
          }
        },
        ...rehypeCodeDefaultOptions.transformers ?? []
        // transformerTwoslash({
        //   typesCache: createFileSystemTypesCache(),
        // }),
        // transformerEscape(),
      ]
    }
  }
});
export {
  source_config_default as default,
  docs
};
