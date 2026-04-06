const { test } = require('../fixtures/baseTest');
const { expect } = require('@playwright/test');
const { getExcelData } = require('../utils/excelUtil');
const testData = getExcelData('ExcelData.xlsx', 'HRrequest');
const { loginValidAndInvalidData } = require('../utils/helpers');
const { isAt } = require('../utils/helpers');

//Data driven test using Excel
testData.forEach((data, index) => {

  test(`HR Request Test - ${index}`, async ({ loginPage, page }) => {

    loginValidAndInvalidData();
    const myReqViewURL = "/hrrequests/user?id=";
    await test.step('Open login page', async () => {
      // navigate() is already called in the fixture
    });

    const title = await loginPage.getTitle();
    expect(title).toBe('Welcome to Sumopayroll | Login');

    const dashboardPage = await loginPage.login(process.env.ADMIN_USERNAME || 'balus@it.com', process.env.ADMIN_PASSWORD || 'Sumo@123', process.env.Company);

    // Add steps to navigate to HR Requests and perform actions based on test data
    const getTitle = await dashboardPage.getTitle();
    expect(getTitle).toBe('Sumopayroll | Dashboard');
    // Example: await dashboardPage.navigateToHRRequests();
    // Example: await dashboardPage.createHRRequest(data.requestType, data.description);
    const hrrequestPage = await dashboardPage.clickOnCreateHRRequest();
    await expect(page).toHaveURL(/hrrequests.*create/);

    const hrRequestTitle = await hrrequestPage.getTitle();
    await expect(hrRequestTitle).toBe('Sumopayroll | Create HR Request');

    // Adjust URL as needed
    await hrrequestPage.createHRRequest(data.requestType, data.description);
    await page.waitForTimeout(2000);
    const status = await page.locator('span.statusTag.greenTag').textContent();
    expect(status.trim()).toBe('Open');

    const booleanValue = await isAt(page, myReqViewURL);
    await expect(booleanValue).toBe(true);
    console.log(`Current URL contains ${myReqViewURL}: ${booleanValue}`);

  });

});

test(`HR Request Cancellation Test`, async ({ loginPage, page }) => {

  loginValidAndInvalidData();
  const myReqURL = "/hrrequests/user";
  await test.step('Open login page', async () => {
    // navigate() is already called in the fixture
  });

  const title = await loginPage.getTitle();
  expect(title).toBe('Welcome to Sumopayroll | Login');

  const dashboardPage = await loginPage.login(process.env.ADMIN_USERNAME || 'balus@it.com', process.env.ADMIN_PASSWORD || 'Sumo@123', process.env.Company);

  // Add steps to navigate to HR Requests and perform actions based on test data
  const getTitle = await dashboardPage.getTitle();
  await expect(getTitle).toBe('Sumopayroll | Dashboard');
  // Example: await dashboardPage.navigateToHRRequests();
  // Example: await dashboardPage.createHRRequest(data.requestType, data.description);
  const hrrequestPage = await dashboardPage.clickOnCreateHRRequest();
  await expect(page).toHaveURL(/hrrequests.*create/);

  const hrRequestTitle = await hrrequestPage.getTitle();
  await expect(hrRequestTitle).toBe('Sumopayroll | Create HR Request');
  await hrrequestPage.cancelHRRequest();
  const booleanValue = await isAt(page, myReqURL);
  await expect(booleanValue).toBe(true);
  console.log(`Current URL contains ${myReqURL}: ${booleanValue}`);

});

test(`HR Request Validations Test`, async ({ loginPage, page }) => {

  loginValidAndInvalidData();
  const createReqURL = "/hrrequests/create";

  await test.step('Open login page', async () => {
    // navigate() is already called in the fixture
  });

  const title = await loginPage.getTitle();
  expect(title).toBe('Welcome to Sumopayroll | Login');
  const dashboardPage = await loginPage.login(process.env.ADMIN_USERNAME || 'balus@it.com', process.env.ADMIN_PASSWORD || 'Sumo@123', process.env.Company);

  // Add steps to navigate to HR Requests and perform actions based on test data
  const getTitle = await dashboardPage.getTitle();
  await expect(getTitle).toBe('Sumopayroll | Dashboard');
  const hrrequestPage = await dashboardPage.clickOnCreateHRRequest();
  await expect(page).toHaveURL(/hrrequests.*create/);
  const hrRequestTitle = await hrrequestPage.getTitle();
  await expect(hrRequestTitle).toBe('Sumopayroll | Create HR Request');

  //checking create HR request URL after clicking on create HR request button
  const booleanValue = await isAt(page, createReqURL);
  await expect(booleanValue).toBe(true);
  console.log(`Current URL contains ${createReqURL}: ${booleanValue}`);

  await hrrequestPage.validateHRRequestCreation();

});

test.only(`HR Request creation from User`, async ({ loginPage, page }) => {
  loginValidAndInvalidData();
  const myReqViewURL = "/hrrequests/user?id=";
  await test.step('Open login page', async () => {
    // navigate() is already called in the fixture
  });

  const title = await loginPage.getTitle();
  expect(title).toBe('Welcome to Sumopayroll | Login');
  const dashboardPage = await loginPage.login(process.env.USER_USERNAME || 'yamuna@yahoo.com', process.env.USER_PASSWORD || 'Sumo@123', process.env.Company);
  const getTitle = await dashboardPage.getTitle();
  await expect(getTitle).toBe('Sumopayroll | Dashboard');
  const hrrequestPage = await dashboardPage.clickOnCreateHRRequest();
  await expect(page).toHaveURL(/hrrequests.*create/);
  const hrRequestTitle = await hrrequestPage.getTitle();
  await expect(hrRequestTitle).toBe('Sumopayroll | Create HR Request');
  await hrrequestPage.createHRRequest('Advance/Loan', 'Test description from user');
  await page.waitForTimeout(2000);
  const status = await page.locator('span.statusTag.greenTag').textContent();
  expect(status.trim()).toBe('Open');
  const booleanValue = await isAt(page, myReqViewURL);
  await expect(booleanValue).toBe(true);
  console.log(`Current URL contains ${myReqViewURL}: ${booleanValue}`);
});



