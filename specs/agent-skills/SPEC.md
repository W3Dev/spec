---
id: agent-skills
title: Agent Skills
status: official
number: "0002"
maturity: stable
owner: w3dev
updated: "2026-08-22"
adopted_date: "2026-08-22"
canonical_url: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
tags: [ai-agents, convention]
related: [agents-md]
summary: "SKILL.md folders package reusable, on-demand expertise (instructions, scripts, resources) that agents load only when triggered."
---

## What it is

Agent Skills is Anthropic's convention for packaging reusable, domain-specific
expertise as a filesystem directory: a required `SKILL.md` file with YAML
frontmatter (`name`, `description`) plus an optional body of instructions, and
any bundled resources — reference docs, templates, executable scripts.

Skills use progressive disclosure across three levels: the `name` and
`description` load into every conversation at near-zero token cost; the full
`SKILL.md` body loads only when the description matches the task at hand;
and bundled files (scripts, references) load only when explicitly read or
run. This lets a project accumulate many skills without a context penalty for
the ones not in use. Skills work in Claude Code (`~/.claude/skills/` or
`.claude/skills/`), the Claude API, and claude.ai, though they don't sync
automatically across those surfaces.

## Why we adopted this

- **Composable expertise.** A skill is scoped to one capability (a deploy
  process, a design checklist, a data-viz convention) and loads only when
  relevant, instead of bloating every prompt with instructions most tasks
  don't need.
- **Filesystem-native.** No API upload step required for Claude Code usage —
  a skill is just a directory a project or user already controls, which keeps
  authoring and version control ordinary.
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
- **Security posture.** Only use skills authored by w3dev or obtained from
  Anthropic. A skill from an untrusted source is effectively unreviewed code
  with tool access — audit before installing, same as any dependency.
- **Don't duplicate `AGENTS.md`.** Repo-wide build/test/convention context
  belongs in `AGENTS.md` (spec `agents-md`); skills are for scoped, on-demand
  procedures, not general repo orientation.

## Links

- Canonical: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
- Open-source reference skills: https://github.com/anthropics/skills
