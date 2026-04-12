// @ts-nocheck
import { browser } from 'xyzdocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("xyzdocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
} & {
  DocData: {
    docs: {
      /**
       * Last modified date of document file, obtained from version control.
       *
       */
      lastModified?: Date;
    },
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"test.mdx": () => import("../content/docs/test.mdx?collection=docs"), "(framework)/index.mdx": () => import("../content/docs/(framework)/index.mdx?collection=docs"), "headless/index.mdx": () => import("../content/docs/headless/index.mdx?collection=docs"), "javascript/JavaScript问题集.mdx": () => import("../content/docs/javascript/JavaScript问题集.mdx?collection=docs"), "javascript/airbnb_style.mdx": () => import("../content/docs/javascript/airbnb_style.mdx?collection=docs"), "javascript/index.mdx": () => import("../content/docs/javascript/index.mdx?collection=docs"), "cli/create-fumadocs-app.mdx": () => import("../content/docs/cli/create-fumadocs-app.mdx?collection=docs"), "cli/index.mdx": () => import("../content/docs/cli/index.mdx?collection=docs"), "cli/test.mdx": () => import("../content/docs/cli/test.mdx?collection=docs"), "miscellaneous/collections.mdx": () => import("../content/docs/miscellaneous/collections.mdx?collection=docs"), "miscellaneous/markdown.mdx": () => import("../content/docs/miscellaneous/markdown.mdx?collection=docs"), "miscellaneous/math.mdx": () => import("../content/docs/miscellaneous/math.mdx?collection=docs"), "miscellaneous/md_doc.mdx": () => import("../content/docs/miscellaneous/md_doc.mdx?collection=docs"), "miscellaneous/mermaid.mdx": () => import("../content/docs/miscellaneous/mermaid.mdx?collection=docs"), "miscellaneous/toc.mdx": () => import("../content/docs/miscellaneous/toc.mdx?collection=docs"), "miscellaneous/twoslash.mdx": () => import("../content/docs/miscellaneous/twoslash.mdx?collection=docs"), "ui/index.mdx": () => import("../content/docs/ui/index.mdx?collection=docs"), "headless/mdx/rehype-code.mdx": () => import("../content/docs/headless/mdx/rehype-code.mdx?collection=docs"), "ui/components/accordion.mdx": () => import("../content/docs/ui/components/accordion.mdx?collection=docs"), "ui/components/codeblock.mdx": () => import("../content/docs/ui/components/codeblock.mdx?collection=docs"), "ui/components/index.mdx": () => import("../content/docs/ui/components/index.mdx?collection=docs"), "ui/components/steps.mdx": () => import("../content/docs/ui/components/steps.mdx?collection=docs"), "ui/layouts/docs.mdx": () => import("../content/docs/ui/layouts/docs.mdx?collection=docs"), "ui/layouts/index.mdx": () => import("../content/docs/ui/layouts/index.mdx?collection=docs"), "javascript/javascript.info/getting-started/intro.mdx": () => import("../content/docs/javascript/javascript.info/getting-started/intro.mdx?collection=docs"), "javascript/javascript.info/getting-started/manuals-specifications.mdx": () => import("../content/docs/javascript/javascript.info/getting-started/manuals-specifications.mdx?collection=docs"), }),
};
export default browserCollections;