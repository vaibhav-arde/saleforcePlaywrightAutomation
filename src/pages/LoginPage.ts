/**
 * LoginPage — Salesforce login page interactions
 * SRP: Handles only login form and login assertion
 */

import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { SF_LOGIN_URL, TIMEOUTS } from '../config/constants.js';

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly welcomeBanner: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#Login');
    this.welcomeBanner = page.locator("//h1[contains(@class,'welcome-title')]");
    this.errorMessage = page.locator('#error');
  }

  /** Navigate to Salesforce login page and authenticate */
  async loginToSalesforce(username: string, password: string): Promise<void> {
    await this.navigateTo(SF_LOGIN_URL);
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
    await this.waitForPageLoad('**/lightning/**', TIMEOUTS.LIGHTNING_READY);
  }

  /** Assert that login was successful by checking the welcome banner */
  async assertLoginSuccess(): Promise<void> {
    await this.welcomeBanner.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
    await expect(this.welcomeBanner).toBeVisible();
  }

  /** Assert that login failed and error message is displayed */
  async assertLoginError(expectedText: string): Promise<void> {
    await expect(this.errorMessage).toContainText(expectedText);
  }

  /** Get the error message text */
  async getErrorMessage(): Promise<string> {
    return this.getText(this.errorMessage);
  }
}
