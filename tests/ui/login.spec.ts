/**
 * Login Tests — Salesforce authentication scenarios
 * Tags: @smoke, @ui
 */

import { test } from '../../src/fixtures/index.js';
import { LoginPage } from '../../src/pages/LoginPage.js';
import { EnvConfig } from '../../src/config/environment.js';

test.describe('Salesforce Login', { tag: ['@smoke', '@ui'] }, () => {
  // Opt out of authenticated state so we can test the login form itself
  test.use({ storageState: { cookies: [], origins: [] } });

  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginToSalesforce(
      EnvConfig.salesforce.username,
      EnvConfig.salesforce.passwordUi,
    );
    await loginPage.assertLoginSuccess();
  });

  test('should show error for invalid credentials', { tag: '@regression' }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('https://login.salesforce.com');
    await page.locator('#username').fill('invalid@test.com');
    await page.locator('#password').fill('wrongpassword');
    await page.locator('#Login').click();
    await loginPage.assertLoginError('Please check your username and password');
  });

  test('should show error for empty credentials', { tag: '@regression' }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('https://login.salesforce.com');
    await page.locator('#username').fill(' ');
    await page.locator('#password').fill(' ');
    await page.locator('#Login').click();
    await loginPage.assertLoginError('Please enter your username and password');
  });
});
