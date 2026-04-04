# 🚀 Branching Strategy — Playwright TypeScript Framework

This is a **production-grade, scalable, MAANG-level branching strategy** specifically optimized for:

* TypeScript + Playwright
* Salesforce UI + API Test Automation
* Large automation teams
* CI/CD pipelines with npm + ESLint + Prettier

---

# 🚀 1. Controlled Integration Trunk (CIT Model)

```bash
main  (Production Truth - always green)
│
└── dev  (Controlled Integration - NOT a dumping ground)
     │
     ├── feat/*
     ├── fix/*
     ├── chore/*
     └── spike/*
```

---

## 🔥 Key Principle

👉 `dev` is NOT just a buffer
👉 It is a **strictly governed integration branch with CI gates**

---

# 🧠 2. Core Philosophy

### ❌ Old mindset:

> "dev is where everything merges"

### ✅ New mindset:

> "dev is a **pre-production environment with strict quality gates**"

---

# 🧱 3. Branch Roles (Refined)

---

## 🟢 `main` → **Production Automation Layer**

* Runs against:

  * Production OR Release Candidate
* Contains:

  * ✅ Stable tests only
  * ❌ No flaky / experimental tests

### 🔒 Rules:

* PR required from `dev`
* Full regression must pass
* Artifacts mandatory (Playwright trace, logs)

---

## 🟡 `dev` → **Integration + Staging Validation Layer**

👉 This is where your strategy becomes powerful.

* Runs against:

  * QA / Staging
* Purpose:

  * Validate **combined changes**
  * Detect integration issues early

### 🔒 Rules (UPGRADED):

* No direct commits
* Mandatory PR checks
* Must stay **green ≥ 95% pass rate**
* Auto-block if flaky spike detected

---

## 🔵 `feat/*` → **Short-lived Development Units**

Strict naming convention:

```bash
feat/ui-login-tests
feat/api-account-validation
feat/framework-fixtures-refactor
feat/sf-opportunity-page
```

---

## 🔴 `fix/*` → **Stability Recovery**

```bash
fix/flaky-login-test
fix/broken-locator-checkout
fix/api-auth-timeout
```

👉 Fast-track PRs

---

## 🟣 `chore/*` → Infra / tooling

```bash
chore/update-playwright-version
chore/upgrade-typescript
chore/improve-eslint-config
```

---

## 🧪 `spike/*` → Experimental

```bash
spike/parallel-execution-poc
spike/visual-regression-testing
```

👉 NEVER merge directly → convert to `feat/*`

---

# ⚙️ 4. CI/CD Pipeline Architecture (Major Upgrade)

---

## 🧪 Layer 1: `feat → dev` PR Pipeline

👉 Goal: Fast feedback (< 10 mins)

### Runs:

* ✅ Lint (`npm run lint`)
* ✅ Format check (`npm run format:check`)
* ✅ TypeScript type check (`npm run typecheck`)
* ✅ Smoke tests (`npx playwright test --grep @smoke`)
* ✅ Critical API tests (`npx playwright test --grep @critical`)

---

## 🚨 Gate Rule:

```text
100% pass required
NO flaky allowed
```

---

## 🚀 Layer 2: `dev` Continuous Validation

Triggered on every merge to `dev`:

* 🔁 Regression subset (`npx playwright test --grep @regression`)
* 🔁 Parallel execution (`--workers=auto`)
* 🔁 Flaky detection

---

## 🧠 Smart Addition (Advanced):

👉 Track:

* Pass rate trend
* Flaky test frequency

If:

```text
pass rate < 95%
```

➡️ Block further merges into `dev`

---

## 🏁 Layer 3: `dev → main` Promotion Pipeline

👉 This is your **release gate**

Runs:

* ✅ Full regression (`npx playwright test`)
* ✅ Cross-browser (`--project=chromium`, `--project=firefox`, `--project=webkit`)
* ✅ API + UI combined flows (`npx playwright test --grep @e2e`)
* ✅ Data validation

---

## 📊 Artifacts (MANDATORY)

* Playwright traces
* HTML reports
* Logs
* Failure screenshots + videos

---

# 🔁 5. Promotion Strategy (Critical Improvement)

---

## ❌ Weak approach:

> "Merge dev to main weekly"

---

## ✅ Strong approach:

👉 **Quality-based promotion**

Promote ONLY if:

* dev is stable for last N runs (e.g., 3 runs)
* No critical failures
* No flaky spike

---

# 🧪 6. Test Classification Strategy (Enhanced)

---

## Tags (Playwright)

```typescript
test.describe('Account Tests', { tag: '@regression' }, () => {

  test('should create account', { tag: ['@ui', '@smoke'] }, async ({ page }) => {
    // ...
  });

  test('should validate account API', { tag: ['@api', '@critical'] }, async ({ request }) => {
    // ...
  });
});
```

---

## Run by Tag

```bash
npx playwright test --grep @smoke
npx playwright test --grep @regression
npx playwright test --grep @critical
npx playwright test --grep @quarantine
npx playwright test --grep-invert @quarantine   # Exclude quarantine
```

---

## Execution Mapping

| Branch  | Tests                                               |
| ------- | --------------------------------------------------- |
| feat PR | `--grep "@smoke\|@critical"` + lint + typecheck     |
| dev     | `--grep @regression`                                |
| main    | Full regression (no grep filter)                    |
| nightly | Full + `--grep @quarantine` (flaky investigation)   |

---

# 🚨 7. Flaky Test Governance (Major Upgrade)

---

## New Rule:

👉 Flaky tests are **first-class citizens with isolation**

---

## Structure:

```bash
tests/
│
├── ui/              # Stable UI tests
├── api/             # Stable API tests
├── e2e/             # Stable hybrid tests
└── quarantine/      # Flaky / under investigation
```

---

## Policy:

* Flaky tests → move to `quarantine/` + tag with `@quarantine`
* NOT executed in main pipeline (`--grep-invert @quarantine`)
* Fixed via `fix/*` branches
* Must be resolved within 2 sprints or deleted

---

# 🧠 8. Environment Strategy (Improved)

---

## Environment Configuration (TypeScript)

```typescript
// src/config/environment.ts

import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const env = process.env.TestEnv || 'dev';
dotenv.config({
  path: path.resolve(process.cwd(), 'config', `${env}.env`),
  override: true,
});

export const EnvConfig = {
  env,
  baseUrl: process.env.BASE_URL!,
  salesforce: {
    username: process.env.sit_salesforce_username!,
    password: process.env.sit_salesforce_password!,
    clientId: process.env.consumer_key!,
    clientSecret: process.env.consumer_secret!,
  },
} as const;
```

---

## CI Mapping:

| Branch | Environment | Command                               |
| ------ | ----------- | ------------------------------------- |
| feat   | QA          | `TestEnv=qa npx playwright test`      |
| dev    | Staging     | `TestEnv=staging npx playwright test` |
| main   | Prod / RC   | `TestEnv=prod npx playwright test`    |

---

# 🧱 9. Governance Rules (Enterprise-Level)

---

## ✅ 1. CODEOWNERS (Refined)

```bash
/src/             → Senior QA / Framework Owner
/tests/api/       → API QA Team
/tests/ui/        → UI QA Team
/tests/e2e/       → E2E QA Team
/.github/         → DevOps / Senior QA
```

---

## ✅ 2. Branch Protection

### `main`

* No direct push
* Required approvals: 2
* Required checks: ALL (lint + typecheck + full regression)

### `dev`

* Required approvals: 1
* Required checks: smoke + lint + typecheck

---

## ✅ 3. Commit Strategy

👉 Enforce conventional commits:

```bash
feat: add account creation tests
fix: resolve flaky SF login locator
chore: update playwright to 1.58
test: add contact API validation
docs: update framework documentation
refactor: extract SF locator helpers
```

---

## ✅ 4. Auto Delete

* Feature branches auto-deleted after merge

---

# ⚠️ 10. Biggest Risk (And Fix)

---

## 🚨 Risk:

`dev` becomes dumping ground

---

## ✅ Fix:

* Enforce pass rate threshold
* Block merges if unstable
* Monitor CI metrics (GitHub Actions dashboard)
* Mandatory `--grep-invert @quarantine` on all PR checks

---

# 🏆 11. Final Model Summary

---

| Area             | Basic Version          | CIT Model (This Strategy)    |
| ---------------- | ---------------------- | ---------------------------- |
| dev role         | buffer                 | controlled integration       |
| CI               | basic lint             | multi-layer gating           |
| promotion        | time-based             | quality-based                |
| flaky handling   | ignore                 | quarantine system            |
| governance       | moderate               | strict enterprise            |
| tooling          | manual checks          | ESLint + Prettier + Husky    |
| type safety      | none                   | TypeScript strict            |

---

## 🧠 Final Verdict

👉 This model makes the Salesforce Playwright framework:

* 🚀 Scalable across teams
* 🧪 Stable with quarantine isolation
* ⚙️ CI-driven with multi-layer gates
* 🏆 Enterprise-ready with full governance
