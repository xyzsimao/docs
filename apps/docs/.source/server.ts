// @ts-nocheck
import * as __fd_glob_14 from "../content/docs/miscellaneous/md_doc.mdx?collection=docs"
import * as __fd_glob_13 from "../content/docs/miscellaneous/markdown.mdx?collection=docs"
import * as __fd_glob_12 from "../content/docs/ui/index.mdx?collection=docs"
import * as __fd_glob_11 from "../content/docs/headless/index.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/cli/test.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/cli/index.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/cli/create-fumadocs-app.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/(framework)/index.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/test.mdx?collection=docs"
import { default as __fd_glob_5 } from "../content/docs/ui/meta.json?collection=docs"
import { default as __fd_glob_4 } from "../content/docs/miscellaneous/meta.json?collection=docs"
import { default as __fd_glob_3 } from "../content/docs/headless/meta.json?collection=docs"
import { default as __fd_glob_2 } from "../content/docs/cli/meta.json?collection=docs"
import { default as __fd_glob_1 } from "../content/docs/(framework)/meta.json?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'xyzdocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("xyzdocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, "(framework)/meta.json": __fd_glob_1, "cli/meta.json": __fd_glob_2, "headless/meta.json": __fd_glob_3, "miscellaneous/meta.json": __fd_glob_4, "ui/meta.json": __fd_glob_5, }, {"test.mdx": __fd_glob_6, "(framework)/index.mdx": __fd_glob_7, "cli/create-fumadocs-app.mdx": __fd_glob_8, "cli/index.mdx": __fd_glob_9, "cli/test.mdx": __fd_glob_10, "headless/index.mdx": __fd_glob_11, "ui/index.mdx": __fd_glob_12, "miscellaneous/markdown.mdx": __fd_glob_13, "miscellaneous/md_doc.mdx": __fd_glob_14, });