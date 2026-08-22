---
id: agent-skills
title: Agent Skills
status: official
number: "0002"
maturity: stable
owner: w3dev
updated: "2026-08-22"
adopted_date: "2026-08-22"
canonical_url: https://agentskills.io/specification
tags: [ai-agents, convention]
related: [agents-md]
summary: "SKILL.md folders package reusable, on-demand expertise (instructions, scripts, resources) that agents load only when triggered."
---

## What it is

Agent Skills is a vendor-neutral convention for packaging reusable,
domain-specific expertise as a portable filesystem directory: a required
`SKILL.md` file with YAML frontmatter (`name`, `description`, and optional
`license`, `compatibility`, `metadata`, `allowed-tools`) plus a Markdown body
of instructions, and any bundled resources — `scripts/`, `references/`,
`assets/`. Anthropic originally developed the format for Claude, then
released it as an open standard in December 2025, now stewarded at
agentskills.io with contribution open to the ecosystem. The same `SKILL.md`
folder works unmodified across Claude Code, VS Code/GitHub Copilot, OpenAI
Codex, OpenCode, and other compatible agents.

Skills load via progressive disclosure: `name` and `description` (~100
tokens) load into every session at near-zero cost; the full `SKILL.md` body
loads only when the description matches the task at hand; bundled files load
only when explicitly read or run — so a project can accumulate many skills
without a context penalty for the ones not in use.

**Directory convention.** `.agents/skills/<skill-name>/SKILL.md` is the
vendor-neutral base directory the standard defines, and the one w3dev repos
use by default. Vendor-specific directories such as `.claude/skills/` (and
Claude Code's user-level `~/.claude/skills/`) are compatibility locations
for that product's runtime, not a different format — same `SKILL.md`,
different lookup path. Prefer `.agents/skills/` unless a skill genuinely
depends on one vendor's runtime, in which case say so via the
`compatibility` field.

## Why we adopted this

- **Composable expertise.** A skill is scoped to one capability (a deploy
  process, a design checklist, a data-viz convention) and loads only when
  relevant, instead of bloating every prompt with instructions most tasks
  don't need.
- **Portable across agents.** Because the format is vendor-neutral, one
  `SKILL.md` under `.agents/skills/` works in Claude Code and other
  compatible agents without a rewrite or a second copy per tool.
- **Filesystem-native.** No upload step required — a skill is just a
  directory a project or user already controls, which keeps authoring and
  version control ordinary.
- **Deterministic where it matters.** Bundled scripts run via bash and return
  only their output to context, so skills can encode exact procedures instead
  of relying on the model to reproduce them from prose each time.

## w3dev-specific notes

- **Skills teach HOW, this registry lists WHAT.** A `SKILL.md` is procedural —
  it teaches an agent how to execute a workflow (write a migration, run a
  release). A spec in `spec.w3dev.app` is declarative — it states which
  external convention or protocol a w3dev repo has agreed to follow. Don't
  conflate the two: a repo's skills reference specs by id when a workflow
  depends on one (e.g. a release skill referencing `conventional-commits` and
  `semver`), rather than restating the convention inline.
- **Placement.** New skills go under `.agents/skills/`; don't add a parallel
  `.claude/skills/` copy of the same skill — the vendor-neutral path already
  covers Claude Code.
- **Security posture.** The format being an open standard doesn't imply
  trust in any given skill's contents. Only use skills authored by w3dev or
  obtained from Anthropic's reference set — a skill from an untrusted source
  is effectively unreviewed code with tool access, audit before installing.
- **Don't duplicate `AGENTS.md`.** Repo-wide build/test/convention context
  belongs there (spec `agents-md`); skills are for scoped, on-demand
  procedures, not general repo orientation.

## Links

- Canonical specification: https://agentskills.io/specification
- Governance / spec source: https://github.com/agentskills/agentskills
- Anthropic's original overview: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
- Open-source reference skills: https://github.com/anthropics/skills
