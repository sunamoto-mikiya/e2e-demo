import { test as setup , expect} from '@playwright/test';

setup('ログイン処理', async ({ page }) => {
    await page.goto('http://localhost:8090/sunamoto/admin/login');
    await page.getByPlaceholder('管理者ID').click();
    await page.getByPlaceholder('管理者ID').fill('sunamoto');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('password');
    await page.getByRole('button', { name: 'ログイン' }).click();
    // ログインセッション情報をエクスポート
    await page
    .context()
    .storageState({ path: `sigfy-test/login-state.json` });
    // ログイン後画面遷移
    await expect(page).toHaveURL(/.*users/);
  });
