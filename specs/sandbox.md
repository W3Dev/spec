---
id: sandbox
title: Sandbox Environments
status: draft
number: "0010"
maturity: experimental
owner: w3dev
updated: "2026-08-22"
tags: [infra, dev-environment]
summary: "Draft convention for isolated per-branch/per-PR sandbox environments: naming, provisioning, teardown, and how agents request one."
---

## What it is

A sandbox environment is a short-lived, isolated deployment tied to a
single branch or pull request. It gives a human or an agent a real,
running instance of the app — its own database, its own URL — without
touching staging or production, so changes can be verified before merge.

## Why we adopted this

- **Safe iteration.** Agents and humans can experiment, seed data, and
  break things in a sandbox without risking shared environments.
- **Reviewable by URL.** A PR that links to a live sandbox is easier to
  review than a diff alone — reviewers click through instead of running
  the branch locally.
- **Parallel work.** Every branch gets its own sandbox, so concurrent PRs
  never contend for the same staging environment.
- **Automatic cleanup.** Sandboxes are cheap because they don't outlive
  their branch or PR.

## w3dev-specific notes

- **Naming:** `<repo>-pr-<number>` for PR-backed sandboxes, or
  `<repo>-<branch-slug>` when provisioned ahead of a PR. Branch slugs are
  the branch name lowercased with `/` and `_` replaced by `-`.
- **Provisioning:** a sandbox is created automatically when a PR is opened
  (via the repo's GitHub Actions workflow) or on request by an agent that
  needs one before a PR exists. Provisioning must never run through a
  local CLI's production/deploy path — only through the repo's CI
  workflow, consistent with `specs/repo-layout.md`'s deploy rule.
- **Data:** each sandbox gets its own database, seeded from a sanitized
  snapshot or migrations-only — never a copy of production data.
- **How agents request one:** an agent asks for a sandbox by opening (or
  pushing to) a PR; it does not provision infrastructure directly. If a
  workflow doesn't yet support sandbox-on-PR for a given repo, the agent
  flags the gap rather than working around it.
- **Teardown:** a sandbox is torn down automatically when its PR is closed
  or merged, or after an inactivity window (target: 7 days idle). Nothing
  long-lived should depend on a sandbox surviving past its PR.

> **Draft status:** this convention is still being shaped. Naming,
> provisioning, and teardown details may change — propose changes via PR
> against this file rather than treating it as final.

## Links

- Related: `specs/repo-layout.md`, `specs/pr-conventions.md`
