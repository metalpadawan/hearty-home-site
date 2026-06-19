import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    pool: 'forks',
    maxWorkers: 1,
    fileParallelism: false,
    globals: true,
    include: ['tests/**/*.{test,spec}.{js,jsx}'],
    exclude: ['tests/e2e/**', 'node_modules/**', 'dist/**'],
    setupFiles: './src/test/setup.js',
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['tests/**', 'src/test/**'],
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        privacy: resolve(__dirname, 'privacy.html'),
      },
    },
    sourcemap: false,
  },
});
