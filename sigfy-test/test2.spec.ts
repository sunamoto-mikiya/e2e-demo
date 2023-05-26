import { test, expect } from '@playwright/test';
import { chromium } from '@playwright/test';

test('アンケートページにアクセス', async ({ page }) => {
  await page.goto('http://localhost:8090/sunamoto/admin/users');
  //一覧ページのスクリーンショット
  expect(await page.screenshot({ fullPage: true })).toMatchSnapshot()
  await page.screenshot({ path: `my-report/images/${'chromium'}.png` })
  
  // アンケート一覧ページに遷移
  await page.getByText('アンケート').click();
  await page.getByRole('listitem').filter({ hasText: 'アンケート 一覧 登録' }).getByRole('link', { name: '一覧' }).click();
  await expect(page).toHaveURL(/.*questionnaires/);
});

test('アンケート作成', async ({ page }) => {
  await page.goto('http://localhost:8090/sunamoto/admin/questionnaires/add');
  expect(await page.screenshot({ fullPage: true })).toMatchSnapshot()
  await page.screenshot({ path: `my-report/images/${'chromium'}.png` })

  await page.getByRole('textbox').first().fill('name');
  await page.getByRole('row', { name: '  削除' }).getByRole('textbox').fill('hoge');
  await page.getByText('追加').first().click();
  await page.getByRole('textbox').nth(2).fill('hogehoge');
  await page.getByRole('checkbox').nth(1).check();
  await page.getByRole('link', { name: '' }).click();
  await page.getByRole('link', { name: '' }).click();
  await page.locator('#gender').getByText('個人選択').click({timeout: 9000});
  await page.getByRole('button', { name: '選択してください' }).click();
  await page.getByRole('listitem').filter({ hasText: 'テストグループ' }).getByRole('option', { name: 'テストグループ' }).click();
  await page.locator('[id="\\35 5-selectable"]').getByText('sunamoto (sunamoto1)sunamotosunamoto1').click();
  await page.locator('#wizard').getByRole('link', { name: '登録', exact: true }).click();
  await page.goto('http://localhost:8090/sunamoto/admin/questionnaires');
  await page.getByRole('row', { name: 'name 実施中 1 0(0%) ' }).getByRole('link', { name: 'name' });
  await expect(page).toHaveTitle(/name/);
});

  

  
