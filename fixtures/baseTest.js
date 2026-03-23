const base = require('@playwright/test');

const { LoginPage } = require('../pages/LoginPage');

exports.test = base.test.extend({

  // Custom fixture: loginPage
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await use(loginPage); // this makes it available in test

    // optional teardown
    console.log("Test completed");
  },
  
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  }

});