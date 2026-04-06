/**
 * Account API Tests — Salesforce Account CRUD via REST API
 * Tags: @smoke, @api
 * Uses typed API clients from fixtures (DIP — depends on abstractions)
 */

import { test, expect } from '@fixtures/index.js';
import { TestDataHelper } from '@utils/helpers.js';

test.describe('Account API Operations', { tag: ['@smoke', '@api'] }, () => {
  let createdAccountId: string;

  test('should create an account via API', async ({ accountApi }) => {
    // Arrange
    const accountName = TestDataHelper.accountName();

    // Act
    createdAccountId = await accountApi.createWithDefaults(accountName);

    // Assert
    expect(createdAccountId).toBeTruthy();
  });

  test('should retrieve an account by ID', { tag: '@regression' }, async ({ accountApi }) => {
    // Arrange — create an account first
    const accountName = `API Get Account ${Date.now()}`;
    const accountId = await accountApi.createWithDefaults(accountName);

    // Act
    const account = await accountApi.getById(accountId);

    // Assert
    expect(account.Name).toBe(accountName);
    expect(account.Id).toBe(accountId);

    // Cleanup
    await accountApi.delete(accountId);
  });

  test('should update an account via API', { tag: '@regression' }, async ({ accountApi }) => {
    // Arrange
    const accountName = `API Update Account ${Date.now()}`;
    const accountId = await accountApi.createWithDefaults(accountName);

    // Act
    await accountApi.update(accountId, { Rating: 'Cold' });

    // Assert
    const updated = await accountApi.getById(accountId);
    expect(updated.Rating).toBe('Cold');

    // Cleanup
    await accountApi.delete(accountId);
  });

  test('should delete an account via API', { tag: '@regression' }, async ({ accountApi }) => {
    // Arrange
    const accountName = `API Delete Account ${Date.now()}`;
    const accountId = await accountApi.createWithDefaults(accountName);

    // Act & Assert — should not throw
    await accountApi.delete(accountId);
  });
});
