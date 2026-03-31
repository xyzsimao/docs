// source.config.ts
import { z } from "zod";
import { defineDocs, metaSchema, frontmatterSchema, defineConfig } from "xyzdocs-mdx/config";
import lastModified from "xyzdocs-mdx/plugins/last-modified";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { remarkMdxMermaid } from "xyzdocs-core/mdx-plugins";
import { transformerTwoslash } from "xyzdocs-twoslash";
import { rehypeCodeDefaultOptions } from "xyzdocs-core/mdx-plugins";
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
var source_config_default = defineConfig({
  plugins: [lastModified()],
  mdxOptions: {
    remarkPlugins: [remarkMath, remarkMdxMermaid],
    // Place it at first, it should be executed before the syntax highlighter
    rehypePlugins: (v) => [rehypeKatex, ...v],
    rehypeCodeOptions: {
      themes: {
        light: "github-light",
        dark: "github-dark"
      },
      transformers: [...rehypeCodeDefaultOptions.transformers ?? [], transformerTwoslash()],
      // important: Shiki doesn't support lazy loading languages for codeblocks in Twoslash popups
      // make sure to define them first (e.g. the common ones)
      langs: ["js", "jsx", "ts", "tsx"]
    }
  }
});
export {
  source_config_default as default,
  docs
};
