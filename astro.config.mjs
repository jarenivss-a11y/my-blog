import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jarenivss-a11y.github.io',
  base: '/my-blog',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/tags/'), // Exclude individual tag pages
    }),
  ],
});