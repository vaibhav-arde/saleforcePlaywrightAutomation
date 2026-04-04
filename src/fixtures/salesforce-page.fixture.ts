/**
 * Salesforce Page Fixture — Provides a pre-logged-in Salesforce page
 * Builds on API fixture chain: auth → api-client → salesforce-page
 */

import { apiTest } from './api-client.fixture.js';
import { LoginPage } from '../pages/LoginPage.js';
import { EnvConfig } from '../config/environment.js';

export type SalesforcePageFixtures = {
  loginPage: LoginPage;
};

export const test = apiTest.extend<SalesforcePageFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginToSalesforce(
      EnvConfig.salesforce.username,
      EnvConfig.salesforce.password,
    );
    await loginPage.assertLoginSuccess();
    await use(loginPage);
  },
});

export { expect } from '@playwright/test';
