# Architecture

This one's for the curious minds — the "why" behind the setup. If you just want to run the tests, go read the README.

## Priorities (in order of importance)

1. **Fresh clone → green run → no secrets.** `npm ci && npx playwright install chromium && npm test` should Just Work on a laptop that's never seen this project before. No credentials, no local servers, no jumping through hoops.

2. **Real app, real endpoints.** No mocks. We're hitting the actual live Automation Exercise site. Sounds a bit reckless, but that's the point — we're testing the real contracts, not some idealized version that only exists in our heads.

3. **When it fails, you know why.** Typed POM, stable selectors, readable flow methods (`login()`, `addToCart()`), screenshots + traces on failure, and human-readable config errors thanks to zod.

4. **Keep maintenance pain low.** The site's markup will change — it's not ours. So we isolate all selectors behind Page Objects. We also deliberately go easy on the site (max 2 workers locally, 1 in CI) and block ads so they don't steal clicks.

5. **Quality gates on every change.** TypeScript strict mode, ESLint, Prettier, `tsc --noEmit`, HTML reports, JUnit XML — all wired into CI. Break something and the build goes red.

## Why Automation Exercise

We needed a public e-commerce site that actually works for automation. Non-negotiable requirements:

- **Real multi-page app** — registration, login, catalog, cart, checkout, contact. This way our POM layer actually demonstrates real user journeys, not just isolated button clicks.
- **Zero credentials required** — anyone can clone and run.
- **Real public REST API** — `/api/createAccount`, `/api/deleteAccount` exist, which lets us do data setup/teardown via HTTP instead of clicking through forms.

Oh, and we learned a couple of things the hard way:

- The contact page lives at `/contact_us`, not `/contact`. Spent half a day on that gem.
- Cart quantity isn't an input field — it's a disabled button. You change it on the product detail page using `#quantity`, then add to cart. Totally non-obvious.

## Hybrid pattern: API for data, POM for UI

Two layers work together:

1. **`ApiClient`** (`src/api/`) — wraps Playwright's `APIRequestContext` and talks directly to the site's real endpoints. Fixtures use it to create/delete users in one HTTP call.

2. **`App` + pages/components/flows** (`src/ui/`) — drives the actual browser. The `registeredUser` fixture creates a unique user via API, the test logs in through the UI, and teardown deletes the account via API — even if an assertion fails midway.

Why not the alternatives?

- _UI-only setup_ (register through the form every time) — slow and flaky.
- _Storage-state reuse_ (login once, replay cookies) — fast but brittle; sessions expire or get invalidated.

Our hybrid is the sweet spot: one API call to create, a quick UI login, and guaranteed API cleanup.

## Data strategy

- **Uniqueness.** Every test user gets a name like `user_${timestamp}_${workerIndex}_${randomSuffix}` (`src/data/user.builder.ts`). No collisions even when running parallel workers.
- **No faker.** The builder spits out exactly the fields the site needs — fewer dependencies, predictable data.
- **Cleanup is mandatory.** The fixture that created the user always calls `deleteAccount` on teardown, pass or fail. If a test creates its own data (e.g., via UI registration), cleanup goes in a `try/finally` — still through the API.

## Page Object Model

- **`App` facade** — the one-stop shop for all pages, components, and flows. Tests only import this; everything else stays internal.
- **Factories** — `createPages`, `createComponents`. Plain functions, no magic, easy to follow.
- **`BasePage`** — common parent with `goto()` and `checkPage()` (checks URL + key element visibility via `expectVisible`). Every page inherits this "loaded and ready" guarantee.
- **Components** — nav, footer, product card, category sidebar. Composed into pages. Important: locators are initialized in the constructor, not as class fields — otherwise TypeScript's initialization order bites you (been there, suffered that).
- **Flows** — multi-step journeys: `RegistrationFlow`, `LoginFlow`, `CartFlow`, `CheckoutFlow`. They compose page actions into a single method call, so tests read like a user story, not a pile of random calls.

Adding a page is mechanical: drop a class in `src/ui/pages`, register it in `create-pages.ts`, and expose it on
`App`. Nothing else changes.

## Selector policy

Prefer roles, visible text, and `data-qa` attributes (the site ships them on forms). Auto-generated class names like `css-abc123`? Hard pass — they're too fragile. For product grids, we rely on semantic structure: headings, paragraphs, links.

## Config

`src/config/env.ts` — zod validation at process startup:

- explicit env vars take precedence;
- missing vars fall back to sensible defaults pointing at the live site;
- malformed values fail fast with a readable error.

No named environment profiles (`local/qa/prod`) — we target one site, no need for extra indirection.

## Test tags

Standard Playwright `{ tag: '@smoke' }` etc. Filter with `--grep` / `--grep-invert`. No issue-tracker references — the HTML report and JUnit XML are enough to trace what happened.

## Dealing with third-party site flakiness

Testing someone else's production means dealing with their failure modes:

- **Ads.** The site randomly shows a Google interstitial (`#google_vignette`) that swallows clicks. We block Google ad hosts in every context via `src/utils/ad-block.ts` — pretty much solved it.
- **Rate limiting.** Under concurrent sessions, the site sometimes returns "heavy load (queue full)". So we cap workers: 2 locally, 1 in CI. Plus retries (1 local, 2 in CI).
- **Slow responses.** Playwright's web-first assertions handle this well, but we bumped timeouts anyway: 60s per test, 15s for `expect`. Slow responses become retries, not silent timeouts.

## CI/CD

One workflow — `.github/workflows/pr-validation.yml` — runs on every PR and push to `main`:

1. `verify` — typecheck, lint, format check.
2. `ui-tests` — Chromium suite. HTML report and JUnit XML uploaded as artifacts even on failure.

Why only one workflow? A nightly regression on a third-party live site mostly tests whether _their_ servers are still up, not whether _our_ code works. CI exists to catch regressions on our changes — and it does that just fine.
