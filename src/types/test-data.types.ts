/**
 * Test data type definitions for data-driven testing
 */

export interface LoginTestData {
  testName: string;
  username: string;
  password: string;
  expected: 'success' | 'failure';
}

export interface AccountTestData {
  name: string;
  accountNumber?: string;
  rating?: 'Hot' | 'Warm' | 'Cold';
  billingStreet?: string;
  billingCity?: string;
}

export interface ContactTestData {
  salutation: 'Mr.' | 'Ms.' | 'Mrs.' | 'Dr.';
  firstName: string;
  lastName: string;
  accountName: string;
  email?: string;
  phone?: string;
}
