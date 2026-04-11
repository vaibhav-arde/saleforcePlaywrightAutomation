# 🚀 Salesforce Playwright TypeScript — Hybrid Test Automation Framework

Enterprise-grade test automation framework for **Salesforce Lightning** — UI + REST API testing with **Playwright + TypeScript**.

## ✨ Key Features

- **Hybrid Testing**: API creates data → UI validates → fast + reliable
- **TypeScript-first**: Full type safety with `strict` mode, generics, interfaces
- **SOLID + DRY**: `BasePage`, `BaseApiClient<T>`, custom fixtures — zero duplication
- **Custom Fixtures**: `authToken → accountApi → loginPage` — session-scoped auth
- **Multi-Browser**: Chromium, Firefox, WebKit via `--project`
- **CI/CD Ready**: GitHub Actions with lint gating + multi-browser matrix

## 📦 Tech Stack

| Tool                        | Purpose                                  |
| --------------------------- | ---------------------------------------- |
| `@playwright/test`        | Test runner + browser + API testing      |
| `TypeScript`              | Static typing, generics, interfaces      |
| `ESLint` + `Prettier`   | Code quality + formatting                |
| `Husky` + `lint-staged` | Git hooks                                |
| `@faker-js/faker`         | Test data generation                     |
| `Bruno`                   | Manual and exploratory Salesforce API flows |
| `Docker`                  | Containerized headless execution parity  |
| `GitHub Actions`          | CI/CD pipeline and automated regressions |

## 🏗 Project Structure

```
src/
├── types/      ← TypeScript interfaces (Account, Contact, Auth)
├── config/     ← Environment config, constants
├── fixtures/   ← Custom Playwright fixtures (auth, API, page)
├── pages/      ← Page Objects (BasePage → Login, Account, Contact)
├── api/        ← API Clients (BaseApiClient<T> → Account, Contact)
└── utils/      ← Logger, data-loader, helpers, SF locators
tests/
├── setup/      ← MFA authentication generators (auth.setup.ts)
├── ui/         ← UI test specs (@ui, @smoke)
├── api/        ← API test specs (@api, @regression)
└── e2e/        ← Hybrid API+UI tests (@e2e, @critical)
SalesforceAPI/
└── Salesforce/ ← Bruno collection for token generation and sample Salesforce REST flows
```

## 📋 Environment Setup (Required First Step)

This framework relies on a primary `.env` file for secrets, and environment-specific `.env` files (inside the `config/` folder) for environment-level overrides like `BASE_URL`.

**1. Create your root `.env` file:**
Copy `.env.example` to `.env` and fill in your Salesforce credentials (passwords, tokens, etc.):

```bash
cp .env.example .env
```

**2. Create your environment-specific files:**
The framework dynamically selects URLs based on the `TestEnv` variable.
Create `.env` files matching your environments inside the `config/` folder. For example, if you run tests with `TestEnv=sale`, you need a `config/sale.env` file.

```bash
mkdir -p config
touch config/sale.env
touch config/qa.env
```

Inside `config/sale.env`, define environment-specific variables like the actual domain:

```env
BASE_URL=https://your-domain.lightning.force.com
```

## 🚀 Quick Start (Local Execution)

```bash
# Install dependencies & browsers
npm install
npx playwright install --with-deps
```

### 🔐 Multi-Factor Authentication (Strict UI Prerequisite)

If your Salesforce environment enforces MFA, you **must** generate a local session cookie before running any UI or E2E tests. (This is not required for purely API tests, as they authenticate implicitly via OAuth2 tokens).

```bash
# Opens a browser window. Log in manually and enter your SMS/Authenticator code.
# This securely saves your session to `playwright/.auth/user.json` for all subsequent UI tests to absorb!

npm run test:setup:headed

# (Or using raw npx)
# npx playwright test tests/setup/auth.setup.ts --project=setup --headed
```

### 🏃 Running Tests Locally

```bash
# Run specific suites
npm run test:api
npm run test:ui
npm run test:e2e

# Run UI and E2E specifically skipping Smoke tests (Headed Chromium)
npm run test:ui:e2e:chromium:headed
```

## 🐳 Docker Execution

Use Docker when you want a highly predictable, pristine headless Linux runner without relying on your Mac's Node environment.

### ⚠️ The Docker UI Prerequisite

Because Docker containers operate entirely headlessly (no monitor or UI rendering engine), you absolutely cannot type in MFA codes inside tests running on Docker.
**You MUST run the `auth.setup.ts` script on your local Mac first** (as shown above in the Quick Start). Through Volume Mounting, Docker will seamlessly absorb your local `playwright/.auth/user.json` token and completely bypass the Salesforce login screens inside the headless container!

### 🏃 Running Tests inside Docker

Build the ultra-optimized `node-slim` container locally:

```bash
docker compose build
```

Execute tests completely headlessly in isolated Linux memory (cleaned up automatically via `--rm`):

```bash
# Run API Tests (Default Command)
docker compose run --rm playwright-tests

# Run UI and E2E specifically skipping Smoke tests
docker compose run --rm playwright-tests npx playwright test --grep "@ui|@e2e" --grep-invert @smoke --project=chromium
```

*(Note: Attempting to pass the `--headed` flag onto Docker commands will fatally crash Playwright, because Linux containers do not possess physical monitors! To visually watch tests run, stick to Local Execution).*

## ✅ Recommended Execution Strategy

Keep GitHub Actions as the CI entry point and use Docker as the local execution option.

- GitHub Actions is already set up, simpler to maintain, and works well for your current `chromium`-based CI runs.
- Docker is valuable locally for onboarding, environment parity, and avoiding host-level browser setup.
- If you later want exact runtime parity between local and CI, you can switch the GitHub Actions job to run this Docker image, but that is optional rather than necessary right now.

## 📊 Reports

```bash
npx playwright show-report
```

## 📚 Documentation

See [`notes/`](notes/) for detailed documentation:

- [Framework Documentation](notes/Framework_Documentation.md)
- [Branching Strategy](notes/IMP_Branching_Strategy.md)
- [Bruno API Usage](notes/IMP_Bruno_API_Usage.md)
- [Linting Strategy](notes/IMP_Linting_Strategy.md)
