import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    include: ['src/**/*.e2e.spec.ts', 'test/**/*.e2e.spec.ts'],
    globals: true,
    environment: 'node',
    setupFiles: ['./test/setup-e2e.ts'],
    globalSetup: ['./test/global-setup.ts'],
  },
  plugins: [
    tsConfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
});
