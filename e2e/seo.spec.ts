import { expect, test } from "@playwright/test";

test.describe("metadata routes", () => {
  // Same files whatever the device, so one project is enough.
  test.beforeEach(({ isMobile }) => test.skip(isMobile));

  test("robots.txt points at the sitemap", async ({ request }) => {
    const body = await (await request.get("/robots.txt")).text();
    expect(body).toMatch(/Sitemap: .*\/sitemap\.xml/);
  });

  test("sitemap lists every page and no drafts", async ({ request }) => {
    const body = await (await request.get("/sitemap.xml")).text();
    for (const path of ["/about", "/projects", "/contact", "/projects/inventory-manager"]) {
      expect(body).toContain(`${path}</loc>`);
    }
    // The only post is a draft, so the blog stays out of the sitemap for now.
    expect(body).not.toContain("/blog/stock-check-that-still-oversold");
  });

  test("social image and favicon render as PNGs", async ({ request }) => {
    for (const path of ["/opengraph-image", "/icon"]) {
      const response = await request.get(path);
      expect(response.status(), path).toBe(200);
      expect(response.headers()["content-type"]).toBe("image/png");
    }
  });

  test("home page describes the person to search engines", async ({ page }) => {
    await page.goto("/");
    const json = await page.locator('script[type="application/ld+json"]').textContent();
    const data = JSON.parse(json!);
    expect(data["@type"]).toBe("Person");
    expect(data.name).toBe("Sanam Thapa");
    expect(data.sameAs).toContain("https://github.com/00ManaS");
  });

  test("drafts stay off the live site", async ({ request }) => {
    expect((await request.get("/blog")).status()).toBe(404);
    expect((await request.get("/blog/stock-check-that-still-oversold")).status()).toBe(404);
  });
});
