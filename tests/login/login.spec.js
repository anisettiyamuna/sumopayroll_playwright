const { test } = require('../../fixtures/baseTest');
const { expect } = require('@playwright/test');
const { getExcelData } = require('../../utils/excelUtil');
const testData = getExcelData('ExcelData.xlsx', 'Login');
const { loginValidAndInvalidData } = require('../../utils/helpers');
//Valid User Login
test.only('Login Test with ENV', async ({ loginPage, page }) => {
  loginValidAndInvalidData();

  await test.step('Open login page', async () => {
    // navigate() is already called in the fixture
  });

  await test.step('Verify page title', async () => {
    const title = await loginPage.getTitle();
    expect(title).toBe('Welcome to Sumopayroll | Login');
  });

  await test.step('Enter credentials', async () => {
    await loginPage.login(process.env.PAYROLL_USER || 'balus@it.com', process.env.PAYROLL_PASS || 'Sumo@123', process.env.Company);

    await expect(page).toHaveTitle('Sumopayroll | Dashboard');
  });

});

//Invalid User Login

test('Login Test with Invalid Credentials with ENV', async ({ loginPage, page }) => {

  await test.step('Open login page', async () => {
    // navigate() is already called in the fixture
  });

  await test.step('Verify page title', async () => {
    const title = await loginPage.getTitle();
    expect(title).toBe('Welcome to Sumopayroll | Login');
  });

  await test.step('Enter invalid credentials', async () => {
    await loginPage.login(process.env.INVALID_USER || 'balus@it.com', process.env.INVALID_PASS || 'Invalid@123');
  });
});

//Data driven test using Excel

testData.forEach((data, index) => {

  test(`Login Test - ${index}`, async ({ page }) => {

    await page.goto(process.env.BASE_URL || 'http://localhost/Payroll/Sumo-Payroll/public/login');
    const emailInput = page.locator('#email');
    const passwordInput = page.locator('#password');
    const confirmPassword = page.locator('#confirmpassword');
    const updateBtn = page.locator('#btn-reset');
    const errorMsg = page.locator('.alert-danger');
    const loginLink = page.locator(':text-is("Click here to login.")');
    const loginBtn = page.locator('#btn-login');
    const companyList = page.locator('.login_companies_list');
    const chooseCompany = page.locator('.choose_company');
    const companyLocator = page.locator(`:text("${process.env.Company}")`);
    const emailError = page.locator('#email-error');

    await emailInput.fill(data.username);
    await passwordInput.fill(data.password);
    await loginBtn.click();

    //Update password flow handling
    if (page.url().includes('password/update')) {
      await passwordInput.fill(process.env.PAYROLL_PASS);
      await confirmPassword.fill(process.env.PAYROLL_PASS);
      await updateBtn.click();
      await loginLink.click();
      await emailInput.fill(data.username);
      await passwordInput.fill(data.password);
      await loginBtn.click();

    } else {
      console.log("No password update required, proceeding with login...");
    }

    if (await chooseCompany.isVisible()) {
      await companyLocator.click();

    } else if (await companyList.isVisible()) {
      await companyList.first().click();
      console.log("Click on first company..");
    } else {
      console.log("No company selection required, proceeding to dashboard...");
    }
    // validation
    if (data.expected === 'success') {
      await expect(page).toHaveURL('http://localhost/Payroll/Sumo-Payroll/public/');
    } else if (data.expected === 'error') {
      await expect(errorMsg)
        .toContainText('Incorrect Email or Password')
    }
    else {
      await expect(emailError).toContainText('email address');
    }
  });

});
