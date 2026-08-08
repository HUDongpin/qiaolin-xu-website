import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const routes = ["/", "/teaching", "/experience", "/education", "/qualifications", "/service", "/contact"];
const routeLinks = ["/teaching", "/experience", "/education", "/qualifications", "/service", "/contact"];
const publicName = "Qiaolin XU (Shirleen)";

async function collectPageErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

test.describe("multi-page portfolio", () => {
  for (const route of routes) {
    test(`${route} renders a distinct, accessible page`, async ({ page }) => {
      const errors = await collectPageErrors(page);
      const response = await page.goto(route, { waitUntil: "networkidle" });

      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(new RegExp(publicName.replace(/[()]/g, "\\$&")));
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("header.site-header")).toHaveCount(1);
      await expect(page.locator('nav[aria-label="Primary navigation"]')).toHaveCount(1);
      await expect(page.locator("main#main-content")).toHaveCount(1);
      await expect(page.locator("footer.site-footer")).toHaveCount(1);
      await expect(page.locator('a[aria-current="page"]:visible')).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        route === "/" ? "https://www.xuqiaolin.com" : `https://www.xuqiaolin.com${route}`,
      );

      const navigationHrefs = await page
        .locator(".desktop-nav .nav-link")
        .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
      expect(navigationHrefs).toEqual(routeLinks);
      expect(navigationHrefs.every((href) => href && !href.includes("#"))).toBe(true);

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      expect(overflow).toBe(0);
      expect(errors).toEqual([]);

      const failedImages = await page
        .locator("img")
        .evaluateAll(
          (images) =>
            images.filter(
              (image) =>
                !(image as HTMLImageElement).complete || (image as HTMLImageElement).naturalWidth === 0,
            ).length,
        );
      expect(failedImages).toBe(0);

      const accessibility = await new AxeBuilder({ page }).analyze();
      const seriousViolations = accessibility.violations.filter((violation) =>
        ["critical", "serious"].includes(violation.impact ?? ""),
      );
      expect(seriousViolations).toEqual([]);
    });
  }

  test("desktop navigation changes pages without hash fragments", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1024 });
    await page.goto("/");

    for (const href of routeLinks) {
      await page.locator(`.desktop-nav a[href="${href}"]`).click();
      await expect(page).toHaveURL(new RegExp(`${href}$`));
      expect(new URL(page.url()).hash).toBe("");
    }
  });

  test("mobile navigation exposes every page and restores focus on Escape", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/education");

    await expect(page.locator(".desktop-nav")).toBeHidden();
    const menu = page.getByRole("button", { name: "Menu, open navigation" });
    await expect(menu).toBeVisible();
    await expect(menu).toHaveAttribute("aria-expanded", "false");

    await menu.click();
    await expect(page.getByRole("button", { name: "Close navigation menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    await expect(page.locator("#mobile-navigation .nav-link")).toHaveCount(routeLinks.length);
    await expect(page.locator('#mobile-navigation a[aria-current="page"]')).toHaveText("Education");
    await expect(page.locator("#mobile-navigation .mobile-download")).toHaveText("Download CV");

    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();
    await expect(page.locator("#mobile-navigation")).toBeHidden();

    await menu.click();
    await page.locator('#mobile-navigation a[href="/qualifications"]').click();
    await expect(page).toHaveURL(/\/qualifications$/);
    await expect(page.locator("#mobile-navigation")).toBeHidden();
  });

  test("home hero fits the first desktop viewport", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const hero = page.locator(".home-hero");
    const h1 = hero.locator("h1");
    const primaryAction = hero.locator(".actions .primary");
    const h1Metrics = await h1.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      const lineHeight = Number.parseFloat(getComputedStyle(element).lineHeight);
      return { lineCount: rect.height / lineHeight };
    });
    const actionBox = await primaryAction.boundingBox();

    expect(h1Metrics.lineCount).toBeLessThanOrEqual(2.05);
    expect(actionBox).not.toBeNull();
    expect(actionBox!.y + actionBox!.height).toBeLessThanOrEqual(800);

    const panels = await page
      .locator(".photo-diptych > div")
      .evaluateAll((elements) => elements.map((element) => element.getBoundingClientRect().height));
    expect(Math.abs(panels[0] - panels[1])).toBeLessThan(0.5);
  });

  test("home is concise and no longer contains the full CV", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Academic Affairs Officer / Part-time Lecturer")).toHaveCount(0);
    await expect(
      page.getByText("Master of Education in Early Childhood Education", { exact: true }),
    ).toHaveCount(0);
    await expect(page.getByText("38th Hong Kong Special Olympics Indoor Rowing Competition")).toHaveCount(0);

    const summary = await page.locator(".hero-summary").innerText();
    expect(summary.trim().split(/\s+/)).toHaveLength(18);
  });

  test("visible controls meet the minimum target size", async ({ page }) => {
    for (const viewport of [
      { width: 390, height: 844 },
      { width: 1440, height: 1024 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto("/");
      const tooSmall = await page.locator("a, button").evaluateAll((elements) =>
        elements
          .filter((element) => {
            const style = getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            return (
              style.display !== "none" &&
              style.visibility !== "hidden" &&
              rect.width > 0 &&
              rect.height > 0 &&
              element.textContent?.trim() !== "Skip to content"
            );
          })
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return { text: element.textContent?.trim(), width: rect.width, height: rect.height };
          })
          .filter((target) => target.width < 44 || target.height < 44),
      );
      expect(tooSmall).toEqual([]);
    }
  });

  test("all routes reflow without horizontal overflow", async ({ page }) => {
    for (const viewport of [
      { width: 320, height: 568 },
      { width: 390, height: 844 },
      { width: 768, height: 1024 },
      { width: 1024, height: 768 },
      { width: 1181, height: 800 },
      { width: 1280, height: 800 },
      { width: 1440, height: 1024 },
    ]) {
      await page.setViewportSize(viewport);
      for (const route of routes) {
        await page.goto(route);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
        expect(overflow, `${route} at ${viewport.width}x${viewport.height}`).toBe(0);
      }
    }
  });

  test("dark mode and reduced motion remain usable", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });

    for (const route of routes) {
      await page.goto(route);
      const bodyColors = await page.locator("body").evaluate((body) => {
        const style = getComputedStyle(body);
        return { color: style.color, background: style.backgroundColor };
      });
      expect(bodyColors.color).toBe("rgb(237, 242, 242)");
      expect(bodyColors.background).toBe("rgb(16, 22, 25)");

      const accessibility = await new AxeBuilder({ page }).analyze();
      const seriousViolations = accessibility.violations.filter((violation) =>
        ["critical", "serious"].includes(violation.impact ?? ""),
      );
      expect(seriousViolations).toEqual([]);
    }
  });

  test("public CV is a real PDF and public metadata endpoints resolve", async ({ request }) => {
    const cv = await request.get("/Qiaolin-XU-Shirleen-CV.pdf");
    expect(cv.status()).toBe(200);
    expect(cv.headers()["content-type"]).toContain("application/pdf");
    expect((await cv.body()).subarray(0, 5).toString()).toBe("%PDF-");

    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    const sitemapText = await sitemap.text();
    for (const route of routes) {
      const expected = route === "/" ? "https://www.xuqiaolin.com" : `https://www.xuqiaolin.com${route}`;
      expect(sitemapText).toContain(expected);
    }

    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
    expect(await robots.text()).toContain("https://www.xuqiaolin.com/sitemap.xml");

    const socialImage = await request.get("/opengraph-image");
    expect(socialImage.status()).toBe(200);
    expect(socialImage.headers()["content-type"]).toContain("image/png");
  });

  test("visible copy contains no unsupported claims or dash characters", async ({ page }) => {
    const bannedClaims = [
      "licensed teacher",
      "certified teacher",
      "Praxis passed",
      "MAT candidate",
      "K-12 teacher",
    ];

    for (const route of routes) {
      await page.goto(route);
      const text = await page.locator("body").innerText();
      expect(text).toContain(publicName);
      expect(text).not.toMatch(/[—–]/u);
      expect(text).not.toMatch(/\b[2-9]\d{7}\b/u);
      for (const claim of bannedClaims) expect(text.toLowerCase()).not.toContain(claim.toLowerCase());
    }
  });

  test("unknown routes return a designed 404", async ({ page }) => {
    const response = await page.goto("/not-a-real-page");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1, name: "Page not found." })).toBeVisible();
    await expect(page.getByRole("link", { name: "Return home" })).toHaveAttribute("href", "/");
  });
});
