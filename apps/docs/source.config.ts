import { z } from 'zod';
import { defineDocs, metaSchema, frontmatterSchema, defineConfig } from 'xyzdocs-mdx/config';
import lastModified from 'xyzdocs-mdx/plugins/last-modified';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { remarkMdxMermaid, remarkSteps } from 'xyzdocs-core/mdx-plugins';
import { transformerTwoslash } from 'xyzdocs-twoslash';
import { rehypeCodeDefaultOptions } from 'xyzdocs-core/mdx-plugins';
import { ElementContent } from 'hast';
import { ShikiTransformer } from 'shiki';

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

 function parseMetaString(str = '') {
   return Object.fromEntries(
     str.split(' ').reduce((acc: [string, string | true][], cur) => {
       const matched = cur.match(/(.+)?=("(.+)"|'(.+)')$/);
       if (matched === null) return acc;
       const key = matched[1];
       const value = matched[3] || matched[4] || true;
       acc = [...acc, [key, value]];
       return acc;
     }, []),
   );
 }

export default defineConfig({
  plugins: [lastModified()],
  mdxOptions: {
    remarkPlugins: [remarkMath, remarkMdxMermaid, remarkSteps],
    //   // Place it at first, it should be executed before the syntax highlighter
    rehypePlugins: (v) => [rehypeKatex, ...v],
    rehypeCodeOptions: {
      langs: ['ts', 'js', 'html', 'tsx', 'mdx'],
      inline: 'tailing-curly-colon',
      themes: {
        light: 'one-light',
        dark: 'one-dark-pro',
      },
      transformers: [
        {
          name: 'transformer:test',
          preprocess() {
            if (!this.options.meta) return;
            const rawMeta = this.options.meta?.__raw;
            if (!rawMeta) return;
            const meta = parseMetaString(rawMeta);
            Object.assign(this.options.meta, meta);
            console.log('this.options.meta:', this.options.meta);
            // const rawMeta = meta?.__raw;
            // // console.log('transformer meta:', meta);
            // // console.log(rawMeta);
            // const map: Record<string, string> = {};

            // if (rawMeta) {
            //   rawMeta.replace(/(\w+)(?:=(\S+))?/g, (_, key, value) => {
            //     map[key] = value ?? 'true';
            //     return '';
            //   });
            // }
            // console.log('rawMeta Parsed meta:', map);

            // //TODO: assign parsed attributes to meta, so that it can be used in rehype transformers
            // Object.assign(this.meta, map);
            // // attributes.unshift(map);
            // // return map;
            // // this.addClassToHast(meta, 'hello');
            // return code;
          },
        },
        ...(rehypeCodeDefaultOptions.transformers ?? []),

        // transformerTwoslash({
        //   typesCache: createFileSystemTypesCache(),
        // }),
        // transformerEscape(),
      ],
    },
  },
});

 
// function transformerMetaToAttributes(): ShikiTransformer {
//   return {
//     name: 'meta-to-attributes',
//     pre(pre, { options?.meta }) {
//       // Parse the meta string (e.g., from ```js {meta} )

//       if (meta.includes('highlight')) {
//         // Add property directly to the <pre> hast node
//         this.addClassToHast(pre, 'highlighted-pre');
//         pre.properties['data-custom'] = 'true';
//       }
//     },
//   };
// }
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
