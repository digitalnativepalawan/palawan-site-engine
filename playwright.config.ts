import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  timeout: 60000,
  forbidOnly: !!process.env["CI"],
  retries: process.env["CI"] ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry"
  },
  projects: [
    { name: "chromium", use: { browserName: "chromium" } }
  ],
  webServer: {
    command: "pnpm --filter web start --port 3000",
    url: "http://127.0.0.1:3000/templates",
    reuseExistingServer: true,
    timeout: 120000
  }
});
