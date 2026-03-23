// @ts-nocheck
import { browser } from 'xyzdocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("xyzdocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"test.mdx": () => import("../content/docs/test.mdx?collection=docs"), }),
};
export default browserCollections;