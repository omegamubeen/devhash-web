import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const paths = [
  '/de',
  '/en',
  '/de/leistungen',
  '/de/leistungen/webentwicklung',
  '/de/leistungen/mobile-app-entwicklung',
  '/en/services/custom-software',
  '/de/preise',
  '/de/ueber-uns',
  '/de/kontakt',
  '/de/impressum',
  '/de/datenschutz',
];

test.describe('@a11y accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
  });
  for (const path of paths) {
    test(`has no detectable WCAG A/AA violations: ${path}`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
    });
  }

  test('mobile menu opens, closes on Escape and restores focus', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/de');
    // Locate by aria-controls — the toggle's accessible name flips when open.
    const toggle = page.locator('button[aria-controls="mobile-menu"]');
    await toggle.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    // Focus returns to the toggle that opened the menu.
    await expect(toggle).toBeFocused();
  });
});
