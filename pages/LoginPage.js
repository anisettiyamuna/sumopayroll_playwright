class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    // Use relative path so Playwright uses the config baseURL (set via BASE_URL env var)
    await this.page.goto(process.env.BASE_URL);
  }

  async login(username, password) {
    await this.page.fill('#email', username);
    await this.page.fill('#password', password);
    await this.page.click('#btn-login');

    if(this.page.locator('.choose_company').isVisible()) {

      await this.page.click('text=Aquatech');
  }
}
}
module.exports = { LoginPage };
