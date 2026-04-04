/**
 * Test data helper utilities using Faker for random data generation
 */

import { faker } from '@faker-js/faker';

export const TestDataHelper = {
  /** Generate a unique account name with timestamp */
  accountName: () => `Auto Account ${Date.now()}`,

  /** Generate a random first name */
  contactFirstName: () => faker.person.firstName(),

  /** Generate a random last name */
  contactLastName: () => faker.person.lastName(),

  /** Generate a random email address */
  email: () => faker.internet.email(),

  /** Generate a random phone number */
  phoneNumber: () => faker.phone.number(),

  /** Generate a random street address */
  streetAddress: () => faker.location.streetAddress(),

  /** Generate a random city */
  city: () => faker.location.city(),

  /** Generate a unique ID for test data */
  uniqueId: () => `${Date.now()}-${faker.string.alphanumeric(6)}`,

  /** Generate a random company name */
  companyName: () => faker.company.name(),

  /** Generate a random account number */
  accountNumber: () => faker.string.numeric(7),
};
