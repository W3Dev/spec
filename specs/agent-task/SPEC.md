---
id: agent-task
title: "Agent Task Planning"
status: unofficial
number: "0015"
maturity: experimental
owner: w3dev
updated: "2026-08-22"
tags: [ai-agents, workflow, convention]
applies_to: [all]
related: [agents-md, agent-skills]
summary: "Convention for an AI agent to turn a user objective into one implementation-ready epic of small task files under .agents/tasks/."
---

## What it is

Agent Task Planning is w3dev's convention for how an AI coding agent turns a
user's objective — engineering, product, UI, backend, refactor, integration,
migration, testing, documentation, automation, or operational — into an
implementation-ready plan. The agent completes all discovery, codebase
inspection, and design/API review up front, then produces exactly **one
epic**: a folder of small, independently completable task files under
`.agents/tasks/<YYYY-MM-DD>/<serial>-<epic-name>/`. No research tasks ever
appear in the output — research happens before task files are written, and
its findings are captured as resources the tasks reference instead of
repeating.

## Why we adopted this

- **Discovery-first, not discovery-interleaved.** Front-loading research
  keeps implementation tasks small and mechanical — executing task 03 never
  requires stopping to investigate.
- **One epic, one place.** Every artifact for a planning run — tasks,
  resources, status, execution instructions — lives inside a single dated
  folder, so a repo never accumulates orphaned `tasks/` directories or
  competing status files.
- **Right-sized tasks.** Splitting work into single-focused-pass tasks (one
  endpoint, one component, one schema change) keeps each change reviewable
  and each commit meaningful, instead of one sprawling "build the feature"
  diff.
- **Traceable execution.** Frontmatter status, checklist state, and
  per-task commits give a durable record of what was done and verified,
  without a separate project-management tool.

## Convention

- **Epic path:** `.agents/tasks/<YYYY-MM-DD>/<serial>-<epic-name>/`, serial
  starting at `01` and incrementing per date folder (e.g.
  `.agents/tasks/2026-06-10/01-user-onboarding-flow/`).
- **Structure:** `START.md`, `GOAL.md` (harness-facing, required), `STATUS.md`,
  `resources/`, and `NN-<task-name>.md` files — full layout and naming rules
  in [epic-structure.md](references/epic-structure.md).
- **Hard rules:** no research tasks in the output; exactly one epic per run;
  every file for the run stays inside that one epic folder; no root
  `tasks/` folder; no global per-date `STATUS.md`.
- **Task sizing:** each task must be completable in a single focused coding
  pass. Too broad: "Build the feature", "Implement the dashboard",
  "Refactor the backend", "Add tests". Right-sized: "Add onboarding state
  model", "Build onboarding progress UI", "Connect onboarding API flow",
  "Add end-to-end verification for onboarding".

## w3dev-specific notes

- Task file frontmatter and required sections are fixed — see
  [task-template.md](references/task-template.md).
- `START.md` encodes the execution protocol (order, scope discipline, commit
  rules) — see [start-template.md](references/start-template.md).
- `GOAL.md` is the current w3dev-default goal format for the implementing
  harness and is marked experimental — see
  [goal-template.md](references/goal-template.md).
- `STATUS.md` is a fixed checklist template — see
  [status-template.md](references/status-template.md).

## Links

- [epic-structure.md](references/epic-structure.md) — canonical folder
  layout, naming/serial rules, do-nots.
- [goal-template.md](references/goal-template.md) — GOAL.md format
  (harness-facing goal statement).
- [task-template.md](references/task-template.md) — task file frontmatter
  and the 11 required sections.
- [start-template.md](references/start-template.md) — START.md execution
  protocol and commit rules.
- [status-template.md](references/status-template.md) — STATUS.md format.
