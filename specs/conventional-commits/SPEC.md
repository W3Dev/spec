---
id: conventional-commits
title: Conventional Commits
status: official
number: "0007"
maturity: stable
owner: w3dev
updated: "2026-08-22"
adopted_date: "2026-08-22"
canonical_url: https://www.conventionalcommits.org/en/v1.0.0/
version: "1.0.0"
tags: [git, workflow, tooling]
applies_to: [all]
related: [semver, keep-a-changelog]
summary: "Structured commit message format (type(scope): message) enabling automated changelogs and semver bumps."
---

## What it is

Conventional Commits is a lightweight convention for commit message structure:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

The `type` communicates intent at a glance — `feat` for a new feature, `fix`
for a bug fix, and so on. Because the format is machine-parseable, tooling
can walk a repository's commit history and derive a changelog and a semantic
version bump without a human summarizing anything by hand.

## Why we adopted this

- **Automated changelogs.** Every release note comes straight from commit
  history instead of someone reconstructing "what changed" after the fact.
- **Automated versioning.** `fix` commits map to patch bumps, `feat` commits
  to minor bumps, and breaking changes to major bumps — semver stays
  consistent without a manual judgment call at release time.
- **Scannable history.** `git log --oneline` becomes legible on its own;
  reviewers and future maintainers can tell what a commit does before
  opening the diff.
- **Low adoption cost.** It's a message-format convention, not a new tool or
  process — it works with any git host and any CI system.

## w3dev-specific notes

- **Allowed types:** `feat`, `fix`, `chore`, `docs`, `refactor`, `test`,
  `ci`. Don't invent new types without updating this spec first.
- **Scope:** in a monorepo, the scope is the package directory, e.g.
  `fix(api): handle empty request body`. In a single-package repo, scope is
  optional and may be omitted.
- **Breaking changes:** mark with a `!` after the type/scope
  (`feat(api)!: drop v1 endpoints`) **and** include a `BREAKING CHANGE:`
  footer describing the migration. Both are required, not either/or.

## Enforcement

- Commit messages are linted in CI on every pull request; a commit that
  doesn't parse as a Conventional Commit fails the check.
- Squash-merge commit titles must also follow the format, since that title
  becomes the permanent commit message on `main`.
- Release tooling reads the merged history on `main` to generate changelogs
  and version bumps — non-conforming commits are excluded from the
  changelog and can cause a version bump to be missed.
