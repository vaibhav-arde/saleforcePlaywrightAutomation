/**
 * ContactPage — Salesforce Contact list view and record operations
 * SRP: Handles only Contact-specific UI interactions
 * DRY: Uses BasePage helpers for lookup, save, assertions
 */

import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { SFLocators } from '../utils/sf-locators.js';

export class ContactPage extends BasePage {
  private readonly newButton: Locator;
  private readonly salutationDropdown: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;

  constructor(page: Page) {
    super(page);
    this.newButton = page.locator(SFLocators.newButton());
    this.salutationDropdown = page.locator("[name='salutation']");
    this.firstNameInput = page.locator("[name='firstName']");
    this.lastNameInput = page.locator("[name='lastName']");
  }

  /** Wait for Contact list view to load */
  async assertContactTab(): Promise<void> {
    await this.waitForPageLoad('**/Contact/**');
  }

  /**
   * Create a new Contact via UI
   * Uses inherited BasePage lookup helper (DRY)
   */
  async createNewContact(
    salutation: string,
    firstName: string,
    lastName: string,
    accountName: string,
  ): Promise<void> {
    await this.click(this.newButton);
    // Select salutation dropdown
    await this.click(this.salutationDropdown);
    const salutationOption = this.page.locator(
      `//lightning-base-combobox-item[@data-value='${salutation}']`,
    );
    await this.click(salutationOption);
    // Fill names
    await this.fill(this.firstNameInput, firstName);
    await this.fill(this.lastNameInput, lastName);
    // Select account lookup
    await this.selectLookupField('Search Accounts...', accountName);
    // Save
    await this.clickSaveButton();
  }

  /** Assert contact was created by checking the full name on detail page */
  async assertContactCreated(
    salutation: string,
    firstName: string,
    lastName: string,
  ): Promise<void> {
    const fullName = `${salutation} ${firstName} ${lastName}`;
    const nameElement = this.page.locator(SFLocators.formattedName(fullName));
    await this.expectVisible(nameElement);
  }
}
