import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  server: {
    host: '0.0.0.0',
    port: 4321,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          includePaths: ['./src/styles'],
        },
      },
    },
    resolve: {
      alias: {
        '@': '/src',
        '@/components': '/src/components',
        '@/types': '/src/types',
        '@/constants': '/src/constants',
        '@/hooks': '/src/hooks',
        '@/lib': '/src/lib',
        '@/layouts': '/src/layouts',
        '@/styles': '/src/styles',
      },
    },
  },
});
