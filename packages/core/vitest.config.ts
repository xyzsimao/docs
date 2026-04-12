import { defineProject } from 'vitest/config'

export default defineProject({
  test: {
    include: ['./tests/mdx-plugins.test.ts'],
  },
  resolve: {
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
  },
});
