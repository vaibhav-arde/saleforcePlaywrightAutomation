// @ts-check
import { test, expect } from '@playwright/test';

test('Saucedemo valid login', async ({ page }) => {
    // Navigate to the Saucedemo login page
    await page.goto('https://www.saucedemo.com/');

    // Verify the page title
    await expect(page).toHaveTitle(/Swag Labs/);

    // Enter the valid standard user credentials
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // Click the login button
    await page.locator('[data-test="login-button"]').click();

    // Verify successful login by checking the URL
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Verify the presence of the product list title
    await expect(page.locator('.title')).toHaveText('Products');
});

test('Saucedemo invalid login', async ({ page }) => {
    // Navigate to the Saucedemo login page
    await page.goto('https://www.saucedemo.com/');

    // Enter invalid credentials
    await page.locator('[data-test="username"]').fill('invalid_user');
    await page.locator('[data-test="password"]').fill('wrong_password');

    // Click the login button
    await page.locator('[data-test="login-button"]').click();

    // Verify that the error message is displayed
    const errorLocator = page.locator('[data-test="error"]');
    await expect(errorLocator).toBeVisible();
    await expect(errorLocator).toContainText('Epic sadface: Username and password do not match any user in this service');
});
