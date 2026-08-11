import { test, expect } from '@playwright/test';

const FORMSPREE_MOCK = '**/f/e2e-mock';

test('root redirects to /ar/', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/ar\/$/);
});

test('locale pages carry correct lang and dir', async ({ page }) => {
  await page.goto('/ar/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await page.goto('/en/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
});

test('docs list shows all 4 documents', async ({ page }) => {
  await page.goto('/ar/docs/');
  await expect(page.locator('main ul li')).toHaveCount(4);
  await page.goto('/en/docs/');
  await expect(page.locator('main ul li')).toHaveCount(4);
});

test('pdf viewer renders a document canvas', async ({ page }) => {
  await page.goto('/ar/docs/code-of-conduct/');
  await expect(page.locator('.react-pdf__Page__canvas')).toBeVisible({ timeout: 30_000 });
});

test('pdf viewer shows page counter and zoom works', async ({ page }) => {
  await page.goto('/ar/docs/code-of-conduct/');
  await expect(page.locator('.react-pdf__Page__canvas')).toBeVisible({ timeout: 30_000 });
  await expect(page.getByText(/صفحة \d+ من \d+/)).toBeVisible();
  const pct = page.locator('span:has-text("%")').first();
  const before = await pct.textContent();
  await page.click('button:has-text("+")');
  await expect(pct).not.toHaveText(before ?? '');
});

test('join form validates required fields', async ({ page }) => {
  await page.goto('/en/join/');
  await page.click('button[type=submit]');
  await expect(page.getByText('Please enter your name.')).toBeVisible();
  await expect(page.getByText('Please enter a valid email address.')).toBeVisible();
});

test('join form submits to the formspree endpoint', async ({ page }) => {
  let posted = false;
  await page.route(FORMSPREE_MOCK, async (route) => {
    posted = true;
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
  });
  await page.goto('/en/join/');
  await page.fill('#name', 'Test Member');
  await page.fill('#email', 'test@example.com');
  await page.click('button[type=submit]');
  await expect(page.getByRole('status')).toHaveText(
    'Your application has been received. We will contact you soon.'
  );
  expect(posted).toBe(true);
});

test('unknown route returns the 404 page', async ({ page }) => {
  await page.goto('/ar/this-page-does-not-exist/');
  await expect(page.getByText('الصفحة غير موجودة')).toBeVisible();
});

test('key pages emit no console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));
  const urls = ['/ar/', '/en/', '/ar/docs/', '/ar/join/', '/ar/docs/code-of-conduct/'];
  for (const url of urls) {
    await page.goto(url);
    await page.waitForLoadState('networkidle');
  }
  expect(errors).toEqual([]);
});
