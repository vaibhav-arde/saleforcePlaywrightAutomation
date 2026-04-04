/**
 * Salesforce-specific wait helper utilities
 * Handles common Lightning platform wait patterns
 */

import { type Page } from '@playwright/test';
import { TIMEOUTS } from '../config/constants.js';

export class SalesforceWaitHelpers {
  constructor(private readonly page: Page) {}

  /** Wait for Lightning Experience to fully load after login */
  async waitForLightningReady(timeout = TIMEOUTS.LIGHTNING_READY): Promise<void> {
    await this.page.waitForURL('**/lightning/**', { timeout });
  }

  /** Wait for a specific sObject record page to load */
  async waitForRecordPage(objectName: string, timeout = TIMEOUTS.PAGE_LOAD): Promise<void> {
    await this.page.waitForURL(`**/${objectName}/**`, { timeout });
  }

  /** Wait for toast notification and return its text */
  async waitForToast(timeout = TIMEOUTS.TOAST): Promise<string> {
    const toast = this.page.locator('.slds-notify__content');
    await toast.waitFor({ state: 'visible', timeout });
    return toast.innerText();
  }

  /** Wait for a Lightning modal dialog to appear */
  async waitForModal(timeout = TIMEOUTS.ELEMENT_WAIT): Promise<void> {
    const modal = this.page.locator('.slds-modal__container');
    await modal.waitFor({ state: 'visible', timeout });
  }

  /** Wait for spinner to disappear (common after saves) */
  async waitForSpinnerToDisappear(timeout = TIMEOUTS.ELEMENT_WAIT): Promise<void> {
    const spinner = this.page.locator('.slds-spinner_container');
    await spinner.waitFor({ state: 'hidden', timeout }).catch(() => {
      // Spinner may not appear at all — that's fine
    });
  }
}
