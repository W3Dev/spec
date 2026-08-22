---
id: env-vars
title: Environment Variables
status: unofficial
number: "0012"
maturity: stable
owner: w3dev
updated: "2026-08-22"
tags: [config, security]
summary: "NEXT_PUBLIC_ prefix for client-safe values, .env.local never committed, DATABASE_URL points at hosted neon.tech Postgres, secrets kept apart from plain config."
---

## What it is

A convention for naming, exposing, and documenting environment variables
across w3dev apps: which variables are safe to ship to the browser, where
they're allowed to live, and how contributors discover what a project
needs to run.

## Why we adopted this

- **Prevents secret leakage.** A clear prefix rule for client-exposed
  values means a secret doesn't end up in a browser bundle by accident.
- **Local dev matches production shape.** Pointing `DATABASE_URL` at a
  real hosted database instead of a local container removes an entire
  class of "works locally, breaks in prod" bugs caused by drift between
  Docker Postgres and the hosted version.
- **Onboarding without guesswork.** A documented list of required
  variables means a new contributor (or agent) can get a project running
  without reverse-engineering the codebase for `process.env` reads.
- **Auditable secrets.** Separating secrets from plain config makes it
  obvious what needs rotation, restricted access, or a secrets manager,
  versus what's safe to paste in a Slack thread.

## w3dev-specific notes

- **Client exposure:** only variables prefixed `NEXT_PUBLIC_` are exposed
  to the browser. Never put a secret behind that prefix — treat the
  prefix itself as the security boundary, not a naming preference.
- **`.env.local` is never committed.** It's gitignored by default in every
  w3dev repo; if a repo is missing that ignore rule, that's a bug to fix,
  not an exception to work around.
- **`DATABASE_URL`** points at a hosted Postgres instance (neon.tech) —
  including for local development. Do not stand up a local Docker
  Postgres unless explicitly requested (see `specs/repo-layout.md`); use a
  branch database or dev database on neon.tech instead.
- **Secrets vs. plain config:** secrets (API keys, database URLs, tokens)
  live only in `.env.local` locally and in the hosting platform's
  encrypted environment settings in deployed environments — never in
  code, comments, or committed config. Plain config (feature flags,
  public URLs) can live in `.env.example` with real, non-secret values.
- **Documentation:** every environment variable a project reads is listed
  in the repo's README or `.env.example`, with a one-line description of
  what it's for and whether it's required.

## Links

- Related: `specs/repo-layout.md`
