const base = require('@playwright/test');

const { LoginPage } = require('../pages/LoginPage');

const { getExcelData } = require('../utils/excelUtil');

exports.test = base.test.extend({

  // Custom fixture: loginPage
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await use(loginPage); // this makes it available in test

    // optional teardown
    console.log("Test completed");
  },

  // Custom fixture: testData
  testData: async ({ }, use) => {
    const data = getExcelData('ExcelData.xlsx', 'Login');
    await use(data);
  }
});