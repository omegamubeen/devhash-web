import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'mobile-360', width: 360, height: 800 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1280', width: 1280, height: 800 },
  { name: 'wide-1440', width: 1440, height: 900 },
];

const pages = [
  { name: 'home', path: '/de' },
  { name: 'services', path: '/de/leistungen' },
  { name: 'service-detail', path: '/de/leistungen/webentwicklung' },
  { name: 'pricing', path: '/de/preise' },
  { name: 'contact', path: '/de/kontakt' },
];

test.describe('@visual regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
  });
  for (const vp of viewports) {
    for (const p of pages) {
      test(`${p.name} @ ${vp.name}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(p.path);
        // Settle entrance animations + fonts.
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(400);
        await expect(page).toHaveScreenshot(`${p.name}-${vp.name}.png`, {
          fullPage: true,
          animations: 'disabled',
        });
      });
    }
  }
});
