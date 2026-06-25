import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
        index: 'index.html',
        about: 'about.html',
        founder: 'founder.html',
        contact: 'contact.html',
        privacy: 'privacy.html',
      },
    },
    sourcemap: false,
  },
});
