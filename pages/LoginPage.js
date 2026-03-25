import { expect } from '@playwright/test';
class LoginPage {
  constructor(page) {
    this.page = page;
  }



  async navigate() {
    // Use relative path so Playwright uses the config baseURL (set via BASE_URL env var)
    await this.page.goto(process.env.BASE_URL || 'http://localhost/Payroll/Sumo-Payroll/public/login');
  }

  async getTitle() {
    return this.page.title();
  }

  async login(username, password, company) {
    const emailInput = this.page.locator('#email');
    const passwordInput = this.page.locator('#password');
    const confirmPassword = this.page.locator('#confirmpassword');
    const loginBtn = this.page.locator('#btn-login');
    const updateBtn = this.page.locator('#btn-reset');
    const errorMsg = this.page.locator('.alert-danger');
    const companyList = this.page.locator('.login_companies_list');
    const chooseCompany = this.page.locator('.choose_company');
    const loginLink = this.page.locator(':text-is("Click here to login.")');
    const companyLocator = this.page.locator(`:text("${company}")`);
    await emailInput.fill(username);
    await passwordInput.fill(password);
    await loginBtn.click();

    //Incorrect credentials handling
    if (await errorMsg.isVisible()) {
      const text = await errorMsg.textContent();
      if (text.includes('Incorrect Email or Password')) {
        console.log("Login failed with provided credentials.");
        return;
      }
    }
    //Update password flow handling
    if (this.page.url().includes('password/update')) {
      await passwordInput.fill(password);
      await confirmPassword.fill(password);
      await updateBtn.click();
      await loginLink.click();
      await emailInput.fill(username);
      await passwordInput.fill(password);
      await loginBtn.click();

    } else {
      console.log("No password update required, proceeding with login...");
    }
    //Choose company if prompted
    if (chooseCompany.isVisible()) {
      await companyLocator.click();

    } else if (companyList.isVisible()) {
      await companyList.first().click();
      console.log("Click on first company..");
    } else {
      console.log("No company selection required, proceeding to dashboard...");
    }

  }
}
module.exports = { LoginPage };
