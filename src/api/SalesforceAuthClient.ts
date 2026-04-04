/**
 * SalesforceAuthClient — Handles OAuth2 password grant authentication
 * Standalone client (does not extend BaseApiClient since auth precedes CRUD)
 */

import { type APIRequestContext } from '@playwright/test';
import type { OAuthTokenResponse, SalesforceAuthConfig } from '../types/auth.types.js';
import { Logger } from '../utils/logger.js';

export class SalesforceAuthClient {
  constructor(private readonly request: APIRequestContext) {}

  /**
   * Authenticate via OAuth2 password grant flow
   * @param config - Salesforce auth credentials
   * @returns OAuth token response with access_token and instance_url
   */
  async authenticate(config: SalesforceAuthConfig): Promise<OAuthTokenResponse> {
    Logger.info('SalesforceAuth', 'Authenticating via OAuth2 password grant...');

    const response = await this.request.post(config.loginUrl, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      form: {
        grant_type: 'password',
        username: config.username,
        password: config.password,
        client_id: config.clientId,
        client_secret: config.clientSecret,
      },
    });

    if (!response.ok()) {
      const body = await response.text();
      throw new Error(`Salesforce authentication failed [${response.status()}]: ${body}`);
    }

    const token: OAuthTokenResponse = await response.json();
    Logger.info('SalesforceAuth', `Authenticated successfully. Instance: ${token.instance_url}`);
    return token;
  }
}
