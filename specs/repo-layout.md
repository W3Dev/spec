---
id: repo-layout
title: Repository Layout
status: unofficial
number: "0013"
maturity: stable
owner: w3dev
updated: "2026-08-22"
tags: [convention, structure]
applies_to: [all]
summary: "Canonical top-level structure for w3dev repos: root agent docs, docs/, scripts/, .github/workflows, pnpm, monorepo apps/packages."
---

## What it is

The canonical top-level layout every w3dev repository follows, so a
contributor (or agent) landing in any repo already knows where things
live without exploring first.

```
.
├── AGENTS.md / CLAUDE.md   # agent operating instructions
├── README.md
├── docs/                   # human-facing documentation
├── scripts/                # maintenance / one-off scripts
├── .github/workflows/      # CI, including Vercel deploy
├── apps/                   # deployable applications (monorepo)
├── packages/               # shared libraries (monorepo)
├── package.json
└── pnpm-lock.yaml
```

## Why we adopted this

- **Predictability.** The same top-level shape across every repo means
  less time spent orienting and more time working — this matters even
  more for agents, which re-derive context every session.
- **CI ownership is unambiguous.** Deploys live in `.github/workflows`,
  never behind an ad-hoc script or a developer's local CLI session, so
  "how does this get to production" always has one answer.
- **Monorepo growth path.** `apps/` and `packages/` scale from a single
  app to many without a restructure — a new app is a new directory, not a
  new convention.
- **Single package manager.** Standardizing on pnpm avoids lockfile
  conflicts and the class of bugs caused by mixing package managers
  across a team.

## w3dev-specific notes

- **`AGENTS.md` / `CLAUDE.md`** live at repo root and are the first thing
  an agent reads — operating rules, constraints, and pointers into
  `docs/` belong there, not scattered across the repo.
- **`docs/`** holds human-facing documentation (architecture notes,
  runbooks); it is not a dumping ground for generated output.
- **`scripts/`** holds maintenance and one-off scripts (migrations,
  validators, codegen) — anything run by a human or CI outside the normal
  app build.
- **`.github/workflows/`** is the only place a deploy is triggered from.
  Vercel deploys happen exclusively through the repo's GitHub Actions
  workflow on push to the deploy branch — never via `vercel --prod` or
  any other manual CLI invocation. A repo missing this workflow is
  missing required infrastructure, not exempt from the rule.
- **Package manager:** pnpm, always — `pnpm-lock.yaml` is committed;
  `package-lock.json` or `yarn.lock` should not appear alongside it.
- **Monorepo conventions:** deployable applications live under `apps/*`;
  code shared across more than one app lives under `packages/*`. A
  single-app repo may skip the monorepo layout entirely and keep the app
  at root.

## Links

- Related: `specs/env-vars.md`, `specs/pr-conventions.md`
