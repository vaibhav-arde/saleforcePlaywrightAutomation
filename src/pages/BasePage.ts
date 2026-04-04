/**
 * BasePage — Abstract foundation for all Salesforce page objects
 *
 * SOLID Principles:
 * - SRP: Common UI operations only (navigation, clicks, fills, assertions)
 * - OCP: Open for extension by derived pages, closed for modification
 * - LSP: Any derived page can substitute BasePage
 * - DIP: Tests depend on BasePage abstraction
 *
 * DRY: Salesforce-specific helpers (dropdown, lookup, save) defined once
 */

import { type Page, type Locator, expect } from '@playwright/test';
import { SFLocators } from '../utils/sf-locators.js';
import { TIMEOUTS } from '../config/constants.js';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  // ─── Navigation ──────────────────────────────────────────────

  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async waitForPageLoad(urlPattern: string | RegExp, timeout = TIMEOUTS.PAGE_LOAD): Promise<void> {
    await this.page.waitForURL(urlPattern, { timeout });
  }

  // ─── Element Interactions ────────────────────────────────────

  async click(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
    await locator.click();
  }

  async fill(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
    await locator.fill(value);
  }

  async getText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
    return (await locator.innerText()).trim();
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  // ─── Salesforce-Specific Helpers (DRY) ───────────────────────

  /**
   * Select a value from a Salesforce Lightning dropdown (combobox)
   * Reused across AccountPage, ContactPage, CasePage, etc.
   */
  async selectLightningDropdown(ariaLabel: string, value: string): Promise<void> {
    const dropdown = this.page.locator(SFLocators.dropdownButton(ariaLabel));
    await this.click(dropdown);
    const option = this.page.locator(SFLocators.dropdownItem(value));
    await this.click(option);
  }

  /**
   * Select a value from a Salesforce Lightning lookup field
   * Reused across ContactPage (Account lookup) and other pages
   */
  async selectLookupField(placeholder: string, searchTerm: string): Promise<void> {
    const input = this.page.locator(SFLocators.lookupInput(placeholder));
    await this.click(input);
    await input.pressSequentially(searchTerm);
    const option = this.page.locator(SFLocators.lookupOption(searchTerm));
    await this.click(option);
  }

  /** Click the standard Salesforce 'Save' button on record forms */
  async clickSaveButton(): Promise<void> {
    await this.click(this.page.locator(SFLocators.saveButton()));
  }

  // ─── Page State ──────────────────────────────────────────────

  getTitle(): Promise<string> {
    return this.page.title();
  }

  getUrl(): string {
    return this.page.url();
  }

  // ─── Assertions (DRY — reusable across all pages) ───────────

  async expectVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  async expectToContainText(locator: Locator, text: string): Promise<void> {
    await expect(locator).toContainText(text);
  }

  async expectToHaveTitle(title: string): Promise<void> {
    await expect(this.page).toHaveTitle(title);
  }
}
