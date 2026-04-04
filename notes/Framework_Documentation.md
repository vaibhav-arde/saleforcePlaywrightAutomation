# 📘 Playwright TypeScript — Salesforce Hybrid Test Automation Framework

## Documentation

> **Version**: 1.0.0
> **Runtime**: Node.js 20+ | **TypeScript**: 5.x | **Playwright**: 1.58+
> **Package Manager**: npm
> **Target Application**: Salesforce Lightning (UI + REST API)

---

## 📑 Table of Contents

1. [Framework Overview](#-1-framework-overview)
2. [Project Structure](#-2-project-structure)
3. [Architecture & Design Principles (SOLID + DRY)](#-3-architecture--design-principles-solid--dry)
4. [Technology Stack](#-4-technology-stack)
5. [Core Framework Layer](#-5-core-framework-layer)
6. [Custom Playwright Fixtures](#-6-custom-playwright-fixtures)
7. [Page Objects Layer](#-7-page-objects-layer)
8. [API Clients Layer](#-8-api-clients-layer)
9. [Salesforce-Specific Patterns](#-9-salesforce-specific-patterns)
10. [Utilities Layer](#-10-utilities-layer)
11. [Test Layer](#-11-test-layer)
12. [Test Data Management](#-12-test-data-management)
13. [Configuration Files](#-13-configuration-files)
14. [Reporting](#-14-reporting)
15. [CI/CD Pipeline](#-15-cicd-pipeline)
16. [Code Quality & Linting](#-16-code-quality--linting)
17. [How to Run Tests](#-17-how-to-run-tests)
18. [Dependency Graph](#-18-dependency-graph)
19. [File Reference Index](#-19-file-reference-index)

---

## 🎯 1. Framework Overview

This is a **Senior SDET / Architect level** enterprise test automation framework built with **Playwright + TypeScript** following the **Hybrid Testing Pattern** (UI + API) for **Salesforce**.

### Key Capabilities

| Capability               | Implementation                                                   |
| ------------------------ | ---------------------------------------------------------------- |
| UI Testing               | Playwright browser automation via Page Object Model              |
| API Testing              | Playwright `APIRequestContext` via typed API Client pattern      |
| Hybrid Testing           | API creates data → UI validates → fast + reliable                |
| Parallel Execution       | Playwright built-in `--workers=auto`                             |
| Retry on Failure         | Playwright built-in `retries: 2`                                 |
| Data-Driven Testing      | JSON / CSV data sources with TypeScript interfaces               |
| Multi-Browser Support    | Chromium, Firefox, WebKit via `--project`                        |
| Reporting                | HTML + Allure + Trace Viewer                                     |
| CI/CD                    | GitHub Actions with Node.js + npm                                |
| Code Quality             | ESLint + Prettier + Husky + TypeScript `strict`                  |
| Salesforce Auth          | OAuth2 password grant via session-scoped fixture                 |
| Lightning UI             | Custom locator strategies for SLDS / Lightning Web Components    |

---

## 🗂 2. Project Structure

```text
SalesforceAutomation/
│
├── playwright.config.ts            ← Playwright configuration (TypeScript)
├── tsconfig.json                   ← TypeScript compiler options
├── package.json                    ← Dependencies & npm scripts
├── package-lock.json               ← Locked dependency resolution
├── .env                            ← Default environment variables
├── .env.example                    ← Template for env vars (committed)
├── .eslintrc.json                  ← ESLint configuration
├── .prettierrc                     ← Prettier configuration
├── .gitignore                      ← Git ignore rules
├── README.md                       ← Project readme
│
├── config/                         ← 🔧 ENVIRONMENT CONFIGS
│   ├── dev.env                     ←   Dev environment variables
│   ├── qa.env                      ←   QA environment variables
│   ├── staging.env                 ←   Staging environment variables
│   └── prod.env                    ←   Production environment variables
│
├── src/                            ← 📦 FRAMEWORK SOURCE CODE
│   │
│   ├── types/                      ← 🏷 TYPESCRIPT INTERFACES & TYPES
│   │   ├── index.ts                ←   Barrel export
│   │   ├── salesforce.types.ts     ←   SF API response types (Account, Contact, etc.)
│   │   ├── auth.types.ts           ←   OAuth2 token response types
│   │   ├── config.types.ts         ←   Environment config interfaces
│   │   └── test-data.types.ts      ←   Test data payload interfaces
│   │
│   ├── config/                     ← ⚙️ CONFIGURATION & CONSTANTS
│   │   ├── environment.ts          ←   Environment-aware config loader
│   │   ├── constants.ts            ←   API endpoints, SF routes, timeouts
│   │   └── salesforce.config.ts    ←   Salesforce-specific settings (API version, org URL)
│   │
│   ├── fixtures/                   ← 🔩 CUSTOM PLAYWRIGHT FIXTURES
│   │   ├── index.ts                ←   Barrel export — merged fixture type
│   │   ├── auth.fixture.ts         ←   Session-scoped SF OAuth2 auth
│   │   ├── api-client.fixture.ts   ←   Authenticated API client fixture
│   │   └── salesforce-page.fixture.ts ← Logged-in SF page fixture
│   │
│   ├── pages/                      ← 📄 PAGE OBJECTS (POM Pattern)
│   │   ├── BasePage.ts             ←   Abstract base — inherited by all pages
│   │   ├── LoginPage.ts            ←   Salesforce login form
│   │   ├── AppLauncherPage.ts      ←   App Launcher navigation
│   │   ├── AccountPage.ts          ←   Account list + record operations
│   │   ├── ContactPage.ts          ←   Contact list + record operations
│   │   ├── CasePage.ts             ←   Case list + record operations
│   │   ├── OpportunityPage.ts      ←   Opportunity operations
│   │   └── GenericRecordPage.ts    ←   Dynamic record detail page
│   │
│   ├── api/                        ← 🌐 API CLIENT ABSTRACTIONS
│   │   ├── BaseApiClient.ts        ←   Generic base — typed CRUD operations
│   │   ├── SalesforceAuthClient.ts ←   OAuth2 authentication
│   │   ├── AccountApiClient.ts     ←   Account sObject CRUD
│   │   ├── ContactApiClient.ts     ←   Contact sObject CRUD
│   │   └── GenericSObjectClient.ts ←   Dynamic sObject CRUD (any object)
│   │
│   └── utils/                      ← 🛠 SHARED UTILITIES
│       ├── logger.ts               ←   Centralized logging (Winston / console)
│       ├── data-loader.ts          ←   JSON / CSV data readers with type safety
│       ├── helpers.ts              ←   Random data generation (Faker)
│       ├── wait-helpers.ts         ←   Salesforce-specific wait utilities
│       └── sf-locators.ts          ←   Lightning component locator builders
│
├── tests/                          ← 🧪 TEST SUITES
│   ├── ui/                         ←   UI test suite
│   │   ├── login.spec.ts
│   │   ├── account-crud.spec.ts
│   │   ├── contact-crud.spec.ts
│   │   └── case-crud.spec.ts
│   ├── api/                        ←   API test suite
│   │   ├── account-api.spec.ts
│   │   ├── contact-api.spec.ts
│   │   └── sobject-api.spec.ts
│   └── e2e/                        ←   Hybrid API+UI tests
│       ├── account-contact-e2e.spec.ts
│       └── opportunity-e2e.spec.ts
│
├── test-data/                      ← 📊 EXTERNAL TEST DATA FILES
│   ├── accounts.json
│   ├── contacts.json
│   └── login-credentials.json
│
├── reports/                        ← 📈 GENERATED REPORTS (gitignored)
│   ├── allure-results/
│   └── screenshots/
│
├── .husky/                         ← 🐶 GIT HOOKS
│   └── pre-commit                  ←   Runs lint-staged on commit
│
└── .github/workflows/              ← 🚀 CI/CD
    └── playwright.yml
```

---

## 🧠 3. Architecture & Design Principles (SOLID + DRY)

### 3.1 SOLID Principles — Mapped to Framework

| Principle | Application in Framework |
| --------- | ----------------------------------------------------------- |
| **S**ingle Responsibility | Each page object handles exactly one page/component. Each API client handles one sObject. |
| **O**pen/Closed | `BasePage` is open for extension (new pages), closed for modification. New SF objects = new page class, not editing base. |
| **L**iskov Substitution | Any derived page (e.g., `AccountPage`) can substitute `BasePage` wherever `BasePage` is expected. |
| **I**nterface Segregation | Separate interfaces: `Navigable`, `Searchable`, `CRUDable`, `Authenticatable` — classes implement only what they need. |
| **D**ependency Inversion | Tests depend on abstractions (interfaces/fixture types), not concrete class implementations. Fixtures inject dependencies. |

### 3.2 DRY Principle — Applied Throughout

| Area | DRY Implementation |
| -------------------------------- | ---------------------------------------------------- |
| Login / Auth | Session-scoped `sfAuth` fixture — authenticates once, reuses across all tests |
| API Headers | `BaseApiClient` centralizes auth headers — never repeated in tests |
| Salesforce Locators | `sf-locators.ts` utility builds Lightning locators dynamically — no string duplication |
| Page Navigation | `BasePage.navigateTo()` method — all pages inherit navigation logic |
| Environment Config | Single `environment.ts` config loader — all consumers read from one source |
| Test Data | `data-loader.ts` + typed interfaces — data defined once, used everywhere |

### 3.3 Layered Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      TEST LAYER                          │
│   tests/ui/*.spec.ts | tests/api/*.spec.ts | tests/e2e/ │
├─────────────────────────────────────────────────────────┤
│             PAGE OBJECTS / API CLIENTS                    │
│  pages/*.ts (→ BasePage)  |  api/*.ts (→ BaseApiClient)  │
├─────────────────────────────────────────────────────────┤
│              CUSTOM FIXTURES LAYER                       │
│   fixtures/auth | api-client | salesforce-page           │
├─────────────────────────────────────────────────────────┤
│                  UTILITIES LAYER                         │
│  config | constants | logger | data-loader | helpers     │
├─────────────────────────────────────────────────────────┤
│                    TYPES LAYER                           │
│  interfaces | type aliases | enums                       │
├─────────────────────────────────────────────────────────┤
│    PLAYWRIGHT + TYPESCRIPT (Infrastructure)              │
└─────────────────────────────────────────────────────────┘
```

### 3.4 Data Flow — Hybrid Test Pattern

```
API creates data → UI validates → fast + reliable

Example (Salesforce Account + Contact):
  1. API:  POST /sobjects/Account  → creates account (returns record ID)
  2. API:  POST /sobjects/Contact  → creates contact linked to account
  3. UI:   Navigate to Contact record → verify linked account visible
  4. API:  DELETE cleanup → removes test data (no orphaned records)
```

---

## 🛠 4. Technology Stack

### Runtime Dependencies

| Package                | Purpose                                          |
| ---------------------- | ------------------------------------------------ |
| `@playwright/test`     | Test runner + browser automation + API testing   |
| `typescript`           | Static typing, interfaces, generics              |
| `dotenv`               | Environment variable loading from `.env` files   |
| `@faker-js/faker`      | Random test data generation                      |
| `allure-playwright`    | Allure reporting integration                     |
| `tsconfig-paths`       | Path alias resolution at runtime                 |

### Dev Dependencies

| Package                     | Purpose                                    |
| --------------------------- | ------------------------------------------ |
| `eslint`                    | Linter                                     |
| `@typescript-eslint/parser` | TypeScript parser for ESLint               |
| `@typescript-eslint/eslint-plugin` | TypeScript-specific lint rules      |
| `eslint-plugin-playwright`  | Playwright-specific lint rules             |
| `prettier`                  | Code formatter                             |
| `eslint-config-prettier`    | Disables ESLint rules that conflict with Prettier |
| `husky`                     | Git hooks manager                          |
| `lint-staged`               | Run linters on staged files only           |

### Package Management

- **`npm`** is the package manager
- Dependencies declared in `package.json`
- Lockfile: `package-lock.json`
- Node version: 20+ (LTS) — pinned via `.nvmrc`

---

## 🧱 5. Core Framework Layer

### 5.1 TypeScript Interfaces (src/types/)

#### Salesforce API Types

```typescript
// src/types/salesforce.types.ts

export interface SalesforceRecord {
  Id: string;
  attributes: {
    type: string;
    url: string;
  };
}

export interface Account extends SalesforceRecord {
  Name: string;
  AccountNumber?: string;
  Rating?: 'Hot' | 'Warm' | 'Cold';
  BillingStreet?: string;
  BillingCity?: string;
}

export interface Contact extends SalesforceRecord {
  FirstName: string;
  LastName: string;
  AccountId?: string;
  Salutation?: 'Mr.' | 'Ms.' | 'Mrs.' | 'Dr.';
  Email?: string;
}

// Generic type for any sObject creation payload
export type CreatePayload<T extends SalesforceRecord> = Omit<T, 'Id' | 'attributes'>;

// API response types
export interface SalesforceCreateResponse {
  id: string;
  success: boolean;
  errors: string[];
}

export interface SalesforceQueryResponse<T> {
  totalSize: number;
  done: boolean;
  records: T[];
}
```

#### Auth Types

```typescript
// src/types/auth.types.ts

export interface OAuthTokenResponse {
  access_token: string;
  instance_url: string;
  id: string;
  token_type: string;
  issued_at: string;
  signature: string;
}

export interface SalesforceAuthConfig {
  loginUrl: string;
  username: string;
  password: string;
  clientId: string;
  clientSecret: string;
}
```

### 5.2 BasePage (`src/pages/BasePage.ts`)

The **abstract foundation** of all Page Objects. Every page class extends `BasePage`:

```typescript
// src/pages/BasePage.ts

import { type Page, type Locator, expect } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  // ─── Navigation ──────────────────────────────────────────────
  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async waitForPageLoad(urlPattern: string | RegExp, timeout = 30_000): Promise<void> {
    await this.page.waitForURL(urlPattern, { timeout });
  }

  // ─── Element Interactions ────────────────────────────────────
  async click(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  async fill(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(value);
  }

  async getText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    return (await locator.innerText()).trim();
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  // ─── Salesforce-Specific Helpers ─────────────────────────────
  async selectLightningDropdown(ariaLabel: string, value: string): Promise<void> {
    const dropdown = this.page.locator(`//button[@aria-label='${ariaLabel}']`);
    await this.click(dropdown);
    const option = this.page.locator(
      `//lightning-base-combobox-item[@data-value='${value}']`
    );
    await this.click(option);
  }

  async selectLookupField(placeholder: string, searchTerm: string): Promise<void> {
    const input = this.page.locator(`[placeholder='${placeholder}']`);
    await this.click(input);
    await input.pressSequentially(searchTerm);
    const option = this.page.locator(
      `//lightning-base-combobox-formatted-text[@title='${searchTerm}']`
    );
    await this.click(option);
  }

  async clickSaveButton(): Promise<void> {
    await this.click(this.page.locator("[name='SaveEdit']"));
  }

  // ─── Page State ──────────────────────────────────────────────
  getTitle(): Promise<string> {
    return this.page.title();
  }

  getUrl(): string {
    return this.page.url();
  }

  // ─── Assertions ──────────────────────────────────────────────
  async expectVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  async expectToContainText(locator: Locator, text: string): Promise<void> {
    await expect(locator).toContainText(text);
  }
}
```

### 5.3 BaseApiClient (`src/api/BaseApiClient.ts`)

The **generic foundation** for all API Client classes. Uses TypeScript generics for type-safe CRUD:

```typescript
// src/api/BaseApiClient.ts

import { type APIRequestContext } from '@playwright/test';
import type { SalesforceCreateResponse } from '../types/salesforce.types';

export abstract class BaseApiClient<T> {
  constructor(
    protected readonly request: APIRequestContext,
    protected readonly instanceUrl: string,
    protected readonly accessToken: string,
    protected readonly apiVersion: string = 'v65.0',
  ) {}

  // ─── Internal Helpers ────────────────────────────────────────
  protected get baseUrl(): string {
    return `${this.instanceUrl}/services/data/${this.apiVersion}/sobjects`;
  }

  protected get authHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.accessToken}`,
    };
  }

  protected abstract get sObjectName(): string;

  // ─── Generic CRUD Operations ─────────────────────────────────
  async create(payload: Partial<T>): Promise<SalesforceCreateResponse> {
    const response = await this.request.post(
      `${this.baseUrl}/${this.sObjectName}/`,
      { headers: this.authHeaders, data: payload },
    );
    if (!response.ok()) {
      throw new Error(`Create ${this.sObjectName} failed: ${response.status()}`);
    }
    return response.json();
  }

  async getById(id: string): Promise<T> {
    const response = await this.request.get(
      `${this.baseUrl}/${this.sObjectName}/${id}`,
      { headers: this.authHeaders },
    );
    if (!response.ok()) {
      throw new Error(`Get ${this.sObjectName} ${id} failed: ${response.status()}`);
    }
    return response.json();
  }

  async update(id: string, payload: Partial<T>): Promise<void> {
    const response = await this.request.patch(
      `${this.baseUrl}/${this.sObjectName}/${id}`,
      { headers: this.authHeaders, data: payload },
    );
    if (!response.ok()) {
      throw new Error(`Update ${this.sObjectName} ${id} failed: ${response.status()}`);
    }
  }

  async delete(id: string): Promise<void> {
    const response = await this.request.delete(
      `${this.baseUrl}/${this.sObjectName}/${id}`,
      { headers: this.authHeaders },
    );
    if (!response.ok()) {
      throw new Error(`Delete ${this.sObjectName} ${id} failed: ${response.status()}`);
    }
  }
}
```

**Usage — Creating a new API client (OCP — extend, don't modify):**

```typescript
// src/api/AccountApiClient.ts

import { BaseApiClient } from './BaseApiClient';
import type { Account } from '../types/salesforce.types';

export class AccountApiClient extends BaseApiClient<Account> {
  protected get sObjectName(): string {
    return 'Account';
  }

  // Domain-specific methods
  async createWithDefaults(name: string): Promise<string> {
    const result = await this.create({ Name: name, Rating: 'Hot' });
    return result.id;
  }
}
```

---

## 🔩 6. Custom Playwright Fixtures

### Architecture Decision

```text
✔ Custom fixtures are defined using test.extend<T>() — Playwright-native approach
✔ Fixtures handle setup/teardown lifecycle (no manual cleanup in tests)
✔ Session-scoped auth — authenticates once, reuses token across all tests
✔ Worker-scoped API client — one per parallel worker
```

### 6.1 Auth Fixture (`src/fixtures/auth.fixture.ts`)

```typescript
// src/fixtures/auth.fixture.ts

import { test as base, type APIRequestContext } from '@playwright/test';
import type { OAuthTokenResponse, SalesforceAuthConfig } from '../types/auth.types';

export type AuthFixtures = {
  authToken: OAuthTokenResponse;
};

export const authFixture = base.extend<{}, AuthFixtures>({
  authToken: [
    async ({ playwright }, use) => {
      const config: SalesforceAuthConfig = {
        loginUrl: 'https://login.salesforce.com/services/oauth2/token',
        username: process.env.sit_salesforce_username!,
        password: process.env.sit_salesforce_password!,
        clientId: process.env.consumer_key!,
        clientSecret: process.env.consumer_secret!,
      };

      const requestContext = await playwright.request.newContext();

      const response = await requestContext.post(config.loginUrl, {
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
        throw new Error(`Salesforce auth failed: ${response.status()}`);
      }

      const token: OAuthTokenResponse = await response.json();
      await use(token);
      await requestContext.dispose();
    },
    { scope: 'worker' },
  ],
});
```

### 6.2 API Client Fixture (`src/fixtures/api-client.fixture.ts`)

```typescript
// src/fixtures/api-client.fixture.ts

import { type APIRequestContext } from '@playwright/test';
import { authFixture } from './auth.fixture';
import { AccountApiClient } from '../api/AccountApiClient';
import { ContactApiClient } from '../api/ContactApiClient';

export type ApiClientFixtures = {
  accountApi: AccountApiClient;
  contactApi: ContactApiClient;
};

export const apiClientFixture = authFixture.extend<ApiClientFixtures>({
  accountApi: async ({ authToken, request }, use) => {
    const client = new AccountApiClient(
      request,
      authToken.instance_url,
      authToken.access_token,
    );
    await use(client);
  },

  contactApi: async ({ authToken, request }, use) => {
    const client = new ContactApiClient(
      request,
      authToken.instance_url,
      authToken.access_token,
    );
    await use(client);
  },
});
```

### 6.3 Salesforce Page Fixture (`src/fixtures/salesforce-page.fixture.ts`)

```typescript
// src/fixtures/salesforce-page.fixture.ts

import { apiClientFixture } from './api-client.fixture';
import { LoginPage } from '../pages/LoginPage';

export type SalesforcePageFixtures = {
  loggedInPage: LoginPage;
};

export const test = apiClientFixture.extend<SalesforcePageFixtures>({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginToSalesforce(
      process.env.sit_salesforce_username!,
      process.env.sit_salesforce_password!,
    );
    await loginPage.assertLoginSuccess();
    await use(loginPage);
  },
});

export { expect } from '@playwright/test';
```

### 6.4 Barrel Export (`src/fixtures/index.ts`)

```typescript
// src/fixtures/index.ts
// Single import for all tests

export { test, expect } from './salesforce-page.fixture';
```

**Usage in tests — clean, declarative, DRY:**

```typescript
import { test, expect } from '../../src/fixtures';

test('Create account via API and verify in UI', async ({ loggedInPage, accountApi, page }) => {
  // API: create account
  const accountId = await accountApi.createWithDefaults('Playwright Account');

  // UI: navigate and verify
  // ... page interactions
});
```

---

## 📄 7. Page Objects Layer

### Inheritance Chain

```text
BasePage (abstract)
    ├── LoginPage
    ├── AppLauncherPage
    ├── AccountPage
    ├── ContactPage
    ├── CasePage
    ├── OpportunityPage
    └── GenericRecordPage
```

### Page Object Reference

| Page Object           | File                       | Key Responsibilities                             |
| --------------------- | -------------------------- | ------------------------------------------------ |
| `BasePage`            | `src/pages/BasePage.ts`    | Navigation, clicks, fills, SF dropdown helpers   |
| `LoginPage`           | `src/pages/LoginPage.ts`   | SF login form, login action, success assertion   |
| `AppLauncherPage`     | `src/pages/AppLauncherPage.ts` | App Launcher navigation to any SF object     |
| `AccountPage`         | `src/pages/AccountPage.ts` | Account CRUD: create, edit, assert               |
| `ContactPage`         | `src/pages/ContactPage.ts` | Contact CRUD: create, link to account, assert    |
| `CasePage`            | `src/pages/CasePage.ts`    | Case CRUD: create, assert                        |
| `OpportunityPage`     | `src/pages/OpportunityPage.ts` | Opportunity operations                       |
| `GenericRecordPage`   | `src/pages/GenericRecordPage.ts` | Dynamic record detail for any sObject      |

### Page Object Pattern (TypeScript)

Every page object follows this consistent structure:

```typescript
import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountPage extends BasePage {
  // ─── Locators (readonly — ISP: only locators this page needs) ──
  private readonly newButton: Locator;
  private readonly accountNameInput: Locator;
  private readonly accountNumberInput: Locator;

  constructor(page: Page) {
    super(page);
    this.newButton = page.locator("//a[@title='New']");
    this.accountNameInput = page.locator("[name='Name']");
    this.accountNumberInput = page.locator("[name='AccountNumber']");
  }

  // ─── Actions ─────────────────────────────────────────────────
  async assertAccountTab(): Promise<void> {
    await this.waitForPageLoad('**/Account/**');
  }

  async createNewAccount(name: string, number: string, rating: string): Promise<void> {
    await this.click(this.newButton);
    await this.fill(this.accountNameInput, name);
    await this.fill(this.accountNumberInput, number);
    await this.selectLightningDropdown('Rating', rating);   // ← DRY: inherited from BasePage
    await this.clickSaveButton();                           // ← DRY: inherited from BasePage
  }

  // ─── Assertions ──────────────────────────────────────────────
  async assertAccountCreated(name: string): Promise<void> {
    const nameElement = this.page.locator(
      `//lightning-formatted-text[text()='${name}']`
    );
    await this.expectVisible(nameElement);                  // ← DRY: inherited from BasePage
  }
}
```

---

## 🌐 8. API Clients Layer

### Inheritance Chain

```text
BaseApiClient<T> (abstract, generic)
    ├── SalesforceAuthClient
    ├── AccountApiClient
    ├── ContactApiClient
    └── GenericSObjectClient
```

### API Client Reference

| Client                   | File                         | sObject   | Key Methods                 |
| ------------------------ | ---------------------------- | --------- | --------------------------- |
| `BaseApiClient<T>`       | `src/api/BaseApiClient.ts`   | —         | `create`, `getById`, `update`, `delete` |
| `SalesforceAuthClient`   | `src/api/SalesforceAuthClient.ts` | —    | `authenticate()` → token   |
| `AccountApiClient`       | `src/api/AccountApiClient.ts`| Account   | `createWithDefaults(name)` |
| `ContactApiClient`       | `src/api/ContactApiClient.ts`| Contact   | `createLinkedToAccount()`  |
| `GenericSObjectClient`   | `src/api/GenericSObjectClient.ts` | Any  | Dynamic CRUD for any sObject |

### How to Extend — Adding a new API Client (OCP)

```typescript
// src/api/OpportunityApiClient.ts

import { BaseApiClient } from './BaseApiClient';

interface Opportunity {
  Id: string;
  Name: string;
  StageName: string;
  CloseDate: string;
  Amount?: number;
  attributes: { type: string; url: string };
}

export class OpportunityApiClient extends BaseApiClient<Opportunity> {
  protected get sObjectName(): string {
    return 'Opportunity';
  }

  async createOpportunity(name: string, stage: string, closeDate: string): Promise<string> {
    const result = await this.create({
      Name: name,
      StageName: stage,
      CloseDate: closeDate,
    });
    return result.id;
  }
}
```

**Usage in tests:**

```typescript
test('Create opportunity via API', async ({ authToken, request }) => {
  const api = new OpportunityApiClient(
    request,
    authToken.instance_url,
    authToken.access_token,
  );
  const id = await api.createOpportunity('Big Deal', 'Prospecting', '2026-12-31');
  expect(id).toBeTruthy();
});
```

---

## ⚡ 9. Salesforce-Specific Patterns

### 9.1 OAuth2 Password Grant Flow

```
┌──────────┐    POST /services/oauth2/token     ┌──────────────┐
│  Client   │ ──────────────────────────────────▶ │  Salesforce   │
│ (Test)    │    grant_type=password              │  Auth Server  │
│           │    username + password              │               │
│           │    client_id + client_secret        │               │
│           │ ◀────────────────────────────────── │               │
│           │    { access_token, instance_url }   │               │
└──────────┘                                     └──────────────┘
```

### 9.2 Lightning Component Locator Strategies

```typescript
// src/utils/sf-locators.ts — Reusable Lightning locator builders

export const SFLocators = {
  /** Lightning combobox dropdown trigger */
  dropdownButton: (ariaLabel: string) =>
    `//button[@aria-label='${ariaLabel}']`,

  /** Lightning combobox item */
  dropdownItem: (value: string) =>
    `//lightning-base-combobox-item[@data-value='${value}']`,

  /** Lightning lookup search field */
  lookupInput: (placeholder: string) =>
    `[placeholder='${placeholder}']`,

  /** Lightning lookup result option */
  lookupOption: (title: string) =>
    `//lightning-base-combobox-formatted-text[@title='${title}']`,

  /** Lightning formatted text (record name) */
  formattedText: (text: string) =>
    `//lightning-formatted-text[text()='${text}']`,

  /** Lightning formatted name (contact name) */
  formattedName: (fullName: string) =>
    `//lightning-formatted-name[text()='${fullName}']`,

  /** App Launcher button */
  appLauncher: () =>
    "//div[contains(@class,'appLauncher')]",

  /** App Launcher search input */
  appLauncherSearch: () =>
    "[placeholder='Search apps and items...']",

  /** App Launcher result link */
  appLauncherResult: (label: string) =>
    `[data-label='${label}']`,

  /** Standard 'New' button on list views */
  newButton: () =>
    "//a[@title='New']",
} as const;
```

### 9.3 Salesforce Wait Helpers

```typescript
// src/utils/wait-helpers.ts

import { type Page } from '@playwright/test';

export class SalesforceWaitHelpers {
  constructor(private readonly page: Page) {}

  /** Wait for Lightning page to fully load */
  async waitForLightningReady(timeout = 60_000): Promise<void> {
    await this.page.waitForURL('**/lightning/**', { timeout });
  }

  /** Wait for record page to load after save */
  async waitForRecordSave(objectName: string, timeout = 30_000): Promise<void> {
    await this.page.waitForURL(`**/${objectName}/**`, { timeout });
  }

  /** Wait for toast notification (success/error) */
  async waitForToast(): Promise<string> {
    const toast = this.page.locator('.slds-notify__content');
    await toast.waitFor({ state: 'visible', timeout: 10_000 });
    return toast.innerText();
  }
}
```

---

## ⚙️ 10. Utilities Layer

### 10.1 Environment Configuration (`src/config/environment.ts`)

```typescript
// src/config/environment.ts

import dotenv from 'dotenv';
import path from 'path';

// Load default .env
dotenv.config();

// Override with environment-specific config
const env = process.env.TestEnv || 'dev';
dotenv.config({
  path: path.resolve(process.cwd(), 'config', `${env}.env`),
  override: true,
});

export const EnvConfig = {
  env,
  baseUrl: process.env.BASE_URL || 'https://login.salesforce.com',
  salesforce: {
    username: process.env.sit_salesforce_username!,
    password: process.env.sit_salesforce_password!,
    clientId: process.env.consumer_key!,
    clientSecret: process.env.consumer_secret!,
    loginUrl: 'https://login.salesforce.com/services/oauth2/token',
    apiVersion: 'v65.0',
  },
} as const;
```

### 10.2 Constants (`src/config/constants.ts`)

```typescript
// src/config/constants.ts

export const SF_API = {
  AUTH_ENDPOINT: '/services/oauth2/token',
  SOBJECTS_BASE: '/services/data/v65.0/sobjects',
  QUERY_ENDPOINT: '/services/data/v65.0/query',
} as const;

export const SF_ROUTES = {
  LOGIN: 'https://login.salesforce.com',
  ACCOUNTS: '/lightning/o/Account/list?filterName=__Recent',
  CONTACTS: '/lightning/o/Contact/list?filterName=__Recent',
  CASES: '/lightning/o/Case/list?filterName=__Recent',
  OPPORTUNITIES: '/lightning/o/Opportunity/list?filterName=__Recent',
} as const;

export const TIMEOUTS = {
  PAGE_LOAD: 60_000,
  ELEMENT_WAIT: 30_000,
  API_RESPONSE: 15_000,
  TOAST: 10_000,
} as const;
```

### 10.3 Logger (`src/utils/logger.ts`)

```typescript
// src/utils/logger.ts

type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

function log(level: LogLevel, context: string, message: string): void {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} | ${level.padEnd(5)} | ${context} | ${message}`);
}

export const Logger = {
  info: (context: string, msg: string) => log('INFO', context, msg),
  warn: (context: string, msg: string) => log('WARN', context, msg),
  error: (context: string, msg: string) => log('ERROR', context, msg),
  debug: (context: string, msg: string) => log('DEBUG', context, msg),
};
```

### 10.4 Data Loader (`src/utils/data-loader.ts`)

```typescript
// src/utils/data-loader.ts

import fs from 'fs';
import path from 'path';

export function loadJsonData<T>(filePath: string): T[] {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const rawData = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(rawData) as T[];
}

export function loadCsvData(filePath: string): string[][] {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const rawData = fs.readFileSync(absolutePath, 'utf-8');
  return rawData
    .trim()
    .split('\n')
    .map((line) => line.split(',').map((cell) => cell.trim()));
}
```

### 10.5 Helpers (`src/utils/helpers.ts`)

```typescript
// src/utils/helpers.ts

import { faker } from '@faker-js/faker';

export const TestDataHelper = {
  accountName: () => `Auto Account ${Date.now()}`,
  contactFirstName: () => faker.person.firstName(),
  contactLastName: () => faker.person.lastName(),
  email: () => faker.internet.email(),
  phoneNumber: () => faker.phone.number(),
  streetAddress: () => faker.location.streetAddress(),
  city: () => faker.location.city(),
  uniqueId: () => `${Date.now()}-${faker.string.alphanumeric(6)}`,
};
```

---

## 🧪 11. Test Layer

### 11.1 Test Suite Overview

| Test File                         | Tags                        | Description                                  |
| --------------------------------- | --------------------------- | -------------------------------------------- |
| `login.spec.ts`                   | `@smoke`, `@ui`             | Valid + invalid login scenarios               |
| `account-crud.spec.ts`            | `@regression`, `@ui`        | Account create, edit, delete via UI           |
| `contact-crud.spec.ts`            | `@regression`, `@ui`        | Contact create, link to account via UI        |
| `case-crud.spec.ts`               | `@regression`, `@ui`        | Case operations via UI                        |
| `account-api.spec.ts`             | `@smoke`, `@api`            | Account CRUD via REST API                     |
| `contact-api.spec.ts`             | `@regression`, `@api`       | Contact CRUD via REST API                     |
| `sobject-api.spec.ts`             | `@regression`, `@api`       | Generic sObject operations                    |
| `account-contact-e2e.spec.ts`     | `@e2e`, `@critical`         | API creates account → UI creates linked contact |
| `opportunity-e2e.spec.ts`         | `@e2e`                      | End-to-end opportunity flow                   |

### 11.2 Test Anatomy

Every test follows this pattern:

```typescript
// tests/ui/account-crud.spec.ts

import { test, expect } from '../../src/fixtures';
import { AppLauncherPage } from '../../src/pages/AppLauncherPage';
import { AccountPage } from '../../src/pages/AccountPage';
import { TestDataHelper } from '../../src/utils/helpers';

test.describe('Account CRUD Operations', { tag: '@regression' }, () => {

  test('should create a new account via UI', { tag: '@ui' }, async ({ loggedInPage, page }) => {
    // Arrange
    const appLauncher = new AppLauncherPage(page);
    const accountPage = new AccountPage(page);
    const accountName = TestDataHelper.accountName();

    // Act
    await appLauncher.navigateToObject('Accounts');
    await accountPage.assertAccountTab();
    await accountPage.createNewAccount(accountName, '12345', 'Hot');

    // Assert
    await accountPage.assertAccountCreated(accountName);
  });
});
```

### 11.3 Hybrid Test Anatomy (API + UI)

```typescript
// tests/e2e/account-contact-e2e.spec.ts

import { test, expect } from '../../src/fixtures';
import { AppLauncherPage } from '../../src/pages/AppLauncherPage';
import { ContactPage } from '../../src/pages/ContactPage';

test.describe('Account-Contact E2E', { tag: '@e2e' }, () => {

  test('API creates account → UI creates linked contact', { tag: '@critical' },
    async ({ loggedInPage, accountApi, page }) => {
      // API: Create account
      const accountName = `E2E Account ${Date.now()}`;
      const accountId = await accountApi.createWithDefaults(accountName);
      expect(accountId).toBeTruthy();

      // UI: Navigate to Contacts and create
      const appLauncher = new AppLauncherPage(page);
      await appLauncher.navigateToObject('Contacts');

      const contactPage = new ContactPage(page);
      await contactPage.assertContactTab();
      await contactPage.createNewContact('Mr.', 'John', 'Doe', accountName);
      await contactPage.assertContactCreated('Mr.', 'John', 'Doe');

      // Cleanup: Delete via API (DRY — no orphaned records)
      await accountApi.delete(accountId);
    },
  );
});
```

### 11.4 Test Tags

| Tag              | Purpose                                        |
| ---------------- | ---------------------------------------------- |
| `@smoke`         | Quick basic checks — run on every PR           |
| `@regression`    | Full validation — run on dev merge             |
| `@critical`      | Must-pass — blocks promotion to main           |
| `@e2e`           | End-to-end hybrid flows                        |
| `@api`           | API-only tests                                 |
| `@ui`            | UI-only tests                                  |
| `@quarantine`    | Flaky tests — isolated from main pipeline      |

---

## 📊 12. Test Data Management

### Data Sources

```text
test-data/
├── accounts.json        ← Account creation payloads
├── contacts.json        ← Contact creation payloads
└── login-credentials.json ← Login test data (valid + invalid)
```

### JSON Format with TypeScript Interface

```typescript
// src/types/test-data.types.ts
export interface LoginTestData {
  testName: string;
  username: string;
  password: string;
  expected: 'success' | 'failure';
}
```

```json
// test-data/login-credentials.json
[
  { "testName": "Valid login", "username": "user@sf.com", "password": "pass123", "expected": "success" },
  { "testName": "Invalid login", "username": "bad@sf.com", "password": "wrong", "expected": "failure" }
]
```

### Usage in Tests (Data-Driven)

```typescript
import { test } from '../../src/fixtures';
import { loadJsonData } from '../../src/utils/data-loader';
import type { LoginTestData } from '../../src/types/test-data.types';

const loginData = loadJsonData<LoginTestData>('test-data/login-credentials.json');

for (const data of loginData) {
  test(`Login — ${data.testName}`, { tag: '@datadriven' }, async ({ page }) => {
    // ... test logic using data.username, data.password, data.expected
  });
}
```

---

## 📋 13. Configuration Files

### 13.1 `playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment config
dotenv.config();
const env = process.env.TestEnv || 'dev';
dotenv.config({ path: path.resolve(__dirname, 'config', `${env}.env`), override: true });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],
  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

### 13.2 `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "outDir": "./dist",
    "rootDir": ".",
    "baseUrl": ".",
    "paths": {
      "@pages/*": ["src/pages/*"],
      "@api/*": ["src/api/*"],
      "@fixtures/*": ["src/fixtures/*"],
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"],
      "@config/*": ["src/config/*"]
    }
  },
  "include": ["src/**/*.ts", "tests/**/*.ts", "playwright.config.ts"],
  "exclude": ["node_modules", "dist", "reports"]
}
```

### 13.3 `package.json` (Scripts)

```json
{
  "scripts": {
    "test": "npx playwright test",
    "test:ui": "npx playwright test --grep @ui",
    "test:api": "npx playwright test --grep @api",
    "test:e2e": "npx playwright test --grep @e2e",
    "test:smoke": "npx playwright test --grep @smoke",
    "test:regression": "npx playwright test --grep @regression",
    "test:headed": "npx playwright test --headed",
    "test:debug": "npx playwright test --debug",
    "report": "npx playwright show-report",
    "lint": "eslint . --ext .ts",
    "lint:fix": "eslint . --ext .ts --fix",
    "format": "prettier --write '**/*.ts'",
    "format:check": "prettier --check '**/*.ts'",
    "typecheck": "tsc --noEmit",
    "prepare": "husky"
  }
}
```

---

## 📈 14. Reporting

### HTML Reports

```bash
# Generated automatically at: playwright-report/index.html
# Open after test run:
npx playwright show-report
```

### Allure Reports

```bash
# Generate results during test run
npx playwright test --reporter=allure-playwright

# View interactive Allure report
npx allure serve reports/allure-results
```

### Failure Artifacts

On test failure, the framework **automatically captures and attaches**:

| Artifact    | Format  | Condition            |
| ----------- | ------- | -------------------- |
| Screenshot  | `.png`  | On test failure      |
| Video       | `.webm` | Retained on failure  |
| Trace       | `.zip`  | Retained on failure  |

### Trace Viewer

```bash
# Open Playwright Trace Viewer for debugging
npx playwright show-trace test-results/*/trace.zip
```

---

## 🚀 15. CI/CD Pipeline

### GitHub Actions (`.github/workflows/playwright.yml`)

```yaml
name: Playwright Tests
on:
  push:
    branches: [main, dev]
  pull_request:
    branches: [main, dev]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run format:check
      - run: npm run typecheck

  test:
    needs: lint
    runs-on: ubuntu-latest
    strategy:
      matrix:
        project: [chromium, firefox]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps ${{ matrix.project }}
      - name: Run tests
        run: npx playwright test --project=${{ matrix.project }}
        env:
          sit_salesforce_username: ${{ secrets.SF_USERNAME }}
          sit_salesforce_password: ${{ secrets.SF_PASSWORD }}
          consumer_key: ${{ secrets.SF_CLIENT_ID }}
          consumer_secret: ${{ secrets.SF_CLIENT_SECRET }}
      - uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: playwright-report-${{ matrix.project }}
          path: playwright-report/
          retention-days: 14
```

**Pipeline Steps:** Lint + Format + Typecheck → Install Browsers → Run Tests (parallel per browser) → Upload Reports

---

## 🔍 16. Code Quality & Linting

### ESLint Configuration (`.eslintrc.json`)

```json
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "playwright"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:playwright/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "playwright/no-focused-test": "error",
    "playwright/no-skipped-test": "warn",
    "playwright/valid-expect": "error"
  }
}
```

### Prettier Configuration (`.prettierrc`)

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2
}
```

### Running Locally

```bash
npm run lint               # ESLint check
npm run lint:fix           # ESLint auto-fix
npm run format             # Prettier format
npm run format:check       # Prettier check
npm run typecheck          # TypeScript strict check (replaces mypy)
```

---

## 🏃 17. How to Run Tests

### Prerequisites

```bash
# Install Node.js 20+ (use nvm recommended)
nvm install 20
nvm use 20

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps
```

### Run Commands

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/ui/login.spec.ts

# Run with headed browser (visible)
npx playwright test --headed

# Run specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run by tag
npx playwright test --grep @smoke
npx playwright test --grep @regression
npx playwright test --grep "@smoke|@regression"
npx playwright test --grep @api
npx playwright test --grep @ui
npx playwright test --grep @e2e

# Exclude quarantine tests
npx playwright test --grep-invert @quarantine

# Run in parallel (default)
npx playwright test --workers=auto
npx playwright test --workers=4

# Retry failed tests
npx playwright test --retries=2

# Run with custom environment
TestEnv=qa npx playwright test
TestEnv=staging npx playwright test

# Debug mode
npx playwright test --debug

# UI mode (interactive)
npx playwright test --ui

# Generate and view report
npx playwright test
npx playwright show-report
```

---

## 🔗 18. Dependency Graph

```text
src/fixtures/index.ts (barrel export)
    │
    ├── salesforce-page.fixture.ts
    │       ├── uses: api-client.fixture.ts
    │       │       ├── uses: auth.fixture.ts
    │       │       │       └── uses: src/types/auth.types.ts
    │       │       ├── uses: src/api/AccountApiClient.ts (→ BaseApiClient<T>)
    │       │       └── uses: src/api/ContactApiClient.ts (→ BaseApiClient<T>)
    │       └── uses: src/pages/LoginPage.ts (→ BasePage)
    │
    └── @playwright/test (infrastructure)

tests/ui/*.spec.ts
    │
    ├── src/fixtures/ (test, expect)
    ├── src/pages/*.ts (inherit BasePage)
    │       └── src/pages/BasePage.ts
    │               └── src/utils/sf-locators.ts
    ├── src/utils/helpers.ts (TestDataHelper)
    └── src/utils/data-loader.ts (loadJsonData, loadCsvData)

tests/api/*.spec.ts
    │
    ├── src/fixtures/ (test, expect, authToken)
    ├── src/api/*.ts (inherit BaseApiClient<T>)
    │       └── src/api/BaseApiClient.ts
    │               └── src/types/salesforce.types.ts
    └── src/config/constants.ts (SF_API, SF_ROUTES)

tests/e2e/*.spec.ts
    │
    ├── combines UI pages + API clients
    └── full fixture chain (auth → api → page)
```

---

## 📂 19. File Reference Index

### Root Files

| File                 | Purpose                                      |
| -------------------- | -------------------------------------------- |
| `playwright.config.ts` | Playwright + TypeScript configuration      |
| `tsconfig.json`      | TypeScript compiler options + path aliases   |
| `package.json`       | Dependencies, scripts, metadata              |
| `.eslintrc.json`     | ESLint + TypeScript + Playwright rules       |
| `.prettierrc`        | Prettier formatting rules                    |
| `.gitignore`         | Git ignore rules                             |
| `.env`               | Default environment variables                |

### Types (`src/types/`)

| File                    | Key Exports                                          |
| ----------------------- | ---------------------------------------------------- |
| `salesforce.types.ts`   | `Account`, `Contact`, `SalesforceCreateResponse`, `SalesforceQueryResponse<T>` |
| `auth.types.ts`         | `OAuthTokenResponse`, `SalesforceAuthConfig`         |
| `config.types.ts`       | `EnvironmentConfig`                                  |
| `test-data.types.ts`    | `LoginTestData`, test data interfaces                |

### Config (`src/config/`)

| File                    | Key Exports                                          |
| ----------------------- | ---------------------------------------------------- |
| `environment.ts`        | `EnvConfig` — environment-aware config loader        |
| `constants.ts`          | `SF_API`, `SF_ROUTES`, `TIMEOUTS`                    |
| `salesforce.config.ts`  | Salesforce org-specific settings                     |

### Fixtures (`src/fixtures/`)

| File                         | Key Exports                                    | Scope    |
| ---------------------------- | ---------------------------------------------- | -------- |
| `auth.fixture.ts`            | `authToken` (OAuthTokenResponse)               | worker   |
| `api-client.fixture.ts`      | `accountApi`, `contactApi`                     | test     |
| `salesforce-page.fixture.ts` | `loggedInPage`, `test`, `expect`               | test     |
| `index.ts`                   | Barrel: `test`, `expect`                       | —        |

### Pages (`src/pages/`)

| File                   | Class               | Extends    |
| ---------------------- | ------------------- | ---------- |
| `BasePage.ts`          | `BasePage`          | —          |
| `LoginPage.ts`         | `LoginPage`         | `BasePage` |
| `AppLauncherPage.ts`   | `AppLauncherPage`   | `BasePage` |
| `AccountPage.ts`       | `AccountPage`       | `BasePage` |
| `ContactPage.ts`       | `ContactPage`       | `BasePage` |
| `CasePage.ts`          | `CasePage`          | `BasePage` |
| `OpportunityPage.ts`   | `OpportunityPage`   | `BasePage` |
| `GenericRecordPage.ts` | `GenericRecordPage` | `BasePage` |

### API Clients (`src/api/`)

| File                      | Class                    | Extends             |
| ------------------------- | ------------------------ | ------------------- |
| `BaseApiClient.ts`        | `BaseApiClient<T>`       | —                   |
| `SalesforceAuthClient.ts` | `SalesforceAuthClient`   | —                   |
| `AccountApiClient.ts`     | `AccountApiClient`       | `BaseApiClient<Account>` |
| `ContactApiClient.ts`     | `ContactApiClient`       | `BaseApiClient<Contact>` |
| `GenericSObjectClient.ts` | `GenericSObjectClient`   | `BaseApiClient<T>`       |

### Utilities (`src/utils/`)

| File              | Key Exports                                   |
| ----------------- | --------------------------------------------- |
| `logger.ts`       | `Logger` — `info`, `warn`, `error`, `debug`   |
| `data-loader.ts`  | `loadJsonData<T>()`, `loadCsvData()`          |
| `helpers.ts`      | `TestDataHelper` — faker-based generators     |
| `wait-helpers.ts` | `SalesforceWaitHelpers` — Lightning wait utils |
| `sf-locators.ts`  | `SFLocators` — Lightning component locator builders |

### Tests (`tests/`)

| File                              | Tags                    | Pattern    |
| --------------------------------- | ----------------------- | ---------- |
| `ui/login.spec.ts`                | `@smoke`, `@ui`         | UI only    |
| `ui/account-crud.spec.ts`         | `@regression`, `@ui`    | UI only    |
| `ui/contact-crud.spec.ts`         | `@regression`, `@ui`    | UI only    |
| `ui/case-crud.spec.ts`            | `@regression`, `@ui`    | UI only    |
| `api/account-api.spec.ts`         | `@smoke`, `@api`        | API only   |
| `api/contact-api.spec.ts`         | `@regression`, `@api`   | API only   |
| `api/sobject-api.spec.ts`         | `@regression`, `@api`   | API only   |
| `e2e/account-contact-e2e.spec.ts` | `@e2e`, `@critical`     | API + UI   |
| `e2e/opportunity-e2e.spec.ts`     | `@e2e`                  | API + UI   |

---

> **Total Framework Files**: ~40 source files
> **Design Level**: Senior SDET / Architect
> **Principles**: SOLID + DRY + Hybrid (API + UI)
> **Target Platform**: Salesforce Lightning + REST API
