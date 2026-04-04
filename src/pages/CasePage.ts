/**
 * CasePage — Salesforce Case list view and record operations
 * SRP: Handles only Case-specific UI interactions
 */

import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { SFLocators } from '../utils/sf-locators.js';

export class CasePage extends BasePage {
  private readonly newButton: Locator;
  private readonly subjectInput: Locator;
  private readonly descriptionInput: Locator;

  constructor(page: Page) {
    super(page);
    this.newButton = page.locator(SFLocators.newButton());
    this.subjectInput = page.locator("[name='Subject']");
    this.descriptionInput = page.locator("[name='Description']");
  }

  /** Wait for Case list view to load */
  async assertCaseTab(): Promise<void> {
    await this.waitForPageLoad('**/Case/**');
  }

  /**
   * Create a new Case via UI
   */
  async createNewCase(
    subject: string,
    status: string,
    priority: string,
    origin: string,
    description?: string,
  ): Promise<void> {
    await this.click(this.newButton);
    await this.fill(this.subjectInput, subject);
    await this.selectLightningDropdown('Status', status);
    await this.selectLightningDropdown('Priority', priority);
    await this.selectLightningDropdown('Case Origin', origin);
    if (description) {
      await this.fill(this.descriptionInput, description);
    }
    await this.clickSaveButton();
  }

  /** Assert case was created by checking subject on detail page */
  async assertCaseCreated(subject: string): Promise<void> {
    const subjectElement = this.page.locator(SFLocators.formattedText(subject));
    await this.expectVisible(subjectElement);
  }
}
