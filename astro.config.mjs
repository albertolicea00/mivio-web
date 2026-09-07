import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://mivio.app',
  output: 'static',
  adapter: vercel(),
  integrations: [tailwind()],
});
