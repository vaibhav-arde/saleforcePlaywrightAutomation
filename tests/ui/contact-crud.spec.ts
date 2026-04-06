/**
 * Contact CRUD Tests — Salesforce Contact operations via UI
 * Tags: @regression, @ui
 */

import { test } from '../../src/fixtures/index.js';
import { AppLauncherPage } from '../../src/pages/AppLauncherPage.js';
import { ContactPage } from '../../src/pages/ContactPage.js';
import { TestDataHelper } from '../../src/utils/helpers.js';

test.describe('Contact CRUD Operations', { tag: ['@regression', '@ui'] }, () => {
  test('should create a new contact linked to an account', async ({ authPage }) => {
    // Arrange
    const appLauncher = new AppLauncherPage(authPage);
    const contactPage = new ContactPage(authPage);
    const firstName = TestDataHelper.contactFirstName();
    const lastName = TestDataHelper.contactLastName();
    const salutation = 'Mr.';
    // Note: This test assumes an account already exists to link to
    const accountName = 'Playwright POM Account';

    // Act — navigate and create
    await appLauncher.navigateToObject('Contacts');
    await contactPage.assertContactTab();
    await contactPage.createNewContact(salutation, firstName, lastName, accountName);

    // Assert
    await contactPage.assertContactCreated(salutation, firstName, lastName);
  });
});
