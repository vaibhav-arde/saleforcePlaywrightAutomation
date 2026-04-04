/**
 * BaseApiClient — Generic typed CRUD operations for Salesforce REST API
 *
 * SOLID Principles:
 * - SRP: Handles only HTTP operations for a single sObject
 * - OCP: Open for extension (new sObject clients), closed for modification
 * - LSP: Any derived client can be used wherever BaseApiClient is expected
 * - DIP: Tests depend on the base abstraction, not concrete implementations
 *
 * DRY: Auth headers, base URL construction, and error handling are defined once
 */

import { type APIRequestContext } from '@playwright/test';
import type { SalesforceCreateResponse } from '../types/salesforce.types.js';
import { Logger } from '../utils/logger.js';

export abstract class BaseApiClient<T> {
  constructor(
    protected readonly request: APIRequestContext,
    protected readonly instanceUrl: string,
    protected readonly accessToken: string,
    protected readonly apiVersion: string = 'v65.0',
  ) {}

  // ─── Internal Helpers (DRY — defined once) ───────────────────
  protected get baseUrl(): string {
    return `${this.instanceUrl}/services/data/${this.apiVersion}/sobjects`;
  }

  protected get authHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.accessToken}`,
    };
  }

  /** Each derived class specifies its sObject name */
  protected abstract get sObjectName(): string;

  // ─── Generic CRUD Operations ─────────────────────────────────

  async create(payload: Partial<T>): Promise<SalesforceCreateResponse> {
    const url = `${this.baseUrl}/${this.sObjectName}/`;
    Logger.info(this.sObjectName, `Creating record at ${url}`);

    const response = await this.request.post(url, {
      headers: this.authHeaders,
      data: payload,
    });

    if (!response.ok()) {
      const body = await response.text();
      throw new Error(`Create ${this.sObjectName} failed [${response.status()}]: ${body}`);
    }

    const result: SalesforceCreateResponse = await response.json();
    Logger.info(this.sObjectName, `Created record: ${result.id}`);
    return result;
  }

  async getById(id: string): Promise<T> {
    const url = `${this.baseUrl}/${this.sObjectName}/${id}`;
    Logger.info(this.sObjectName, `Getting record: ${id}`);

    const response = await this.request.get(url, {
      headers: this.authHeaders,
    });

    if (!response.ok()) {
      const body = await response.text();
      throw new Error(`Get ${this.sObjectName} ${id} failed [${response.status()}]: ${body}`);
    }

    return response.json();
  }

  async update(id: string, payload: Partial<T>): Promise<void> {
    const url = `${this.baseUrl}/${this.sObjectName}/${id}`;
    Logger.info(this.sObjectName, `Updating record: ${id}`);

    const response = await this.request.patch(url, {
      headers: this.authHeaders,
      data: payload,
    });

    if (!response.ok()) {
      const body = await response.text();
      throw new Error(`Update ${this.sObjectName} ${id} failed [${response.status()}]: ${body}`);
    }

    Logger.info(this.sObjectName, `Updated record: ${id}`);
  }

  async delete(id: string): Promise<void> {
    const url = `${this.baseUrl}/${this.sObjectName}/${id}`;
    Logger.info(this.sObjectName, `Deleting record: ${id}`);

    const response = await this.request.delete(url, {
      headers: this.authHeaders,
    });

    if (!response.ok()) {
      const body = await response.text();
      throw new Error(`Delete ${this.sObjectName} ${id} failed [${response.status()}]: ${body}`);
    }

    Logger.info(this.sObjectName, `Deleted record: ${id}`);
  }
}
