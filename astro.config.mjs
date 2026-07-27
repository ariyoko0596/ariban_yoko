// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // URL utama situs Anda untuk keperluan sitemap (ubah sesuai domain produksi Anda nanti)
  site: 'https://aribanyoko.com',

  // Daftarkan sitemap ke dalam integrations
  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: node({
    mode: 'standalone',
  }),
});