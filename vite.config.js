import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  base: './',
  server: {
    host: '127.0.0.1',
    port: 5517,
    strictPort: true
  },
  preview: {
    host: '127.0.0.1',
    port: 5518,
    strictPort: true
  },
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'app.html')
      }
    }
  }
});
