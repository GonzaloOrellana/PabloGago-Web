// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://pablo-gago.vercel.app',
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Albert Sans',
      cssVariable: '--font-albert-sans',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
});
