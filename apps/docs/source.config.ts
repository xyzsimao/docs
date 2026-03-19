import { z } from 'zod'
import {
  defineDocs,
  metaSchema,
  frontmatterSchema,
} from 'xyzdocs-mdx/config'

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
})