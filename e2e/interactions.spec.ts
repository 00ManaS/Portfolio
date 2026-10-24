import { expect, test } from "@playwright/test";

test("theme toggle switches and survives a reload", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const html = page.locator("html");
  await expect(html).not.toHaveClass(/\bdark\b/);

  await page.getByRole("button", { name: "Toggle dark mode" }).click();
  await expect(html).toHaveClass(/\bdark\b/);

  await page.reload();
  await expect(html).toHaveClass(/\bdark\b/);
});

test("skip link is the first stop for keyboard users", async ({ page, isMobile }) => {
  test.skip(isMobile, "no hardware keyboard");
  await page.goto("/about");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
});

test.describe("chat widget", () => {
  test("answers suggested and typed questions, then closes", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Ask me a question" }).click();
    const panel = page.getByRole("dialog", { name: "Ask me anything" });
    const log = panel.getByRole("log");

    await panel.getByRole("button", { name: "What's your tech stack?" }).click();
    await expect(log).toContainText("TypeScript");

    const input = panel.getByRole("textbox", { name: "Type a question" });
    await input.fill("where are you based?");
    await input.press("Enter");
    await expect(log).toContainText("Pokhara");

    await input.fill("what is your favourite pizza");
    await input.press("Enter");
    await expect(log).toContainText("not in my notes");

    await page.keyboard.press("Escape");
    await expect(panel).toBeHidden();
    await expect(page.getByRole("button", { name: "Ask me a question" })).toBeFocused();
  });
});

test.describe("project quick look", () => {
  test.beforeEach(({ isMobile }) => test.skip(isMobile, "pointer-driven"));

  test("opens, steps between projects and closes", async ({ page }) => {
    await page.goto("/projects");
    await page.getByRole("link", { name: "Quick look at Smart JobSewa" }).click();
    const title = page.locator("#gallery-title");
    await expect(title).toHaveText("Smart JobSewa");
    await expect(page.locator("html")).toHaveCSS("overflow", "hidden");

    await page.keyboard.press("ArrowRight");
    await expect(title).toHaveText("B2B MedSupply");

    await page.keyboard.press("Escape");
    await expect(page.locator("dialog[open]")).toHaveCount(0);
    await expect(page.locator("html")).not.toHaveCSS("overflow", "hidden");
  });

  test("leaves modified clicks to the browser", async ({ page }) => {
    await page.goto("/projects");
    const link = page.getByRole("link", { name: "Quick look at Smart JobSewa" });
    await expect(link).toHaveAttribute("href", "/projects/smart-jobsewa");
    const result = await link.evaluate((anchor) => {
      let prevented = true;
      // Registered on document, so it runs after React's root listener has had its turn,
      // and then stops the browser actually opening a tab.
      document.addEventListener(
        "click",
        (event) => {
          prevented = event.defaultPrevented;
          event.preventDefault();
        },
        { once: true },
      );
      anchor.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, metaKey: true }));
      return { prevented, dialogOpen: document.querySelector("dialog[open]") !== null };
    });
    expect(result).toEqual({ prevented: false, dialogOpen: false });
  });
});

test("project screenshots open full size", async ({ page, isMobile }) => {
  test.skip(isMobile, "same component on both; desktop is enough");
  await page.goto("/projects/inventory-manager");
  await page.getByRole("link", { name: /Dashboard with sales/ }).click();
  const viewer = page.getByRole("dialog", { name: "Inventory Manager screenshots" });
  await expect(viewer).toBeVisible();
  await expect(viewer).toContainText("1 / 4");
  await page.keyboard.press("ArrowRight");
  await expect(viewer).toContainText("2 / 4");
  await page.keyboard.press("Escape");
  await expect(viewer).toBeHidden();
});

test("the demo video only downloads when it's needed", async ({ page }) => {
  const videoRequests: string[] = [];
  page.on("request", (request) => request.url().endsWith(".webm") && videoRequests.push(request.url()));
  await page.goto("/", { waitUntil: "networkidle" });
  expect(videoRequests).toEqual([]);
});

test.describe("copy buttons", () => {
  test.use({ permissions: ["clipboard-read", "clipboard-write"] });
  test.beforeEach(({ browserName }) => test.skip(browserName !== "chromium", "clipboard permissions"));

  test("copy the demo login and the contact email", async ({ page }) => {
    await page.goto("/projects/inventory-manager");
    await page.getByRole("button", { name: "Copy email", exact: true }).click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("owner@demo.com");

    await page.goto("/contact");
    await page.getByRole("button", { name: "Copy email address" }).click();
    await expect(page.getByRole("button", { name: "email address copied" })).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("thapasanam149@gmail.com");
  });
});

test.describe("command menu", () => {
  test.beforeEach(({ isMobile }) => test.skip(isMobile, "keyboard shortcut"));

  test("opens with the shortcut, filters, and navigates", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("ControlOrMeta+k");
    const menu = page.getByRole("dialog", { name: "Command menu" });
    await expect(menu).toBeVisible();

    const search = menu.getByRole("combobox");
    await expect(search).toBeFocused();
    await search.fill("inventory");
    await expect(menu.getByRole("option")).toHaveCount(1);
    await search.press("Enter");

    await expect(page).toHaveURL(/\/projects\/inventory-manager$/);
    await expect(menu).toBeHidden();
  });

  test("shows a no-results state", async ({ page }) => {
    await page.goto("/about");
    await page.keyboard.press("ControlOrMeta+k");
    const menu = page.getByRole("dialog", { name: "Command menu" });
    await menu.getByRole("combobox").fill("zzzz");
    await expect(menu).toContainText("Nothing matches");
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
  });
});

test.describe("mobile menu", () => {
  test.beforeEach(({ isMobile }) => test.skip(!isMobile, "phone layout only"));

  test("opens, navigates and closes itself", async ({ page }) => {
    await page.goto("/");
    const sheet = page.locator("#mobile-nav");
    await expect(sheet).toHaveJSProperty("offsetHeight", 0);

    await page.getByRole("button", { name: "Open menu" }).click();
    await sheet.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(sheet).toHaveJSProperty("offsetHeight", 0);
  });
});
