# Modern Linting & Quality Strategy — TypeScript + Playwright

This document outlines the **production-grade linting, formatting, and type-checking strategy** implemented in our Playwright + TypeScript Salesforce test automation framework. This strategy replaces traditional Python tooling (Ruff, mypy, pre-commit) with a modern, unified TypeScript toolchain.

---

## 🚀 1. Core Tooling Stack

| Purpose | Tool | Why We Use It |
| :--- | :--- | :--- |
| **Package Management** | `npm` | Industry standard for Node.js projects. Deterministic lockfile via `package-lock.json`. |
| **Linting** | `ESLint` + `@typescript-eslint` + `eslint-plugin-playwright` | Comprehensive linting with TypeScript-aware rules and Playwright-specific checks (e.g., `no-focused-test`, `valid-expect`). |
| **Formatting** | `Prettier` | Opinionated formatter. Handles all code style decisions (indentation, quotes, semicolons). ESLint only handles logic, Prettier handles style. |
| **Static Type Checking** | TypeScript `strict` mode | Built into the language via `tsconfig.json`. Catches type errors, null safety, implicit any, and more — replaces mypy entirely. |
| **Git Automation** | `Husky` + `lint-staged` | Automatically runs linters on staged files only during `git commit`. Faster than running on entire codebase. |

---

## ⚙️ 2. Configuration & Structure

All configuration lives in dedicated files at the project root — single source of truth for each tool.

### ESLint Configuration (`.eslintrc.json`)

```json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2022,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
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
    "@typescript-eslint/no-non-null-assertion": "warn",
    "playwright/no-focused-test": "error",
    "playwright/no-skipped-test": "warn",
    "playwright/valid-expect": "error",
    "playwright/no-wait-for-timeout": "warn",
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  },
  "ignorePatterns": ["node_modules/", "dist/", "reports/", "playwright-report/"]
}
```

**Key rules explained:**

| Rule | Purpose |
| :--- | :--- |
| `@typescript-eslint/no-unused-vars` | Catches dead code. `argsIgnorePattern: "^_"` allows unused args prefixed with `_`. |
| `playwright/no-focused-test` | **Error** if `test.only()` is committed — prevents CI from running a single test. |
| `playwright/no-skipped-test` | **Warn** if `test.skip()` is present — encourages fixing or quarantining. |
| `playwright/valid-expect` | Ensures `expect()` is used correctly with proper matchers. |
| `playwright/no-wait-for-timeout` | Discourages hard waits (`page.waitForTimeout()`) in favor of proper assertions. |
| `no-console` | Warns on `console.log` — use the framework's `Logger` utility instead. |

### Prettier Configuration (`.prettierrc`)

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### TypeScript Configuration (`tsconfig.json` — strict mode)

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
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

**What `strict: true` enables (replaces mypy):**

| Flag | What It Catches |
| :--- | :--- |
| `strictNullChecks` | Variables that might be `null` / `undefined` |
| `noImplicitAny` | Missing type annotations |
| `strictFunctionTypes` | Incorrect function argument types |
| `strictBindCallApply` | Incorrect `bind`/`call`/`apply` usage |
| `noUnusedLocals` | Unused variables |
| `noUnusedParameters` | Unused function parameters |
| `noImplicitReturns` | Functions that don't always return a value |

### Husky + lint-staged Configuration

**`.husky/pre-commit`:**
```bash
npx lint-staged
```

**`package.json` (lint-staged section):**
```json
{
  "lint-staged": {
    "*.ts": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

---

## ⚡ 3. Developer Workflow

As an automation engineer on this project, the workflow is entirely automated.

### 1. While Writing Code (Local Checks)

If you want to validate or format your code *before* you are ready to commit:

```bash
# Check for lint errors
npm run lint

# Auto-fix safe lint errors
npm run lint:fix

# Format all TypeScript files
npm run format

# Check types (same as mypy but built-in)
npm run typecheck
```

### 2. When Committing Code (Git Hooks)

You do not need to remember to run the linters. When you type:

```bash
git add .
git commit -m "feat: add account creation tests"
```

The **Husky** pre-commit hook will automatically:
1. Run **ESLint** on staged `.ts` files → auto-fixes safe issues
2. Run **Prettier** on staged `.ts` files → auto-formats

* ✅ If the code is clean, the commit proceeds instantly.
* 🛠️ If ESLint finds a fixable issue, it auto-fixes and the commit proceeds.
* ❌ If ESLint finds an unfixable error (e.g., `test.only()` left in), the commit is **blocked**. Fix the error and commit again.
* ❌ If TypeScript type check fails in CI, you must fix the type error manually.

### 3. npm Scripts Reference

```json
{
  "scripts": {
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

## 🌐 4. CI/CD Enforcement (GitHub Actions)

Local Husky hooks can be bypassed by developers using `git commit --no-verify`. Therefore, the linting standards are **permanently enforced at the CI/CD pipeline level**.

Inside `.github/workflows/playwright.yml`:

```yaml
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - name: Lint Check
        run: npm run lint
      - name: Format Check
        run: npm run format:check
      - name: TypeScript Type Check
        run: npm run typecheck
```

This runs the exact same ESLint, Prettier, and TypeScript versions as the developers run locally. If any of these steps fail in the GitHub Action, **the Pull Request is permanently blocked** and the Playwright test suite will not even execute.

---

## 📊 5. Tool Comparison — Python vs TypeScript

For reference, here is how each Python tool maps to its TypeScript equivalent:

| Concern | Python Stack | TypeScript Stack |
| :--- | :--- | :--- |
| Package Manager | `uv` | `npm` |
| Linting | `Ruff` (check) | `ESLint` + `@typescript-eslint` |
| Formatting | `Ruff` (format) | `Prettier` |
| Import Sorting | `Ruff` (isort rules) | `ESLint` (`@typescript-eslint/consistent-type-imports`) |
| Type Checking | `mypy` | TypeScript `strict` mode (built-in) |
| Git Hooks | `pre-commit` | `Husky` + `lint-staged` |
| Config File | `pyproject.toml` | `.eslintrc.json` + `.prettierrc` + `tsconfig.json` |
| Test-Specific Rules | — | `eslint-plugin-playwright` |

---

## 🏆 6. Why This Stack is Superior

1. **TypeScript strict mode > mypy**: Type checking is built into the compiler — no separate tool needed, zero configuration drift.
2. **ESLint + Playwright plugin**: Catches Playwright anti-patterns automatically (`test.only`, `waitForTimeout`, invalid expects).
3. **Prettier**: Eliminates all formatting debates — the formatter is opinionated and non-configurable for style choices.
4. **Husky + lint-staged**: Only runs on staged files — much faster than pre-commit running on the entire codebase.
5. **Single ecosystem**: Everything runs on Node.js — no Python virtual environment needed alongside the test framework.
