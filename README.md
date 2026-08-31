# pw-hybrid-e2e-framework

A hybrid Playwright + TypeScript end-to-end framework built from scratch against **Automation Exercise**
(https://www.automationexercise.com), a public e-commerce site designed for QA practice.

The framework's defining trait: **the site's real public REST API is used for test-data setup and cleanup,
while a Page Object Model (POM) UI layer drives the user journeys.** The suite runs against the live site
without external accounts, local servers, or stored secrets.

> `npm ci && npx playwright install chromium && npm test` runs the whole suite against the live site.

## What's covered

| Spec                | Journey                                          | Auth              |
| ------------------- | ------------------------------------------------ | ----------------- |
| `home.spec`         | Homepage load, category browse, footer subscribe | Guest             |
| `registration.spec` | Full UI signup form → account created            | Fresh user via UI |
| `login.spec`        | Valid login, logout, invalid-credentials error   | API-created user  |
| `products.spec`     | Catalog, search, product details                 | Guest             |
| `cart.spec`         | Add to cart, custom quantity, remove             | API-created user  |
| `checkout.spec`     | Address verification → payment → order placed    | API-created user  |
| `contact.spec`      | Contact form submission                          | Guest             |

## Why hybrid UI + API

- **Stable preconditions.** Accounts are created through the REST API (`/api/createAccount`) instead of
  registering through the UI every time, so tests start from a known state without a long UI walk.
- **Guaranteed cleanup.** The `registeredUser` fixture deletes the account via API (`/api/deleteAccount`)
  in teardown even when a test fails midway; UI-registered accounts are cleaned up the same way via
  `try/finally`.
- **Unique data.** Every user is built with a timestamp + worker index + random suffix, so parallel runs
  never collide and re-runs never clash with leftovers.
- **Real contract.** The API client talks to the same endpoints the site uses — no mock server to drift.

## Quickstart

```bash
npm ci
npx playwright install chromium
npm test
```

The suite runs with sensible defaults, so no configuration file is required. If you do create one:
on Unix, `cp .env.example .env`; on Windows, `copy .env.example .env`.

## Scripts

| Command                | What it does                                         |
| ---------------------- | ---------------------------------------------------- |
| `npm test`             | Full UI suite, Chromium                              |
| `npm run test:ui`      | UI suite only (Chromium)                             |
| `npm run test:headed`  | UI suite with a visible browser                      |
| `npm run report`       | Open the last HTML report                            |
| `npm run typecheck`    | `tsc --noEmit`                                       |
| `npm run lint`         | ESLint                                               |
| `npm run format`       | Prettier (write)                                     |
| `npm run format:check` | Prettier (check)                                     |
| `npm run verify`       | typecheck + lint + format check — what CI runs first |

The suite currently runs on **Chromium only**. Firefox and WebKit projects exist in
`playwright.config.ts` but are commented out — the public site rate-limits concurrent sessions, so
adding browsers multiplies that load without benefit. To enable cross-browser runs, uncomment those
projects, run `npx playwright install`, and then run `npx playwright test`.

## Project structure

```
src/
  config/        env.ts — zod-validated environment config; index.ts — typed access
  data/          user.builder.ts + payment.builder.ts — unique test-data builders
  api/           client.ts — ApiClient over Playwright's APIRequestContext + response types
  ui/
    pages/       BasePage (abstract) + 10 page objects (Home, Login, Signup, Products, ...)
    components/  Navigation, Footer, ProductCard, CategorySidebar + factory
    flows/       Registration, Login, Cart, Checkout — multi-step user journeys
    app.ts       App facade aggregating pages + components + flows
  fixtures/      index.ts — test.extend wiring app, apiClient, registeredUser
  utils/         ad-block.ts — blocks Google ad hosts so the interstitial ad can't swallow clicks
tests/ui/        7 specs with typed @smoke / feature tags
```

The POM layer follows an `App` facade + factory-functions style: specs talk to a single `App` object,
pages expose locators and actions, components encapsulate reused widgets, and flows compose multi-step
journeys.

## Test tags

Tags are Playwright's typed `{ tag }` option (not magic strings in titles) and are filterable with
`--grep` / `--grep-invert`:

- `@smoke` — fast high-value checks (one per feature area)
- `@home`, `@registration`, `@login`, `@products`, `@cart`, `@checkout`, `@contact` — feature areas

## Environment variables

See `.env.example`. Both variables have sensible defaults pointing at the live site, so a `.env` is
optional:

| Variable       | Default                              | Purpose                         |
| -------------- | ------------------------------------ | ------------------------------- |
| `BASE_URL`     | `https://www.automationexercise.com` | UI layer under test             |
| `API_BASE_URL` | `https://automationexercise.com`     | REST API for data setup/cleanup |

Config is validated once at startup with zod — a malformed value fails immediately with a readable
message instead of a confusing failure three layers down.

## CI/CD

`.github/workflows/pr-validation.yml` runs on every PR and push to `main`:

1. **verify** — typecheck + lint + format check.
2. **ui-tests** — the full Chromium suite, with the HTML report and JUnit XML uploaded as artifacts
   (retained 30 days) even on failure.

## Documentation

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — the rationale behind every major decision.
- [docs/SUMMARY.md](docs/SUMMARY.md) — why this team is positioned to deliver a greenfield Playwright
  setup efficiently.
