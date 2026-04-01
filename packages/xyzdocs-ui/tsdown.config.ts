import { defineConfig } from 'tsdown';
import fs from 'node:fs/promises';
import { compileInline } from './scripts/compile-inline.utils';
export default defineConfig({
  format: 'esm',
  target: 'es2023',
  entry: ['./src/**/*.{ts,tsx}', '!./src/_registry'],
  fixedExtension: false,
  unbundle: true,
  dts: {
    sourcemap: false,
  },
  async onSuccess() {
    await compileInline();
  },
});
