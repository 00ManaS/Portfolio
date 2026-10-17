import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { projects } from "../src/lib/projects";

const routes = ["/", "/about", "/projects", "/contact", ...projects.map((p) => `/projects/${p.slug}`)];

for (const route of routes) {
  test.describe(`page ${route}`, () => {
    test("loads cleanly", async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => message.type() === "error" && errors.push(message.text()));

      const response = await page.goto(route, { waitUntil: "networkidle" });
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page).toHaveTitle(/Sanam Thapa/);
      expect(await page.locator('meta[name="description"]').getAttribute("content")).toBeTruthy();
      expect(errors).toEqual([]);
    });

    test("fits the viewport without sideways scrolling", async ({ page }) => {
      await page.goto(route);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });

    for (const colorScheme of ["light", "dark"] as const) {
      test(`has no accessibility violations (${colorScheme})`, async ({ page }) => {
        // Before navigating: the pre-paint theme script reads it on load.
        await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
        await page.goto(route, { waitUntil: "networkidle" });
        const { violations } = await new AxeBuilder({ page }).analyze();
        const summary = violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
        expect(summary).toEqual([]);
      });
    }
  });
}

test("unknown pages return a real 404", async ({ page }) => {
  const response = await page.goto("/definitely-not-a-page");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found");
});

test("every internal link resolves", async ({ page, request }) => {
  const hrefs = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    for (const href of await page.locator('a[href^="/"]').evaluateAll((links) =>
      links.map((link) => link.getAttribute("href")!),
    )) {
      hrefs.add(href.split("#")[0] || "/");
    }
  }
  for (const href of hrefs) {
    const response = await request.get(href);
    expect(response.status(), href).toBe(200);
  }
});
