# Contributing Guide

Thanks for contributing to this repository.

This project is a Salesforce automation framework built with Playwright and TypeScript. The goal is to keep the framework reliable, readable, and safe for both UI and API automation work.

## Before You Start

- Read the [README](readme.md) for setup and execution basics
- Review the docs in [`notes/`](notes/)
- Follow the branching rules in [notes/IMP_Branching_Strategy.md](notes/IMP_Branching_Strategy.md)
- Prefer short-lived branches such as `feature/*`, `fix/*`, and `chore/*`

## Local Setup

```bash
npm install
npx playwright install --with-deps
```

For UI or E2E work in environments with MFA, generate the local auth state first:

```bash
npm run test:setup:headed
```

## Branching and Pull Requests

- Branch from `dev` unless maintainers instruct otherwise
- Use the approved branch prefixes:
  - `feature/*`
  - `fix/*`
  - `chore/*`
  - `spike/*` for experiments only
- Do not push directly to protected branches
- Open pull requests into `dev` for normal development
- Only promote `dev` into `main`

## Commit Messages

Use conventional-style commit messages where practical.

Examples:

- `feature: add account creation tests`
- `fix: stabilize login locator handling`
- `chore: upgrade playwright version`
- `docs: add bruno api usage guide`

## Coding Expectations

- Use TypeScript consistently
- Keep page objects, fixtures, API clients, and tests separated by responsibility
- Prefer reusable helpers over duplicated locators or request logic
- Keep tests deterministic and avoid introducing flaky behavior
- Move flaky tests to quarantine rather than weakening stable suites
- Follow existing naming and folder conventions

## Test Tagging Expectations

Use the established tagging model where applicable:

- `@smoke`
- `@regression`
- `@critical`
- `@api`
- `@ui`
- `@e2e`
- `@quarantine`

## Validation Before Opening a PR

Run the checks relevant to your change before opening a pull request:

```bash
npm run lint
npm run format:check
npm run typecheck
```

Recommended Playwright runs:

```bash
npm run test:smoke
npm run test:api
npm run test:regression
```

If your change affects UI authentication or browser behavior, also run the relevant browser-specific suite.

## Documentation Expectations

Update documentation when your change affects:

- setup steps
- environment variables
- GitHub Actions or CI behavior
- folder structure
- test execution commands
- Bruno collection usage

## Issue Reporting

Before opening an issue:

- check whether it already exists
- include clear reproduction steps
- include relevant logs, screenshots, traces, or request/response details
- state whether the problem is in UI automation, API automation, CI, or local setup

## Security

Do not post secrets, access tokens, session files, or production-sensitive Salesforce data in issues or pull requests.

For vulnerability reporting guidance, see [SECURITY.md](SECURITY.md).
