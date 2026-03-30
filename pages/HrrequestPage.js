const { expect } = require('@playwright/test');
const path = require('path');
class HrrequestPage {
    constructor(page) {
        this.page = page;
    }

    async getTitle() {
        const title = await this.page.title();
        console.log(`Page title: ${title}`);
        return title;
    }
    async createHRRequest(requestType, description) {

        const requestTypeLocator = await this.page.locator('select[name="type"]');
        const descriptionLocator = await this.page.locator('textarea[name="details"]');
        const attachmentLocator = await this.page.locator('[name="reportFile[]"]');
        const submitBtn = await this.page.locator('#btnsave');
        const filePath = path.join(__dirname, '../test-data/offerLetterTemplate.docx');
        const fileDescriptionLocator = await this.page.locator('.fileDesc');

        await requestTypeLocator.selectOption(requestType);
        await descriptionLocator.fill(description);
        await this.page.waitForTimeout(2000);
        //await attachmentLocator.waitFor({ state: 'attached' });

        await attachmentLocator.setInputFiles(filePath);
        await expect(this.page.locator('text=offerLetterTemplate.docx')).toBeVisible();
        await fileDescriptionLocator.fill('Test file description');
        await submitBtn.click();
    }


    async cancelHRRequest() {

        const requestTypeLocator = await this.page.locator('select[name="type"]');
        const descriptionLocator = await this.page.locator('textarea[name="details"]');
        const attachmentLocator = await this.page.locator('#reportInput-0');
        const filePath = path.join(__dirname, '../test-data/offerLetterTemplate.docx');
        const fileDescriptionLocator = await this.page.locator('.fileDesc');
        const cancelBtn = await this.page.locator("//a[@id='cancel-button']");

        await requestTypeLocator.selectOption('Payroll');
        await descriptionLocator.fill('Test description');
        //  await this.page.pause();
        await this.page.waitForTimeout(2000);
        await attachmentLocator.waitFor({ state: 'attached' });
        await attachmentLocator.setInputFiles(filePath);
        await fileDescriptionLocator.fill('Test file description');
        await cancelBtn.click();

    }

}
module.exports = { HrrequestPage };
