---
id: agents-md
title: AGENTS.md
status: official
number: "0001"
maturity: stable
owner: w3dev
updated: "2026-08-22"
adopted_date: "2026-08-22"
canonical_url: https://agents.md
tags: [ai-agents, docs, convention]
applies_to: [all]
summary: "Open-format README-for-agents file giving AI coding agents build, test, and convention context, read by 30+ coding tools."
---

## What it is

AGENTS.md is an open, markdown-based convention for a dedicated file that gives
AI coding agents the context a human developer would otherwise get from a
README, onboarding doc, or tribal knowledge: build commands, test commands,
code style, and project-specific gotchas. It deliberately separates
agent-facing instructions from the human-facing `README.md`, so the README can
stay concise while agents get a predictable, repo-root location to look for
detailed operational context.

The format is plain Markdown with no required fields or schema — projects
typically include sections like project overview, setup/build/test commands,
code conventions, and security notes. In monorepos, nested `AGENTS.md` files
can scope instructions to a subproject, with the closest file to the working
directory taking precedence.

## Why we adopted this

- **Anchor spec of this registry.** AGENTS.md is the entry point every other
  agent-facing convention in `spec.w3dev.app` hangs off — it is the first file
  an agent reads, and it is where a repo tells an agent this registry exists.
- **Broad tool support.** Read by 30+ coding agents and assistants — Claude
  Code, OpenAI Codex, Cursor, Aider, GitHub Copilot, and others — so writing
  one file serves every agent a contributor might use, not just one vendor's.
- **Keeps READMEs human.** Build/test minutiae and agent-specific caveats move
  out of `README.md`, which stays focused on explaining the project to people.
- **No lock-in.** It's a filename-and-markdown convention, not a proprietary
  config format — adopting it costs nothing to reverse.

## w3dev-specific notes

- **Every repo must carry an `AGENTS.md`** at its root. For monorepos, add
  nested `AGENTS.md` files in subprojects where conventions genuinely differ;
  don't duplicate root-level content.
- **Link back to this registry.** Every `AGENTS.md` must reference
  `https://spec.w3dev.app` so an agent reading it can discover the specs this
  repo follows (conventional commits, semver, MCP usage, etc.) instead of
  guessing.
- **Keep it current.** Treat `AGENTS.md` like code — update it in the same PR
  that changes a build step, test command, or convention it documents. A
  stale AGENTS.md is worse than none, because agents will trust it.

## Links

- Canonical: https://agents.md
- Governance: stewarded by the Agentic AI Foundation under the Linux
  Foundation.
