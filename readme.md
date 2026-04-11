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

| Tool | Purpose |
|------|---------|
| `@playwright/test` | Test runner + browser + API testing |
| `TypeScript` | Static typing, generics, interfaces |
| `ESLint` + `Prettier` | Code quality + formatting |
| `Husky` + `lint-staged` | Git hooks |
| `@faker-js/faker` | Test data generation |

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
├── ui/         ← UI test specs (@ui, @smoke)
├── api/        ← API test specs (@api, @regression)
└── e2e/        ← Hybrid API+UI tests (@e2e, @critical)
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Install browsers
npx playwright install --with-deps

# Run all tests
npx playwright test

# Run by tag
npx playwright test --grep @smoke
npx playwright test --grep @api
npx playwright test --grep @e2e
```

## 📋 Environment Setup

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

## 🐳 Docker

Use Docker when you want a predictable local runner without installing Node or Playwright browsers on your machine.

```bash
# Build and run the default containerized suite (Chromium API tests)
docker compose up --build playwright-tests

# Run a different suite inside the same container image
docker compose run --rm playwright-tests npm run test:smoke:chromium
docker compose run --rm playwright-tests npm run test:regression:chromium
docker compose run --rm playwright-tests npm run test:e2e:chromium
```

The Docker image intentionally defaults to `chromium` because that matches the current CI path and keeps the container leaner and more reliable across developer machines.

UI and E2E execution inside Docker still depends on your current Salesforce authentication flow. This repo has a manual MFA-based setup step in [`tests/setup/auth.setup.ts`](tests/setup/auth.setup.ts), so API tests are the safest default for containerized runs unless you already have a valid Playwright auth state available.

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
- [Linting Strategy](notes/IMP_Linting_Strategy.md)
