# Summary: Why this team for your greenfield Playwright setup

This document goes with the repository and covers the second part of the assignment: why we are
positioned to get a greenfield Playwright setup running efficiently.

## 1. POM experience, not a tutorial copy

The Page Object Model layer in this repository follows a style we applied on a production codebase, not a
pattern borrowed from a tutorial:

- an **`App` facade** that gives specs one entry point instead of a sprawling object graph;
- **factory functions** (`createPages` / `createComponents`) that keep the object graph easy to read;
- an **abstract `BasePage`** whose `checkPage()` contract is consistent across the suite;
- **components** that encapsulate reused widgets and **flows** that compose multi-step journeys.

The result is short specs that state intent, page objects that absorb markup changes, and a suite the
next team can pick up without a guided tour.

## 2. A hybrid UI + API design that lowers cost from day one

The framework's defining decision is using the application's **real public REST API for test-data
setup/cleanup** while the POM layer drives the user journeys. The benefits are direct:

- **Stable preconditions and cleanup.** Data is created and destroyed over HTTP, so tests do not depend on
  UI walks to set up, and cleanup runs in fixture teardown or `try/finally` even when an assertion fails.
- **Faster, less flaky runs.** A two-field UI login after an API-created user is cheaper and more robust
  than registering through a form in every test or replaying storage state.
- **Real contracts.** The client talks to the same endpoints the product ships; there is no mock server to
  maintain or drift from reality.

Applied to your greenfield project, the same pattern maps onto your service's public or internal API: an
`ApiClient` for seed/cleanup, fixtures that hand tests ready data, and POM pages that verify behavior.

## 3. Engineering rigor is built in

Every change is gated before it reaches the suite:

- **Strict TypeScript** (`tsc --noEmit`), **ESLint**, and **Prettier** as a single `verify` command that
  CI runs first;
- **typed test tags** (`@smoke`, feature tags) filterable via Playwright's native `--grep`, so the suite
  can grow without a custom tagging scheme;
- **HTML + JUnit reporting** with traces and screenshots retained on failure;
- **zod-validated environment config** that fails fast with a readable message.

## 4. Speed to green on a greenfield setup

A greenfield Playwright effort usually stalls on the same questions: structure, data strategy, selectors,
CI, and flakiness control. This repository answers all five concretely:

- a scaffold (tooling, config, fixtures, CI) ready to be pointed at any target;
- a repeatable way to add a page object, visible in how `create-pages.ts` and `BasePage` already work;
- explicit handling of the flakiness that comes from testing real, third-party systems. Bounded
  parallelism, retries, and ad-network blocking are captured as lessons, so the next engineer does not
  re-learn them.

The suite runs from a clean clone with no configuration: clone, install, run.

## What we hand over

The repo itself is the deliverable: a working framework plus the decisions on data strategy, quality
gates, and reporting that keep it green as it scales.
