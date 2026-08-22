---
id: spec-versioning
title: "Spec Versioning & Archive"
status: unofficial
number: "0016"
maturity: experimental
owner: w3dev
updated: "2026-08-22"
tags: [convention, versioning, docs]
related: [keep-a-changelog, semver]
summary: "How a spec's followed version is pinned, how its history is recorded, and how it gets retired to archive/."
---

## What it is

Spec Versioning & Archive is w3dev's convention for the lifecycle of a spec
in this registry: how the version/revision it currently follows is recorded,
where its history lives, and how a spec gets retired once it's no longer
followed. It fixes three mechanisms — the frontmatter `version` pin, an
optional sibling `CHANGELOG.md`, and moving a retired spec into `archive/` —
and draws a hard line between an in-place version bump and a spec being
replaced wholesale.

## Why we adopted this

- **One place to check "what are we following."** Without a fixed pin, a
  spec's followed revision drifts between frontmatter, prose, and memory.
- **History that outlives its links.** Upstream spec pages and PRs
  disappear or move; a changelog entry written to be self-contained still
  answers "what changed and why" after the link rots.
- **Specs age out instead of piling up.** A retired spec should stop
  cluttering the current registry without losing its record.
- **Bumps and rewrites are different events.** Conflating "the spec issued a
  new revision" with "we replaced this spec with something else" makes
  `supersedes`/`superseded_by` and changelogs equally unreliable.

## Convention

**Version pin.** Frontmatter `version` is the single source of truth for
the revision or version a spec currently follows (a dated revision, e.g.
MCP's `2026-07-28`, or a semver string). `SPEC.md` describes only the
current state — no version-history section in the body.

**Changelog.** History lives in an optional sibling
`specs/<slug>/CHANGELOG.md`, in [Keep a Changelog](/specs/keep-a-changelog/)
format. Division of labor: the story lives in the file, the diff lives in
git — every entry is a self-contained human-readable summary (written as if
its links might die), plus a link to the commit/PR for internal specs or
the upstream dated revision for external standards. Served raw at
`/specs/<slug>/CHANGELOG.md`; `specs.json` entries gain a `changelog_url`
once the file exists. When a bump earns a detailed migration runbook, it
goes in `specs/<slug>/references/migration-<old>-to-<new>.md`, linked from
the changelog entry. Starter shape:
[changelog-template.md](references/changelog-template.md).

**Archive.** `specs/` holds only current, followed specs. To retire one:
`git mv specs/<slug> archive/<slug>` (`archive/` mirrors the `specs/`
layout), set `status: deprecated` (plus `superseded_by` if something
replaces it), and add a final `CHANGELOG.md` entry recording the
retirement. Archived specs render at `/archive/<slug>/` with an Archived
banner; the old `/specs/<slug>/` URL becomes a redirect stub, never a 404;
`/archive.json` lists archived specs; `llms.txt` gains an Archive section
once non-empty. The validator enforces `status: deprecated` only inside
`archive/` (never in `specs/`), and rejects a slug present in both trees.

**Generational breaks vs. version bumps.** A v2 that replaces a spec
wholesale — a rewritten, incompatible contract — is a **new spec id**,
linked to the old one via `supersedes`/`superseded_by`, not a changelog
entry. An in-place revision (a new dated MCP revision, a semver bump that
keeps the same contract) stays the same spec id and is logged as a
`CHANGELOG.md` entry instead. Rule of thumb: "update this field" is a
changelog entry; "adopt a different spec" is `supersedes`.

## Links

- [Keep a Changelog](/specs/keep-a-changelog/) — the format `CHANGELOG.md`
  files follow.
- [Semantic Versioning](/specs/semver/) — one shape a `version` pin can take.
- [`/specs/mcp/CHANGELOG.md`](/specs/mcp/CHANGELOG.md) — worked example.
- [changelog-template.md](references/changelog-template.md) — starter
  template for a new spec's `CHANGELOG.md`.
