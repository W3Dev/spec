---
id: semver
title: Semantic Versioning
status: official
number: "0006"
maturity: stable
owner: w3dev
updated: "2026-08-22"
adopted_date: "2026-08-22"
canonical_url: https://semver.org
version: "2.0.0"
tags: [versioning, release]
related: [conventional-commits, keep-a-changelog]
summary: "MAJOR.MINOR.PATCH version scheme where each segment's bump signals breaking, additive, or fix-only changes."
---

## What it is

Semantic Versioning (SemVer) is a versioning scheme of the form
`MAJOR.MINOR.PATCH`, where each segment carries a specific meaning:

- **MAJOR** — incompatible/breaking API changes
- **MINOR** — backward-compatible functionality added
- **PATCH** — backward-compatible bug fixes

Optional pre-release (`-alpha.1`) and build-metadata (`+build.5`) suffixes
extend the core triplet. The core promise is that consumers can read a
version bump and know, without reading a changelog, whether upgrading is
safe: a PATCH or MINOR bump should never break existing usage; a MAJOR bump
might.

## Why we adopted this

- **Predictable upgrades.** Anyone depending on a w3dev package can set a
  version range (`^1.2.0`) and trust that patch/minor releases won't break
  them — that trust is the entire point of the scheme.
- **Pairs with automated tooling.** Combined with `conventional-commits`,
  commit types map directly to version bumps (`fix` → patch, `feat` → minor,
  breaking change → major), so releases don't require a human to decide the
  version by hand.
- **Universal.** It's the default versioning expectation across the npm,
  Cargo, and most language package ecosystems w3dev repos already depend on
  — there's no reason to deviate.

## w3dev-specific notes

- **Version bumps are derived, not chosen.** Release tooling computes the
  bump from Conventional Commit history on `main` (see `conventional-commits`)
  — don't manually pick a version number in a release PR.
- **Pre-1.0 packages still apply the rule strictly.** `0.y.z` is allowed to
  break on any change per the spec, but within a w3dev `0.x` package, treat
  `0.MINOR` bumps as breaking and `0.x.PATCH` as fixes — document the
  exception in the package's own README so consumers aren't surprised.
- **Every release gets a changelog entry.** Pair each version bump with a
  matching entry under `keep-a-changelog` conventions so the *why* behind a
  bump is recorded, not just the number.

## Links

- Canonical: https://semver.org
- Version: 2.0.0 — https://semver.org/spec/v2.0.0.html
