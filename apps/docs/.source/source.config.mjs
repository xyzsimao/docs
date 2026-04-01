// source.config.ts
import { z } from "zod";
import { defineDocs, metaSchema, frontmatterSchema, defineConfig } from "xyzdocs-mdx/config";
import lastModified from "xyzdocs-mdx/plugins/last-modified";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { remarkMdxMermaid, remarkSteps } from "xyzdocs-core/mdx-plugins";
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
    remarkPlugins: [remarkMath, remarkMdxMermaid, remarkSteps],
    // Place it at first, it should be executed before the syntax highlighter
    rehypePlugins: (v) => [rehypeKatex, ...v],
    rehypeCodeOptions: {
      langs: ["ts", "js", "html", "tsx", "mdx"],
      inline: "tailing-curly-colon",
      themes: {
        light: "one-light",
        dark: "one-dark-pro"
      },
      transformers: [
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
