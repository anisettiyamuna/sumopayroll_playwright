const { expect } = require('@playwright/test');
const { HrrequestPage } = require('./HrrequestPage');
class DashboardPage {
    constructor(page) {
        this.page = page;
    }

    async getTitle() {
        const title = await this.page.title();
        console.log(`Page title: ${title}`);
        return title;
    }
    async clickOnCreateHRRequest() {

        const hrManagementMenu = await this.page.locator('i.fal.fa-lg.fa-users.icon_spacing');
        const hrRequestsMenu = await this.page.getByText('HR Requests', { exact: true });
        const createHRRequestBtn = await this.page.getByText('Create HR Request', { exact: true });

        await hrManagementMenu.click();
        await hrRequestsMenu.click();
        await createHRRequestBtn.click();
        return new HrrequestPage(this.page);
    }

    async clickOnMyRequests() {
        const hrManagementMenu = await this.page.locator('i.fal.fa-lg.fa-users.icon_spacing');
        const hrRequestsMenu = await this.page.getByText('HR Requests', { exact: true });
        const myRequestsLink = await this.page.getByText('My Requests', { exact: true });

        await hrManagementMenu.click();
        await hrRequestsMenu.click();
        await myRequestsLink.click();
        return new HrrequestPage(this.page);
    }
}

module.exports = { DashboardPage };
