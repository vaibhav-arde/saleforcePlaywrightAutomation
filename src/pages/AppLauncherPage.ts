/**
 * AppLauncherPage — Salesforce App Launcher navigation
 * SRP: Handles only App Launcher interactions (search and navigate to objects)
 * DRY: Locators come from SFLocators utility
 */

import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { SFLocators } from '../utils/sf-locators.js';

export class AppLauncherPage extends BasePage {
  private readonly appLauncherButton: Locator;
  private readonly searchInput: Locator;

  constructor(page: Page) {
    super(page);
    this.appLauncherButton = page.locator(SFLocators.appLauncher());
    this.searchInput = page.locator(SFLocators.appLauncherSearch());
  }

  /**
   * Navigate to any Salesforce object via App Launcher
   * @param objectName - e.g., 'Accounts', 'Contacts', 'Cases', 'Opportunities'
   */
  async navigateToObject(objectName: string): Promise<void> {
    await this.click(this.appLauncherButton);
    await this.fill(this.searchInput, objectName);
    const resultLink = this.page.locator(SFLocators.appLauncherResult(objectName));
    await this.click(resultLink);
  }
}
