/**
 * Account CRUD Tests — Salesforce Account operations via UI
 * Tags: @regression, @ui
 */

import { test, expect } from '../../src/fixtures/index.js';
import { AppLauncherPage } from '../../src/pages/AppLauncherPage.js';
import { AccountPage } from '../../src/pages/AccountPage.js';
import { TestDataHelper } from '../../src/utils/helpers.js';

test.describe('Account CRUD Operations', { tag: ['@regression', '@ui'] }, () => {
  test('should create a new account via UI', async ({ loginPage, page }) => {
    expect(loginPage).toBeDefined();
    // Arrange
    const appLauncher = new AppLauncherPage(page);
    const accountPage = new AccountPage(page);
    const accountName = TestDataHelper.accountName();
    const accountNumber = TestDataHelper.accountNumber();

    // Act — navigate and create
    await appLauncher.navigateToObject('Accounts');
    await accountPage.assertAccountTab();
    await accountPage.createNewAccount(accountName, accountNumber, 'Hot');

    // Assert
    await accountPage.assertAccountCreated(accountName);
  });

  test('should create account with Warm rating', async ({ loginPage, page }) => {
    expect(loginPage).toBeDefined();
    // Arrange
    const appLauncher = new AppLauncherPage(page);
    const accountPage = new AccountPage(page);
    const accountName = `Warm Account ${Date.now()}`;

    // Act
    await appLauncher.navigateToObject('Accounts');
    await accountPage.assertAccountTab();
    await accountPage.createNewAccount(accountName, '7654321', 'Warm');

    // Assert
    await accountPage.assertAccountCreated(accountName);
  });
});
