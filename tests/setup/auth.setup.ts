import { test as setup } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage.js';
import { EnvConfig } from '../../src/config/environment.js';

const authFile = 'playwright/.auth/user.json';

setup('Authenticate and save state', async ({ page }) => {
  // Increase timeout significantly to allow manual MFA entry
  setup.setTimeout(180_000); 

  const loginPage = new LoginPage(page);
  
  // 1. Navigate and submit initial credentials
  await loginPage.loginToSalesforce(
    EnvConfig.salesforce.username,
    EnvConfig.salesforce.passwordUi
  );

  // 2. The script will now naturally wait because Salesforce page will prompt for MFA SMS code.
  // Wait until the user manually authenticates and the browser redirects to the lightning dashboard
  await page.waitForURL('**/lightning/**', { timeout: 180_000 });

  // 3. Once on the Lightning page, login is successful. Save the storage state.
  await page.context().storageState({ path: authFile });
});
