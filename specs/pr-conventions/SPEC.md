---
id: pr-conventions
title: Pull Request Conventions
status: unofficial
number: "0014"
maturity: stable
owner: w3dev
updated: "2026-08-22"
tags: [git, workflow, review]
related: [conventional-commits]
summary: "Every PR includes a Manual Testing Guide, splits large work into focused stacked PRs, follows branch/title conventions, and never bypasses commit hooks."
---

## What it is

The convention for how w3dev pull requests are structured and reviewed:
what a PR body must contain, how large changes get split, how branches
are named, and what's never allowed regardless of urgency.

## Why we adopted this

- **Reviewable by default.** A Manual Testing Guide tells a reviewer
  exactly how to verify the change themselves, instead of trusting the
  description or re-deriving a test plan from the diff.
- **Small PRs, fast reviews.** A focused, stacked PR is reviewable in
  minutes; a sprawling one either gets rubber-stamped or stalls — neither
  outcome is good.
- **Predictable history.** Consistent branch naming and conventional
  commit-style PR titles keep `git log` and the PR list scannable, and
  feed the same tooling that reads Conventional Commits (see
  `specs/conventional-commits.md`).
- **Hooks exist for a reason.** Bypassing commit hooks trades a
  short-term speed-up for an unverified commit landing in history — not a
  trade w3dev makes.

## w3dev-specific notes

- **Manual Testing Guide required.** Every PR body includes a section
  titled "Manual Testing Guide" — concrete steps a reviewer can follow to
  verify the change locally or in a sandbox (see `specs/sandbox.md`).
  "Tested locally" with no steps does not satisfy this.
- **Split large changes.** A change that touches multiple concerns is
  split into focused, stacked PRs — each independently reviewable and
  landing in sequence — rather than shipped as one large PR. If a change
  can't be reviewed in one sitting, it's a signal to split it.
- **Branch naming:** `<type>/<short-description>`, using the same `type`
  vocabulary as Conventional Commits (`feat`, `fix`, `chore`, `docs`,
  `refactor`, `test`, `ci`) — e.g. `fix/empty-request-body`.
- **PR title:** follows Conventional Commit style
  (`type(scope): description`), since squash-merge titles become the
  permanent commit message on `main`.
- **Never bypass commit hooks.** `--no-verify` (or any other hook-skip) is
  forbidden. If a hook fails, fix the underlying issue or fix the hook —
  don't skip it.

## Links

- Related: `specs/conventional-commits.md`, `specs/sandbox.md`
