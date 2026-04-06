/**
 * Salesforce Page Fixture — Provides a pre-logged-in Salesforce page
 * Builds on API fixture chain: auth → api-client → salesforce-page
 */

import { apiTest } from './api-client.fixture.js';
import { type Page } from '@playwright/test';
import fs from 'fs';

export type SalesforcePageFixtures = {
  authPage: Page;
};

export const test = apiTest.extend<SalesforcePageFixtures>({
  authPage: async ({ browser }, use) => {
    // Manually instantiate context with the state file
    const authFile = 'playwright/.auth/user.json';
    const context = await browser.newContext({
      storageState: fs.existsSync(authFile) ? authFile : undefined,
    });
    const page = await context.newPage();

    // Dynamically navigate to the Lightning domain extracted from cookies
    if (fs.existsSync(authFile)) {
      const state = JSON.parse(fs.readFileSync(authFile, 'utf8'));
      const lightningCookie = state.cookies.find((c: any) => c.domain.includes('.lightning.force.com'));
      if (lightningCookie) {
        await page.goto(`https://${lightningCookie.domain}/lightning/page/home`);
      } else {
        await page.goto(process.env.BASE_URL || 'https://login.salesforce.com');
      }
    } else {
      await page.goto(process.env.BASE_URL || 'https://login.salesforce.com');
    }

    await use(page);
    await context.close();
  },
});

export { expect } from '@playwright/test';
