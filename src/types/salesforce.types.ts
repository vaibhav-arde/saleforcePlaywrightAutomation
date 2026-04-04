/**
 * Salesforce sObject type definitions
 * These types represent the Salesforce REST API response structures
 */

/** Base interface for all Salesforce records */
export interface SalesforceRecord {
  Id: string;
  attributes: {
    type: string;
    url: string;
  };
}

/** Account sObject */
export interface Account extends SalesforceRecord {
  Name: string;
  AccountNumber?: string;
  Rating?: 'Hot' | 'Warm' | 'Cold';
  BillingStreet?: string;
  BillingCity?: string;
  BillingState?: string;
  BillingPostalCode?: string;
  BillingCountry?: string;
  Phone?: string;
  Website?: string;
  Industry?: string;
  Description?: string;
}

/** Contact sObject */
export interface Contact extends SalesforceRecord {
  FirstName: string;
  LastName: string;
  AccountId?: string;
  Salutation?: 'Mr.' | 'Ms.' | 'Mrs.' | 'Dr.';
  Email?: string;
  Phone?: string;
  Title?: string;
  Department?: string;
  MailingStreet?: string;
  MailingCity?: string;
}

/** Case sObject */
export interface Case extends SalesforceRecord {
  Subject: string;
  Status: string;
  Priority?: 'High' | 'Medium' | 'Low';
  Origin?: 'Phone' | 'Email' | 'Web';
  ContactId?: string;
  AccountId?: string;
  Description?: string;
}

/** Opportunity sObject */
export interface Opportunity extends SalesforceRecord {
  Name: string;
  StageName: string;
  CloseDate: string;
  Amount?: number;
  AccountId?: string;
  Description?: string;
}

/** Generic type for sObject creation payloads (strips Id and attributes) */
export type CreatePayload<T extends SalesforceRecord> = Omit<T, 'Id' | 'attributes'>;

/** Salesforce API response for record creation */
export interface SalesforceCreateResponse {
  id: string;
  success: boolean;
  errors: string[];
}

/** Salesforce API response for SOQL queries */
export interface SalesforceQueryResponse<T> {
  totalSize: number;
  done: boolean;
  records: T[];
}

/** Salesforce API error response */
export interface SalesforceErrorResponse {
  message: string;
  errorCode: string;
  fields?: string[];
}
