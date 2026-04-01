import { createMdxPlugin } from 'xyzdocs-mdx/bun';
import { postInstall } from 'xyzdocs-mdx/next';
// Bun.plugin(createMdxPlugin());

const configPath = '/Users/simao/code/xyz/docs/apps/docs/source.config.ts';
await postInstall({ configPath });
Bun.plugin(createMdxPlugin({ configPath }));
