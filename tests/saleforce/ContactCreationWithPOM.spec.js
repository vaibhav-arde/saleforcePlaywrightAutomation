const { test, chromium } = require("@playwright/test");
const path = require('path');
const { LoginPage } = require("../../pageObjects/LoginPage");
const { SetupHomePage } = require("../../pageObjects/SetupHomePage");
const { ContactPage } = require("../../pageObjects/ContactPage");


test("Contact creation in SFDC using POM", async () => {
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

  await setupHomePage.chooseObjectFromAppLauncher("Contacts");

  const contactPage = new ContactPage(page);
  await contactPage.assertContactTab();
  const salutation = "Mr.";
  const firstName = "John";
  const lastName = "Doe";
  const accountName = "Playwright POM Account";
  await contactPage.createNewContact(salutation, firstName, lastName, accountName);
  await contactPage.assertContactCreated(salutation, firstName, lastName);

});