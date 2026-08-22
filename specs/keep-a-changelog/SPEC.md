---
id: keep-a-changelog
title: Keep a Changelog
status: official
number: "0008"
maturity: stable
owner: w3dev
updated: "2026-08-22"
adopted_date: "2026-08-22"
canonical_url: https://keepachangelog.com
version: "1.1.0"
tags: [docs, release]
applies_to: [all]
related: [semver, conventional-commits]
summary: "Human-readable CHANGELOG.md convention: grouped Added/Changed/Fixed entries per version, newest first, for every release."
---

## What it is

Keep a Changelog is a convention for writing `CHANGELOG.md` files that
humans can actually read. Each release gets its own section, entries are
grouped under standard headings (`Added`, `Changed`, `Deprecated`,
`Removed`, `Fixed`, `Security`), and sections are ordered newest-first with
an `Unreleased` section at the top for changes not yet cut into a release.

```
## [Unreleased]

## [1.1.0] - 2026-08-01
### Added
- New export command.

### Fixed
- Crash on empty input.
```

## Why we adopted this

- **Human-first.** Unlike a generated commit log, a changelog is written for
  people deciding whether to upgrade — it answers "what do I need to know,"
  not "what commits landed."
- **Predictable structure.** The six standard headings mean readers always
  know where to look for a given kind of change, across every project that
  follows the convention.
- **Pairs with automation.** The `Unreleased` section gives release tooling
  a landing zone; commit-derived notes (see `conventional-commits`) can seed
  it, but a human still edits for clarity before release.
- **Version discipline.** Every release section links to a diff and pairs
  with a Semantic Versioning bump (see `semver`), so the changelog and the
  version number never drift apart.

## w3dev-specific notes

- Every package/app that ships releases keeps a `CHANGELOG.md` at its root,
  following this format — generated release notes are not a substitute.
- The `Unreleased` section is kept up to date as part of the PR that makes
  the change, not reconstructed at release time.
- Entries are written for the reader, not copied from commit subjects
  verbatim — rephrase for clarity when the commit message is too terse.
- Use `Security` for any change that patches a vulnerability, even a minor
  one; these entries should not be buried under `Fixed`.

## Links

- Canonical spec: https://keepachangelog.com
- Related: `specs/semver.md`, `specs/conventional-commits.md`
