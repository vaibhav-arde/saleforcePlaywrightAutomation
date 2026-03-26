const {expect} = require("@playwright/test");
class AccountPage {

    constructor(page) {
        this.page = page;
        this.newBtn = page.locator("//a[@title='New']");
        this.accountName = page.locator("[name='Name']");
        this.accountNumber = page.locator("[name='AccountNumber']");
        this.ratingDropDownField = page.locator("//button[@aria-label='Rating']");
        this.saveBtn = page.locator("[name='SaveEdit']");
    }


    async assertAccountTab() {
        await this.page.waitForURL("**/Account/**", {timeout : 60000});
    }

    async createNewAccount(accountName, accountNumber, rating) {
        await this.newBtn.waitFor();
        await this.newBtn.click();
        await this.accountName.waitFor();
        await this.accountName.fill(accountName);
        await this.accountNumber.fill(accountNumber);
        await this.ratingDropDownField.click();
        const ratingValue = this.page.locator("//lightning-base-combobox-item[@data-value='"+rating+"']");
        await ratingValue.waitFor();
        await ratingValue.click();
        await this.saveBtn.click();
    }

    async assertAccountCreated(accountName) {
        const accountNameElement = this.page.locator("//lightning-formatted-text[text()='"+accountName+"']");
        await accountNameElement.waitFor();
        await expect(accountNameElement).toBeVisible();
    }

}
module.exports = { AccountPage };