import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ['e2e/**/*.{test,spec}.{ts,tsx}']
    }
  })
);
