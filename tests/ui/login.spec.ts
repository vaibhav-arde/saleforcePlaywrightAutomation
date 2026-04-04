/**
 * Login Tests — Salesforce authentication scenarios
 * Tags: @smoke, @ui
 */

import { test, expect } from '../../src/fixtures/index.js';
import { LoginPage } from '../../src/pages/LoginPage.js';


test.describe('Salesforce Login', { tag: ['@smoke', '@ui'] }, () => {
  test('should login successfully with valid credentials', async ({ loginPage }) => {
    // loginPage fixture already handles login + assertion
    // Just verify we're on the Lightning page
    expect(loginPage.getUrl()).toContain('lightning');
  });

  test('should show error for invalid credentials', { tag: '@regression' }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    expect(loginPage).toBeDefined();
    await loginPage.navigateTo('https://login.salesforce.com');
    await page.locator('#username').fill('invalid@test.com');
    await page.locator('#password').fill('wrongpassword');
    await page.locator('#Login').click();
    await loginPage.assertLoginError('Please check your username and password');
  });

  test('should show error for empty credentials', { tag: '@regression' }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    expect(loginPage).toBeDefined();
    await loginPage.navigateTo('https://login.salesforce.com');
    await page.locator('#username').fill(' ');
    await page.locator('#password').fill(' ');
    await page.locator('#Login').click();
    await loginPage.assertLoginError('Please enter your username and password');
  });
});
