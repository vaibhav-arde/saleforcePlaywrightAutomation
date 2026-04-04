/**
 * ContactApiClient — Typed CRUD operations for Salesforce Contact sObject
 * Extends BaseApiClient<Contact> — OCP: extend, don't modify
 */

import { BaseApiClient } from './BaseApiClient.js';
import type { Contact } from '../types/salesforce.types.js';

export class ContactApiClient extends BaseApiClient<Contact> {
  protected get sObjectName(): string {
    return 'Contact';
  }

  /**
   * Create a contact linked to an account
   * @returns Created record ID
   */
  async createLinkedToAccount(
    firstName: string,
    lastName: string,
    accountId: string,
    salutation?: Contact['Salutation'],
  ): Promise<string> {
    const result = await this.create({
      FirstName: firstName,
      LastName: lastName,
      AccountId: accountId,
      Salutation: salutation,
    });
    return result.id;
  }

  /**
   * Create a standalone contact (no account link)
   * @returns Created record ID
   */
  async createContact(
    firstName: string,
    lastName: string,
    salutation?: Contact['Salutation'],
    email?: string,
  ): Promise<string> {
    const result = await this.create({
      FirstName: firstName,
      LastName: lastName,
      Salutation: salutation,
      Email: email,
    });
    return result.id;
  }
}
