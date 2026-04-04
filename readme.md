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

Copy `.env.example` to `.env` and fill in your Salesforce credentials:

```bash
cp .env.example .env
```

## 📊 Reports

```bash
npx playwright show-report
```

## 📚 Documentation

See [`notes/`](notes/) for detailed documentation:
- [Framework Documentation](notes/Framework_Documentation.md)
- [Branching Strategy](notes/IMP_Branching_Strategy.md)
- [Linting Strategy](notes/IMP_Linting_Strategy.md)