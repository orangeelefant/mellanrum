// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://mellanrumpsykoterapi.se',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'always' },
});
