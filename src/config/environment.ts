/**
 * Environment-aware configuration loader
 * Reads from .env and config/<env>.env
 */

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import type { EnvironmentConfig } from '../types/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..', '..');

// Load default .env
dotenv.config({ path: path.resolve(projectRoot, '.env') });

// Override with environment-specific config
const env = process.env.TestEnv || 'dev';
dotenv.config({
  path: path.resolve(projectRoot, 'config', `${env}.env`),
  override: true,
});

export const EnvConfig: EnvironmentConfig = {
  env,
  baseUrl: process.env.BASE_URL || 'https://login.salesforce.com',
  salesforce: {
    username: process.env.sit_salesforce_username || '',
    passwordApi: process.env.sit_salesforce_password_api || '',
    passwordUi: process.env.sit_salesforce_password_ui || '',
    clientId: process.env.consumer_key || '',
    clientSecret: process.env.consumer_secret || '',
    loginUrl: 'https://login.salesforce.com/services/oauth2/token',
    apiVersion: 'v65.0',
  },
};
