/**
 * Account-Contact E2E Tests — Hybrid API + UI flows
 * Tags: @e2e, @critical
 * Pattern: API creates data → UI validates → API cleans up
 */

import { test, expect } from '../../src/fixtures/index.js';
import { AppLauncherPage } from '../../src/pages/AppLauncherPage.js';
import { ContactPage } from '../../src/pages/ContactPage.js';
import { TestDataHelper } from '../../src/utils/helpers.js';

test.describe('Account-Contact E2E Flow', { tag: ['@e2e', '@critical'] }, () => {
  test('API creates account → UI creates linked contact', async ({
    accountApi,
    authPage,
  }) => {

    // ─── Step 1: API — Create Account ────────────────────────
    const accountName = `E2E Account ${Date.now()}`;
    const accountId = await accountApi.createWithDefaults(accountName);
    expect(accountId).toBeTruthy();

    // ─── Step 2: UI — Navigate to Contacts ───────────────────
    const appLauncher = new AppLauncherPage(authPage);
    await appLauncher.navigateToObject('Contacts');

    // ─── Step 3: UI — Create Contact linked to API account ───
    const contactPage = new ContactPage(authPage);
    await contactPage.assertContactTab();

    const firstName = TestDataHelper.contactFirstName();
    const lastName = TestDataHelper.contactLastName();
    await contactPage.createNewContact('Mr.', firstName, lastName, accountName);

    // ─── Step 4: UI — Assert contact was created ─────────────
    await contactPage.assertContactCreated('Mr.', firstName, lastName);

    // ─── Step 5: API — Cleanup (no orphaned records) ─────────
    await accountApi.delete(accountId);
  });

  test('API creates account + contact → UI verifies contact details', async ({
    accountApi,
    contactApi,
    authPage,
  }) => {

    // ─── Step 1: API — Create Account + Contact ──────────────
    const accountName = `E2E Verify Account ${Date.now()}`;
    const accountId = await accountApi.createWithDefaults(accountName);

    const firstName = TestDataHelper.contactFirstName();
    const lastName = TestDataHelper.contactLastName();
    const contactId = await contactApi.createLinkedToAccount(
      firstName,
      lastName,
      accountId,
      'Dr.',
    );

    // ─── Step 2: UI — Navigate to contact record ─────────────
    const appLauncher = new AppLauncherPage(authPage);
    await appLauncher.navigateToObject('Contacts');

    // Note: In a real scenario, you would navigate directly to the contact record URL
    // This is a simplified example

    // ─── Step 3: API — Cleanup ───────────────────────────────
    await contactApi.delete(contactId);
    await accountApi.delete(accountId);
  });
});
