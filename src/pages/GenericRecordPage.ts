/**
 * GenericRecordPage — Dynamic record detail page for any Salesforce sObject
 * Used when you don't need a dedicated page object
 */

import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { SFLocators } from '../utils/sf-locators.js';

export class GenericRecordPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Assert a record detail field value is visible */
  async assertFieldValue(fieldText: string): Promise<void> {
    const element = this.page.locator(SFLocators.formattedText(fieldText));
    await this.expectVisible(element);
  }

  /** Click the Edit button on a record detail page */
  async clickEditButton(): Promise<void> {
    const editButton = this.page.locator("button[name='Edit']");
    await this.click(editButton);
  }

  /** Click the Delete button on a record detail page */
  async clickDeleteButton(): Promise<void> {
    const deleteButton = this.page.locator("button[name='Delete']");
    await this.click(deleteButton);
    // Confirm delete in modal
    const confirmDelete = this.page.locator("button:has-text('Delete')").last();
    await this.click(confirmDelete);
  }

  /** Navigate to a related list tab on the record page */
  async navigateToRelatedTab(tabName: string): Promise<void> {
    const tab = this.page.locator(`a:has-text('${tabName}')`);
    await this.click(tab);
  }

  /** Get the global search results for a specific locator */
  getRecordLocator(recordName: string): Locator {
    return this.page.locator(SFLocators.formattedText(recordName));
  }
}
