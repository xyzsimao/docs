// @ts-nocheck
import * as __fd_glob_32 from "../content/docs/javascript/javascript.info/getting-started/manuals-specifications.mdx?collection=docs"
import * as __fd_glob_31 from "../content/docs/javascript/javascript.info/getting-started/intro.mdx?collection=docs"
import * as __fd_glob_30 from "../content/docs/ui/layouts/index.mdx?collection=docs"
import * as __fd_glob_29 from "../content/docs/ui/layouts/docs.mdx?collection=docs"
import * as __fd_glob_28 from "../content/docs/ui/components/steps.mdx?collection=docs"
import * as __fd_glob_27 from "../content/docs/ui/components/index.mdx?collection=docs"
import * as __fd_glob_26 from "../content/docs/ui/components/codeblock.mdx?collection=docs"
import * as __fd_glob_25 from "../content/docs/ui/components/accordion.mdx?collection=docs"
import * as __fd_glob_24 from "../content/docs/headless/mdx/rehype-code.mdx?collection=docs"
import * as __fd_glob_23 from "../content/docs/ui/index.mdx?collection=docs"
import * as __fd_glob_22 from "../content/docs/miscellaneous/twoslash.mdx?collection=docs"
import * as __fd_glob_21 from "../content/docs/miscellaneous/toc.mdx?collection=docs"
import * as __fd_glob_20 from "../content/docs/miscellaneous/mermaid.mdx?collection=docs"
import * as __fd_glob_19 from "../content/docs/miscellaneous/md_doc.mdx?collection=docs"
import * as __fd_glob_18 from "../content/docs/miscellaneous/math.mdx?collection=docs"
import * as __fd_glob_17 from "../content/docs/miscellaneous/markdown.mdx?collection=docs"
import * as __fd_glob_16 from "../content/docs/miscellaneous/collections.mdx?collection=docs"
import * as __fd_glob_15 from "../content/docs/cli/test.mdx?collection=docs"
import * as __fd_glob_14 from "../content/docs/cli/index.mdx?collection=docs"
import * as __fd_glob_13 from "../content/docs/cli/create-fumadocs-app.mdx?collection=docs"
import * as __fd_glob_12 from "../content/docs/javascript/index.mdx?collection=docs"
import * as __fd_glob_11 from "../content/docs/javascript/airbnb_style.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/javascript/JavaScript问题集.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/headless/index.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/(framework)/index.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/test.mdx?collection=docs"
import { default as __fd_glob_6 } from "../content/docs/miscellaneous/meta.json?collection=docs"
import { default as __fd_glob_5 } from "../content/docs/ui/meta.json?collection=docs"
import { default as __fd_glob_4 } from "../content/docs/javascript/meta.json?collection=docs"
import { default as __fd_glob_3 } from "../content/docs/cli/meta.json?collection=docs"
import { default as __fd_glob_2 } from "../content/docs/headless/meta.json?collection=docs"
import { default as __fd_glob_1 } from "../content/docs/(framework)/meta.json?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'xyzdocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("xyzdocs-mdx/runtime/types").InternalTypeConfig & {
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
}>({"doc":{"passthroughs":["extractedReferences","lastModified"]}});

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, "(framework)/meta.json": __fd_glob_1, "headless/meta.json": __fd_glob_2, "cli/meta.json": __fd_glob_3, "javascript/meta.json": __fd_glob_4, "ui/meta.json": __fd_glob_5, "miscellaneous/meta.json": __fd_glob_6, }, {"test.mdx": __fd_glob_7, "(framework)/index.mdx": __fd_glob_8, "headless/index.mdx": __fd_glob_9, "javascript/JavaScript问题集.mdx": __fd_glob_10, "javascript/airbnb_style.mdx": __fd_glob_11, "javascript/index.mdx": __fd_glob_12, "cli/create-fumadocs-app.mdx": __fd_glob_13, "cli/index.mdx": __fd_glob_14, "cli/test.mdx": __fd_glob_15, "miscellaneous/collections.mdx": __fd_glob_16, "miscellaneous/markdown.mdx": __fd_glob_17, "miscellaneous/math.mdx": __fd_glob_18, "miscellaneous/md_doc.mdx": __fd_glob_19, "miscellaneous/mermaid.mdx": __fd_glob_20, "miscellaneous/toc.mdx": __fd_glob_21, "miscellaneous/twoslash.mdx": __fd_glob_22, "ui/index.mdx": __fd_glob_23, "headless/mdx/rehype-code.mdx": __fd_glob_24, "ui/components/accordion.mdx": __fd_glob_25, "ui/components/codeblock.mdx": __fd_glob_26, "ui/components/index.mdx": __fd_glob_27, "ui/components/steps.mdx": __fd_glob_28, "ui/layouts/docs.mdx": __fd_glob_29, "ui/layouts/index.mdx": __fd_glob_30, "javascript/javascript.info/getting-started/intro.mdx": __fd_glob_31, "javascript/javascript.info/getting-started/manuals-specifications.mdx": __fd_glob_32, });