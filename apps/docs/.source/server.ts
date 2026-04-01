// @ts-nocheck
import * as __fd_glob_18 from "../content/docs/ui/components/steps.mdx?collection=docs"
import * as __fd_glob_17 from "../content/docs/ui/components/accordion.mdx?collection=docs"
import * as __fd_glob_16 from "../content/docs/ui/index.mdx?collection=docs"
import * as __fd_glob_15 from "../content/docs/miscellaneous/twoslash.mdx?collection=docs"
import * as __fd_glob_14 from "../content/docs/miscellaneous/toc.mdx?collection=docs"
import * as __fd_glob_13 from "../content/docs/miscellaneous/mermaid.mdx?collection=docs"
import * as __fd_glob_12 from "../content/docs/miscellaneous/md_doc.mdx?collection=docs"
import * as __fd_glob_11 from "../content/docs/miscellaneous/math.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/miscellaneous/markdown.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/cli/test.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/cli/index.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/cli/create-fumadocs-app.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/(framework)/index.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/test.mdx?collection=docs"
import { default as __fd_glob_4 } from "../content/docs/ui/meta.json?collection=docs"
import { default as __fd_glob_3 } from "../content/docs/miscellaneous/meta.json?collection=docs"
import { default as __fd_glob_2 } from "../content/docs/cli/meta.json?collection=docs"
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

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, "(framework)/meta.json": __fd_glob_1, "cli/meta.json": __fd_glob_2, "miscellaneous/meta.json": __fd_glob_3, "ui/meta.json": __fd_glob_4, }, {"test.mdx": __fd_glob_5, "(framework)/index.mdx": __fd_glob_6, "cli/create-fumadocs-app.mdx": __fd_glob_7, "cli/index.mdx": __fd_glob_8, "cli/test.mdx": __fd_glob_9, "miscellaneous/markdown.mdx": __fd_glob_10, "miscellaneous/math.mdx": __fd_glob_11, "miscellaneous/md_doc.mdx": __fd_glob_12, "miscellaneous/mermaid.mdx": __fd_glob_13, "miscellaneous/toc.mdx": __fd_glob_14, "miscellaneous/twoslash.mdx": __fd_glob_15, "ui/index.mdx": __fd_glob_16, "ui/components/accordion.mdx": __fd_glob_17, "ui/components/steps.mdx": __fd_glob_18, });