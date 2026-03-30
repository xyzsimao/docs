// source.config.ts
import { z } from "zod";
import { defineDocs, metaSchema, frontmatterSchema, defineConfig } from "xyzdocs-mdx/config";
import lastModified from "xyzdocs-mdx/plugins/last-modified";
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
  plugins: [lastModified()]
});
export {
  source_config_default as default,
  docs
};
