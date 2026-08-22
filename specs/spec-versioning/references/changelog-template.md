# Changelog template

Starter shape for a new `specs/<slug>/CHANGELOG.md`. Copy this, drop the
comments, and keep entries newest-first per
[Keep a Changelog](/specs/keep-a-changelog/).

Each entry should read on its own if every link in it later dies — say what
changed and why, in plain language — then point to the source of truth for
the diff: the commit/PR for an internal (w3dev-authored) spec, or the
upstream dated revision / release page for an external standard.

```markdown
# Changelog — <slug>

## [Unreleased]

## [<new version>] - <YYYY-MM-DD>
### Added
- <what's new, in plain language>

### Changed
- <what changed and why, in plain language>

### Deprecated
- <what's going away, and what to use instead>

### Removed
- <what was removed>

### Fixed
- <what was fixed>

### Security
- <what vulnerability this addresses>

<!-- internal spec: link the commit/PR that made the change -->
[<new version>]: https://github.com/<org>/<repo>/pull/<n>
<!-- external standard: link the upstream dated revision or release -->
[<new version>]: https://example.org/spec/<new version>
```

Notes:

- Omit any of the six headings (`Added`/`Changed`/`Deprecated`/`Removed`/
  `Fixed`/`Security`) that don't apply to a given entry — don't leave empty
  sections.
- If a bump needs more than a paragraph to explain how to migrate, write the
  runbook at `specs/<slug>/references/migration-<old>-to-<new>.md` and link
  it from the entry instead of inlining the steps.
- A spec's retirement into `archive/` gets its own final entry here (e.g.
  under `Deprecated`) recording the date and, if applicable, what replaced
  it — see [spec-versioning](../SPEC.md#archive).
