import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  expect: { timeout: 15_000 },
  use: { baseURL: 'http://localhost:4325' },
  webServer: {
    command: 'node e2e/static-server.mjs',
    url: 'http://localhost:4325',
    reuseExistingServer: !process.env.CI,
    timeout: 20_000,
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
});
