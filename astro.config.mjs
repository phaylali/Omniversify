import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';

import react from '@astrojs/react';
import pagefind from 'astro-pagefind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkGfm from 'remark-gfm';
import { remarkWikiLinks } from './src/plugins/remark-wiki-links.mjs';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://omniversify.com',
  markdown: {
    processor: unified({ remarkPlugins: [remarkGfm, remarkWikiLinks] })
  },
  integrations: [react(), pagefind(), mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()]
  },
  output: 'static'
});