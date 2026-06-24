import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import pagefind from 'astro-pagefind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://omniversify.com',
  integrations: [react(), pagefind(), mdx(), sitemap()],
  output: 'static'
});