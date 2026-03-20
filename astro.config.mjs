// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import pagefind from 'astro-pagefind';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://omniversify.com',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), pagefind(), mdx(), sitemap()],
  output: 'static'
});