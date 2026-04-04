/**
 * AccountPage — Salesforce Account list view and record operations
 * SRP: Handles only Account-specific UI interactions
 * DRY: Uses BasePage helpers for dropdown, save, assertions
 */

import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { SFLocators } from '../utils/sf-locators.js';

export class AccountPage extends BasePage {
  private readonly newButton: Locator;
  private readonly accountNameInput: Locator;
  private readonly accountNumberInput: Locator;

  constructor(page: Page) {
    super(page);
    this.newButton = page.locator(SFLocators.newButton());
    this.accountNameInput = page.locator("[name='Name']");
    this.accountNumberInput = page.locator("[name='AccountNumber']");
  }

  /** Wait for Account list view to load */
  async assertAccountTab(): Promise<void> {
    await this.waitForPageLoad('**/Account/**');
  }

  /**
   * Create a new Account via UI
   * Uses inherited BasePage helpers for dropdown and save (DRY)
   */
  async createNewAccount(name: string, accountNumber: string, rating: string): Promise<void> {
    await this.click(this.newButton);
    await this.fill(this.accountNameInput, name);
    await this.fill(this.accountNumberInput, accountNumber);
    await this.selectLightningDropdown('Rating', rating);
    await this.clickSaveButton();
  }

  /** Assert account was created by checking record name on detail page */
  async assertAccountCreated(name: string): Promise<void> {
    const nameElement = this.page.locator(SFLocators.formattedText(name));
    await this.expectVisible(nameElement);
  }
}
