import { configDefault } from 'xyzdocs-core/highlight/index';
import type { ResolvedShikiConfig } from 'xyzdocs-core/highlight/config';

export const shikiConfig: ResolvedShikiConfig = {
  ...configDefault,
  defaultThemes: {
    themes: {
      light: 'one-light',
      dark: 'one-dark-pro',
    },
  },
}
