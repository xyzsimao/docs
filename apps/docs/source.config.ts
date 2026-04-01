import { z } from 'zod';
import { defineDocs, metaSchema, frontmatterSchema, defineConfig } from 'xyzdocs-mdx/config';
import lastModified from 'xyzdocs-mdx/plugins/last-modified';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { remarkMdxMermaid, remarkSteps } from 'xyzdocs-core/mdx-plugins';
import { transformerTwoslash } from 'xyzdocs-twoslash';
import { rehypeCodeDefaultOptions } from 'xyzdocs-core/mdx-plugins';
import { ElementContent } from 'hast';

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
  mdxOptions: {
    remarkPlugins: [remarkMath, remarkMdxMermaid, remarkSteps],
    // Place it at first, it should be executed before the syntax highlighter
    rehypePlugins: (v) => [rehypeKatex, ...v],
    rehypeCodeOptions: {
      langs: ['ts', 'js', 'html', 'tsx', 'mdx'],
      inline: 'tailing-curly-colon',
      themes: {
        light: 'one-light',
        dark: 'one-dark-pro',
      },
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        // transformerTwoslash({
        //   typesCache: createFileSystemTypesCache(),
        // }),
        // transformerEscape(),
      ],
    },
  },
});

// function transformerEscape(): ShikiTransformer {
//   return {
//     name: '@shikijs/transformers:remove-notation-escape',
//     code(hast: any) {
//       function replace(node: ElementContent) {
//         if (node.type === 'text') {
//           node.value = node.value.replace('[\\!code', '[!code');
//         } else if ('children' in node) {
//           for (const child of node.children) {
//             replace(child);
//           }
//         }
//       }

//       replace(hast);
//       return hast;
//     },
//   };
// }
