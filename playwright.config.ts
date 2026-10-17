import { defineConfig, devices } from "@playwright/test";

// A port of its own, so the suite never collides with `npm run dev` on 3001.
const PORT = 3100;
const CI = Boolean(process.env.CI);

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 1 : 0,
  reporter: CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    // Settles scroll reveals and entrance animations instantly, so checks
    // (contrast especially) never catch an element mid-fade.
    reducedMotion: "reduce",
    trace: "on-first-retry",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  // Tests run against a production build: what visitors get, drafts hidden.
  // CI builds in its own step first; locally this builds for you.
  webServer: {
    command: CI ? `npx next start -p ${PORT}` : `npm run build && npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !CI,
    timeout: 180_000,
  },
});
