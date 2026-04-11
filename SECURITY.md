# Security Policy

## Supported Scope

This repository contains Playwright-based Salesforce UI and API automation assets, including local environment-driven credentials, authentication helpers, and CI workflows.

Security-sensitive areas include:

- Salesforce authentication handling
- environment variable usage
- token and session management
- GitHub Actions workflows and secrets usage
- API request collections and test data handling

## Reporting a Vulnerability

Please do not report security vulnerabilities through public GitHub issues.

Use one of the following private paths instead:

- GitHub private vulnerability reporting for this repository, if enabled
- direct contact with the repository maintainer through a private channel

When reporting, include:

- a short description of the issue
- impact and affected area
- reproduction steps or proof of concept
- any required environment assumptions
- whether secrets, tokens, or session state are involved

## Response Expectations

The project aims to:

- acknowledge valid reports as quickly as practical
- investigate and confirm impact
- coordinate a fix before public disclosure when needed
- share remediation guidance once a fix is available

## Safe Handling Guidance

Please avoid including live secrets in reports, examples, screenshots, logs, or traces.

Sensitive examples include:

- Salesforce usernames and passwords
- client IDs and client secrets
- OAuth access tokens
- Playwright auth state files
- production URLs or data that should remain private
