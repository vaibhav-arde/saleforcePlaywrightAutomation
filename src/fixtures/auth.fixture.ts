/**
 * Auth Fixture — Session-scoped Salesforce OAuth2 authentication
 * Authenticates once per worker, reuses token across all tests (DRY)
 */

import { test as base } from '@playwright/test';
import type { OAuthTokenResponse } from '../types/auth.types.js';
import { SalesforceAuthClient } from '../api/SalesforceAuthClient.js';
import { EnvConfig } from '../config/environment.js';

export type AuthFixtures = {
  authToken: OAuthTokenResponse;
};

export const authTest = base.extend<object, AuthFixtures>({
  authToken: [
    async ({ playwright }, use) => {
      const requestContext = await playwright.request.newContext();
      const authClient = new SalesforceAuthClient(requestContext);

      const token = await authClient.authenticate({
        loginUrl: EnvConfig.salesforce.loginUrl,
        username: EnvConfig.salesforce.username,
        password: EnvConfig.salesforce.passwordApi,
        clientId: EnvConfig.salesforce.clientId,
        clientSecret: EnvConfig.salesforce.clientSecret,
      });

      await use(token);
      await requestContext.dispose();
    },
    { scope: 'worker' },
  ],
});
