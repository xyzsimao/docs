// @ts-nocheck
import { dynamic } from 'xyzdocs-mdx/runtime/dynamic';
import * as Config from '../source.config';

const create = await dynamic<typeof Config, import("xyzdocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>(Config, {"configPath":"source.config.ts","environment":"next","outDir":".source"}, {"doc":{"passthroughs":["extractedReferences"]}});