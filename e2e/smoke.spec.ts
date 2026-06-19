import { test, expect } from '@playwright/test';

test.describe('routing & navigation', () => {
  test('root redirects to a locale home', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/(de|en)$/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('renders the home hero and primary nav', async ({ page }) => {
    await page.goto('/de');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(
      page.getByRole('navigation', { name: /hauptnavigation/i }),
    ).toBeVisible();
  });

  test('uses localized German pathnames', async ({ page }) => {
    await page.goto('/de');
    await page
      .getByRole('navigation', { name: /hauptnavigation/i })
      .getByRole('link', { name: 'Leistungen' })
      .click();
    await expect(page).toHaveURL(/\/de\/leistungen$/);
  });

  test('language switch keeps the equivalent page and maps the slug', async ({
    page,
  }) => {
    await page.goto('/de/leistungen/webentwicklung');
    await page.getByRole('link', { name: /switch to english/i }).click();
    await expect(page).toHaveURL(/\/en\/services\/web-development$/);
  });

  test('unknown paths render a 404', async ({ page }) => {
    const res = await page.goto('/de/does-not-exist');
    expect(res?.status()).toBe(404);
  });

  test('has a self-referencing canonical and hreflang alternates', async ({ page }) => {
    await page.goto('/en/pricing');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      /\/en\/pricing$/,
    );
    await expect(page.locator('link[hreflang="de-AT"]')).toHaveAttribute(
      'href',
      /\/de\/preise$/,
    );
    await expect(page.locator('link[hreflang="x-default"]')).toHaveCount(1);
  });
});
