/**
 * Centralized constants for Salesforce API and UI routes
 */

export const SF_API = {
  AUTH_ENDPOINT: '/services/oauth2/token',
  SOBJECTS_BASE: '/services/data/v65.0/sobjects',
  QUERY_ENDPOINT: '/services/data/v65.0/query',
} as const;

export const SF_LOGIN_URL = 'https://login.salesforce.com';

export const SF_ROUTES = {
  LOGIN: SF_LOGIN_URL,
  ACCOUNTS: '/lightning/o/Account/list?filterName=__Recent',
  CONTACTS: '/lightning/o/Contact/list?filterName=__Recent',
  CASES: '/lightning/o/Case/list?filterName=__Recent',
  OPPORTUNITIES: '/lightning/o/Opportunity/list?filterName=__Recent',
} as const;

export const TIMEOUTS = {
  PAGE_LOAD: 60_000,
  ELEMENT_WAIT: 30_000,
  API_RESPONSE: 15_000,
  TOAST: 10_000,
  LIGHTNING_READY: 60_000,
} as const;

export const SF_API_HEADERS = {
  JSON: { 'Content-Type': 'application/json' } as const,
  FORM: { 'Content-Type': 'application/x-www-form-urlencoded' } as const,
} as const;
