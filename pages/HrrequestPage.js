const { expect } = require('@playwright/test');
const path = require('path');
import fs from 'fs';
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
        await this.page.waitForTimeout(2000);
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
    async voidHRRequest() {

        const requestTypeLocator = await this.page.locator('select[name="type"]');
        const descriptionLocator = await this.page.locator('textarea[name="details"]');
        const attachmentLocator = await this.page.locator('#reportInput-0');
        const filePath = path.join(__dirname, '../test-data/offerLetterTemplate.docx');
        const fileDescriptionLocator = await this.page.locator('.fileDesc');
        const voidBtn = await this.page.locator("//a[@id='void-button']");


    }
    async closeAndReopenHRRequest() {

        const firstRecord = await this.page.locator("//tbody/tr[1]/td[1]/a[1]");
        const closeButton = await this.page.getByRole('button', { name: 'Close' });
        const closeComments = await this.page.locator('#close_comments');
        const noButton = await this.page.getByRole('button', { name: 'No' });
        const yesButton = await this.page.getByRole('button', { name: 'Yes' });
        const closeConfirmMSG = await expect(this.page.locator('text=HR Request was Closed'));
        const voidConfirmMSG = await expect(this.page.locator('text=HR Request was Voided'));
        const reopenConfirmMSG = await expect(this.page.locator('text=HR Request was Reopened'));
        const closeInStrip = await this.page.locator('#hrrequests-strip').getByText('Closed');
        const closedStatus = await this.page.locator('#request_modal').getByText('Closed', { exact: true })
        const reopenButton = await this.page.getByRole('button', { name: 'Reopen' });
        const reopenComments = await this.page.locator('#reopen_comments');
        const fileDescriptionLocator = await this.page.locator('.fileDesc');
        const closeBtn = await this.page.locator("//a[@id='close-button']");
        const status = await page.locator('span.statusTag.greenTag').textContent();

        firstRecord.click();
        expect(status.trim()).toBe('Open');
        // await this.page.getByRole('button', { name: 'Void' }).click();
        // await this.page.getByRole('button', { name: 'No' }).click();

        closeButton.click();
        closeComments.fill('Request Done');
        noButton.click();
        firstRecord.click();
        closeButton.click();
        closeComments.fill('Request Done');
        yesButton.click();
        closeConfirmMSG.toBeVisible();
        closeInStrip.click();
        firstRecord.click();
        closedStatus.click();
        reopenButton.click();
        yesButton.click();
        expect(this.page.getByText('Comments are required!', { exact: true })).toBeVisible();
        reopenComments.fill('Reopen the request');
        yesButton.click();
        reopenConfirmMSG.toBeVisible();
        await this.page.locator('#hrrequests-strip').getByText('Open').click();
        await this.page.getByText('Mar 30,').first().click();
        await this.page.getByRole('button', { name: 'Void' }).click();
        await this.page.getByRole('button', { name: 'Yes' }).click();
        await this.page.getByText('Mar 30,').first().click();
        await this.page.getByRole('button', { name: 'Close' }).click();
        await this.page.locator('#close_comments').click();
        await this.page.locator('#close_comments').fill('test');
        await this.page.getByRole('button', { name: 'Yes' }).click();
        await this.page.getByText('HR Request was Closed').click();
    }

    async validateHRRequestCreation() {

        const bydefualtRequestType = 'Address Change';
        const descriptionLocator = await this.page.locator('textarea[name="details"]');
        const attachmentLocator = await this.page.locator('#reportInput-0');
        const invalidFilePath = path.join(__dirname, '../test-data/employeeOnboardOffboardReport-export.csv');
        const filePath = path.join(__dirname, '../test-data/offerLetterTemplate.docx');
        const fileDescriptionLocator = await this.page.locator('.fileDesc');
        const submitBtn = await this.page.locator('#btnsave');


        //checking bydefault Address Change type selected or not in rquest type drop down
        const requestTypeLocator = await this.page.locator('select[name="type"]');
        const optionLocator = requestTypeLocator.locator('option');
        const count = await optionLocator.count();

        for (let i = 0; i < count; i++) {
            const text = await optionLocator.nth(i).textContent();

            if (text.trim() === bydefualtRequestType) {
                console.log(`Found matching option: ${text}`);
                break;
            }
            else {
                console.log(`Option does not match: ${text}`);
            }
        }

        // Add more validation checks as needed, such as checking for error messages when submitting invalid data

        descriptionLocator.fill(' '); //empty description to trigger validation error
        await submitBtn.click();
        const descriptionErrorMessage = await this.page.locator('text=Please enter details');
        await expect(descriptionErrorMessage).toBeVisible();

        //File upload validation
        await attachmentLocator.setInputFiles(invalidFilePath);
        const fileErrorMessage = await this.page.locator('text=File type not allowed.');
        await expect(fileErrorMessage).toBeVisible();

        //File description validation
        await attachmentLocator.setInputFiles(filePath);
        await expect(this.page.locator('text=offerLetterTemplate.docx')).toBeVisible();
        await fileDescriptionLocator.fill(' ');//empty file description to trigger validation error
        await submitBtn.click();
        const fileDescriptionErrorMessage = await this.page.locator('text=File description is required');
        await expect(fileDescriptionErrorMessage).toBeVisible();

        //File size validation for large file upload
        const largeFilePath = path.join(__dirname, '../test-data/5mb-examplefile-com.txt');
        const stats = fs.statSync(largeFilePath);
        await attachmentLocator.setInputFiles(largeFilePath);
        if (stats.size > 3 * 1024 * 1024) {
            const fileSizeErrorMessage = await this.page.locator('text=The uploaded file should be less than 3MB.');
            await expect(fileSizeErrorMessage).toBeVisible();
            //  expect(stats.size).toBeLessThanOrEqual(3 * 1024 * 1024); // 3MB
        }
    }
}
module.exports = { HrrequestPage };
