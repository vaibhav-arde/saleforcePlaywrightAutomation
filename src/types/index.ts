/**
 * Barrel export for all type definitions
 */

export type {
  SalesforceRecord,
  Account,
  Contact,
  Case,
  Opportunity,
  CreatePayload,
  SalesforceCreateResponse,
  SalesforceQueryResponse,
  SalesforceErrorResponse,
} from './salesforce.types.js';

export type { OAuthTokenResponse, SalesforceAuthConfig } from './auth.types.js';

export type { EnvironmentConfig, Environment } from './config.types.js';

export type { LoginTestData, AccountTestData, ContactTestData } from './test-data.types.js';
