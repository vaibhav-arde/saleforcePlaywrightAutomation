/**
 * AccountApiClient — Typed CRUD operations for Salesforce Account sObject
 * Extends BaseApiClient<Account> — OCP: extend, don't modify
 */

import { BaseApiClient } from './BaseApiClient.js';
import type { Account } from '../types/salesforce.types.js';

export class AccountApiClient extends BaseApiClient<Account> {
  protected get sObjectName(): string {
    return 'Account';
  }

  /**
   * Create an account with sensible defaults
   * @param name - Account name
   * @param rating - Account rating (default: 'Hot')
   * @returns Created record ID
   */
  async createWithDefaults(name: string, rating: Account['Rating'] = 'Hot'): Promise<string> {
    const result = await this.create({
      Name: name,
      Rating: rating,
    });
    return result.id;
  }

  /**
   * Create a fully specified account
   * @returns Created record ID
   */
  async createAccount(
    name: string,
    accountNumber: string,
    rating: Account['Rating'],
    billingStreet?: string,
  ): Promise<string> {
    const result = await this.create({
      Name: name,
      AccountNumber: accountNumber,
      Rating: rating,
      BillingStreet: billingStreet,
    });
    return result.id;
  }
}
