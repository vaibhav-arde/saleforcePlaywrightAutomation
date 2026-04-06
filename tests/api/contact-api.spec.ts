/**
 * Contact API Tests — Salesforce Contact CRUD via REST API
 * Tags: @regression, @api
 */

import { test, expect } from '@fixtures/index.js';
import { TestDataHelper } from '@utils/helpers.js';

test.describe('Contact API Operations', { tag: ['@regression', '@api'] }, () => {
  test('should create a contact linked to an account via API', async ({
    accountApi,
    contactApi,
  }) => {
    // Arrange — create account first
    const accountName = `Contact Link Account ${Date.now()}`;
    const accountId = await accountApi.createWithDefaults(accountName);

    // Act — create contact linked to account
    const firstName = TestDataHelper.contactFirstName();
    const lastName = TestDataHelper.contactLastName();
    const contactId = await contactApi.createLinkedToAccount(
      firstName,
      lastName,
      accountId,
      'Mr.',
    );

    // Assert
    expect(contactId).toBeTruthy();
    const contact = await contactApi.getById(contactId);
    expect(contact.FirstName).toBe(firstName);
    expect(contact.LastName).toBe(lastName);
    expect(contact.AccountId).toBe(accountId);

    // Cleanup
    await contactApi.delete(contactId);
    await accountApi.delete(accountId);
  });

  test('should create a standalone contact via API', async ({ contactApi }) => {
    // Arrange
    const firstName = TestDataHelper.contactFirstName();
    const lastName = TestDataHelper.contactLastName();

    // Act
    const contactId = await contactApi.createContact(firstName, lastName, 'Ms.');

    // Assert
    expect(contactId).toBeTruthy();

    // Cleanup
    await contactApi.delete(contactId);
  });
});
