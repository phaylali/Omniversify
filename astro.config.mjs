import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import pagefind from 'astro-pagefind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { remarkWikiLinks } from './src/plugins/remark-wiki-links.mjs';

export default defineConfig({
  site: 'https://omniversify.com',
  integrations: [react(), pagefind(), mdx({ remarkPlugins: [remarkWikiLinks] }), sitemap()],
  output: 'static'
});