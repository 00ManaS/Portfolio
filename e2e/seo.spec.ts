import { expect, test } from "@playwright/test";

test.describe("metadata routes", () => {
  // Same files whatever the device, so one project is enough.
  test.beforeEach(({ isMobile }) => test.skip(isMobile));

  test("robots.txt points at the sitemap", async ({ request }) => {
    const body = await (await request.get("/robots.txt")).text();
    expect(body).toMatch(/Sitemap: .*\/sitemap\.xml/);
  });

  test("sitemap lists every page", async ({ request }) => {
    const body = await (await request.get("/sitemap.xml")).text();
    for (const path of ["/about", "/projects", "/contact", "/projects/inventory-manager"]) {
      expect(body).toContain(`${path}</loc>`);
    }
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
    const graph: Record<string, unknown>[] = JSON.parse(json!)["@graph"];
    const person = graph.find((node) => node["@type"] === "Person")!;
    expect(person.name).toBe("Sanam Thapa");
    expect(person.sameAs).toContain("https://github.com/00ManaS");
    const website = graph.find((node) => node["@type"] === "WebSite")!;
    expect(website.name).toBe("Sanam Thapa");
  });

  test("each page describes and links to itself", async ({ page }) => {
    const descriptions = new Set<string>();
    for (const path of ["/", "/about", "/projects", "/contact", "/projects/inventory-manager"]) {
      await page.goto(path);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      const ogUrl = await page.locator('meta[property="og:url"]').getAttribute("content");
      expect(new URL(canonical!).pathname, path).toBe(path);
      expect(ogUrl, path).toBe(canonical);
      expect(await page.locator('meta[property="og:title"]').getAttribute("content")).toBe(
        await page.title(),
      );
      expect(await page.locator('meta[property="og:image"]').count(), path).toBeGreaterThan(0);
      descriptions.add((await page.locator('meta[name="description"]').getAttribute("content"))!);
    }
    expect(descriptions.size).toBe(5);
  });
});
