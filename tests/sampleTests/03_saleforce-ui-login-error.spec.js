import { test, expect } from '@playwright/test';

test('Salesforce UI invalid login error message', async ({ page }) => {
    // Navigate to the Salesforce login page
    await page.goto('/');

    // Verify the page title
    await expect(page).toHaveTitle(/Salesforce/);

    // Enter the valid standard user credentials
    await page.locator('#username').fill(' ');
    await page.locator('#password').fill(' ');

    // Click the login button
    await page.locator('#Login').click();

    // Validate error message
    await expect(page.locator('#error')).toHaveText('Error: Please enter your username and password.');
    await page.waitForTimeout(5000);

});
