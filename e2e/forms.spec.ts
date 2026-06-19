import { test, expect } from '@playwright/test';

test.describe('contact enquiry form', () => {
  test('shows validation errors for an empty submit', async ({ page }) => {
    await page.goto('/en/contact');
    await page.getByRole('button', { name: /send enquiry/i }).click();
    await expect(page.getByText(/please enter your name/i)).toBeVisible();
    await expect(page.getByText(/please choose a topic/i)).toBeVisible();
  });

  test('accepts a valid enquiry (delivery disabled → success state)', async ({
    page,
  }) => {
    await page.goto('/en/contact');
    await page.getByLabel(/name/i).first().fill('Maria Muster');
    await page.getByLabel(/email/i).first().fill('maria@example.at');
    await page.getByLabel(/what.s it about/i).selectOption('web');
    await page
      .getByLabel(/your message/i)
      .fill('We would like a new website for our company.');
    await page.getByLabel(/i agree/i).check();
    await page.getByRole('button', { name: /send enquiry/i }).click();
    await expect(
      page.getByRole('heading', { name: /thanks for your enquiry/i }),
    ).toBeVisible();
  });
});
