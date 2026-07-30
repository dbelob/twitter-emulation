import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from '../vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      // Isolate integration tests from regular unit tests
      include: ['**/*.{test,spec}.{ts,tsx}'],

      // Use jsdom or happy-dom for React component integration testing
      environment: 'jsdom',

      // Disable watch mode so start-server-and-test can exit after completion
      watch: false,

      // Global test setup if needed (e.g., cleaning up MSW or DOM)
      globals: true,
      setupFiles: [],
    },
  })
);
