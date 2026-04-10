/**
 * API Client Fixture — Provides typed Salesforce API clients to tests
 * Builds on auth fixture — each test gets pre-authenticated clients (DIP)
 */

import { authTest } from './auth.fixture.js';
import { AccountApiClient } from '../api/AccountApiClient.js';
import { ContactApiClient } from '../api/ContactApiClient.js';
import { GenericSObjectClient } from '../api/GenericSObjectClient.js';

export type ApiClientFixtures = {
  accountApi: AccountApiClient;
  contactApi: ContactApiClient;
  sObjectApi: (sObjectName: string) => GenericSObjectClient;
};

export const apiTest = authTest.extend<ApiClientFixtures>({
  accountApi: async ({ authToken, request }, use) => {
    const client = new AccountApiClient(request, authToken.instance_url, authToken.access_token);
    await use(client);
  },

  contactApi: async ({ authToken, request }, use) => {
    const client = new ContactApiClient(request, authToken.instance_url, authToken.access_token);
    await use(client);
  },

  sObjectApi: async ({ authToken, request }, use) => {
    const factory = (sObjectName: string) =>
      new GenericSObjectClient(
        request,
        authToken.instance_url,
        authToken.access_token,
        sObjectName,
      );
    await use(factory);
  },
});
