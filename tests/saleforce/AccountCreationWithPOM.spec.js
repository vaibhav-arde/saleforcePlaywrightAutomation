const { test, chromium } = require("@playwright/test");
const fs = require('fs');
const path = require('path');
const { LoginPage } = require("../../pageObjects/LoginPage");
const { SetupHomePage } = require("../../pageObjects/SetupHomePage");
const { AccountPage } = require("../../pageObjects/AccountPage");

test("Account creation in SFDC using POM", async () => {

  const userDataDirectory = path.resolve(__dirname, '../sf-profile');

  const context = await chromium.launchPersistentContext(userDataDirectory, {
    headless: false,
    args: ['--start-maximized'],
  });

  const page = await context.newPage();

  const loginPage = new LoginPage(page);

  await loginPage.loginToSalesforce(process.env.sit_salesforce_username, process.env.sit_salesforce_password);
  await loginPage.assertLoginSuccess();


  const setupHomePage = new SetupHomePage(page);

  await setupHomePage.chooseObjectFromAppLauncher("Accounts");

  const accountPage = new AccountPage(page);

  await accountPage.assertAccountTab();

  const accName = "Playwright POM Account";
  await accountPage.createNewAccount(accName, "1234567", "Warm");
  await accountPage.assertAccountCreated(accName);

});