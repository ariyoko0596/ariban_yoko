import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel'; // <-- Cukup import dari '@astrojs/vercel' saja

export default defineConfig({
  output: 'server',
  adapter: vercel(),
});