import type { NextConfig } from 'next';
import { createMDX } from 'xyzdocs-mdx/next';

/** @type {import('next').NextConfig} */
const config: NextConfig = {
  // output: 'export',
  images: { unoptimized: true },
  serverExternalPackages: ['better-auth', 'typescript', 'twoslash'],
  reactStrictMode: true,
  experimental: { serverMinification: false },
};

const withMDX = createMDX({
  configPath: 'source.config.ts',
});
export default withMDX(config);
