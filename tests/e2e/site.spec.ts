import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const sites = ["amihan", "sibuyan"];
const pages = ["home", "rooms", "contact"];
const viewports = [
  { name: "390", width: 390, height: 844 },
  { name: "1440", width: 1440, height: 900 }
];

for (const site of sites) {
  for (const slug of pages) {
    for (const vp of viewports) {
      test(`${site}/${slug} @ ${vp.name}px — no overflow, axe, screenshot`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(`/sites/${site}/${slug}`, { waitUntil: "networkidle" });
        await expect(page.locator("h1")).toBeVisible();
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow).toBeLessThanOrEqual(1);
        const results = await new AxeBuilder({ page }).analyze();
        const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
        expect(serious, JSON.stringify(serious.map((v) => v.id))).toEqual([]);
        await page.screenshot({ path: `docs/screenshots/${site}-${slug}-${vp.name}.png`, fullPage: true });
      });
    }
  }
}

test("all 7 pages render for both demo sites", async ({ page }) => {
  for (const site of sites) {
    for (const slug of ["home", "rooms", "amenities", "gallery", "location", "about", "contact"]) {
      await page.goto(`/sites/${site}/${slug}`);
      await expect(page.locator("h1").first()).toBeVisible();
      expect(await page.content()).toContain(site === "amihan" ? "Amihan" : "Sibuyan");
    }
  }
});

test("palette and profile switcher works", async ({ page }) => {
  await page.goto("/sites/amihan/home");
  await page.getByRole("button", { name: "ember" }).click();
  await expect(page.locator("body")).toBeVisible();
  await page.getByRole("link", { name: /Switch profile/ }).click();
  await expect(page).toHaveURL(/\/sites\/sibuyan\/home/);
});
