/**
 * Environment configuration type definitions
 */

export interface EnvironmentConfig {
  env: string;
  baseUrl: string;
  salesforce: {
    username: string;
    passwordApi: string;
    passwordUi: string;
    clientId: string;
    clientSecret: string;
    loginUrl: string;
    apiVersion: string;
  };
}

export type Environment = 'dev' | 'qa' | 'staging' | 'prod';
