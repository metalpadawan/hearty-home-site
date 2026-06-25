import { createRequire } from 'node:module';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const require = createRequire(import.meta.url);
const apiRoutes = {
  '/api/area-check': require('./api/area-check.js'),
  '/api/contact': require('./api/contact.js'),
};

function localApiRoutes() {
  return {
    name: 'local-api-routes',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = new URL(req.url || '/', 'http://localhost').pathname;
        const handler = apiRoutes[pathname];

        if (!handler) {
          next();
          return;
        }

        Promise.resolve(handler(req, res)).catch(next);
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return {
    plugins: [localApiRoutes(), react()],
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
  };
});
