/**
 * GenericSObjectClient — Dynamic CRUD operations for any Salesforce sObject
 * Useful for objects that don't need their own dedicated client class
 */

import { BaseApiClient } from './BaseApiClient.js';
import type { SalesforceRecord } from '../types/salesforce.types.js';
import { type APIRequestContext } from '@playwright/test';

export class GenericSObjectClient extends BaseApiClient<SalesforceRecord> {
  private readonly _sObjectName: string;

  constructor(
    request: APIRequestContext,
    instanceUrl: string,
    accessToken: string,
    sObjectName: string,
    apiVersion: string = 'v65.0',
  ) {
    super(request, instanceUrl, accessToken, apiVersion);
    this._sObjectName = sObjectName;
  }

  protected get sObjectName(): string {
    return this._sObjectName;
  }
}
