const { test } = require('../fixtures/baseTest');
const { expect } = require('@playwright/test');

test('Login Test', async ({ loginPage, page }) => {

  await test.step('Open login page', async () => {
    await loginPage.navigate();
  });

  await test.step('Enter credentials', async () => {
    await loginPage.login(process.env.PAYROLL_USER || 'balu@it.com', process.env.PAYROLL_PASS || 'Spayroll@17');

    await expect(page).toHaveTitle('Sumopayroll | Dashboard');
  });

});
