/**
 * OAuth2 authentication type definitions for Salesforce
 */

/** OAuth2 token response from Salesforce */
export interface OAuthTokenResponse {
  access_token: string;
  instance_url: string;
  id: string;
  token_type: string;
  issued_at: string;
  signature: string;
}

/** Configuration required for Salesforce OAuth2 authentication */
export interface SalesforceAuthConfig {
  loginUrl: string;
  username: string;
  password: string;
  clientId: string;
  clientSecret: string;
}
