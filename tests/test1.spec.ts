import { test, expect } from '@playwright/test';
import { chromium } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:8090/sunamoto/admin/users');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Zenn/);
});

test('初期ページアクセス', async ({ page }) => {
  await page.goto('https://zenn.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Explore' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*explore/);
});

test('bookタブ確認', async ({ page }) => {
  await page.goto('https://zenn.dev/articles/explore');

  // Click the get started link.
  await page.getByRole('link', { name: 'Books' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL('https://zenn.dev/books/explore');
});

test('検索入力', async ({ page }) => {
  await page.goto('https://zenn.dev/search');

  // Click the get started link.
  await page.getByPlaceholder('キーワードを入力...').click();
  await page.getByPlaceholder('キーワードを入力...').fill('laravel');
  await page.getByPlaceholder('キーワードを入力...').press('Enter');
  // Expects the URL to contain intro.
  await expect(page).toHaveURL('https://zenn.dev/search?q=laravel');
});

test('言語別ページ', async ({ page }) => {
  await page.goto('https://zenn.dev/search');

  // Click the get started link.
  await page.getByRole('link', { name: 'Python' }).click();
  await expect(page).toHaveTitle(/laravel/);

  // Expects the URL to contain intro.
  await expect(page).toHaveURL('https://zenn.dev/search?q=laravel');
});

test('スクリーンショット', async () => {
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto('https://zenn.dev/search')
  expect(await page.screenshot({ fullPage: true })).toMatchSnapshot()
  await page.screenshot({ path: `my-report/images/${'chromium'}.png` })
  await browser.close()
});

