import { z } from 'zod'
import { applyMdxPreset, defineDocs, metaSchema, frontmatterSchema, defineConfig } from 'xyzdocs-mdx/config';
import lastModified from 'xyzdocs-mdx/plugins/last-modified';

export const docs = defineDocs({
  dir: 'content/docs',
  meta: {
    schema: metaSchema.extend({
      description: z.string().optional(),
    }),
  },
  docs: {
    schema: frontmatterSchema.extend({
      preview: z.string().optional(),
      index: z.boolean().default(false),
      /**
       * API routes only
       */
      method: z.string().optional(),
    }),
  },
});

export default defineConfig({
  plugins: [lastModified()],
});
