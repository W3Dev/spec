# Task File Template

Reference for [`../SPEC.md`](../SPEC.md). Every task file lives directly
inside the epic folder at
`.agents/tasks/<YYYY-MM-DD>/<serial>-<epic-name>/<task-serial>-<task-name>.md`.
Task serials start at `01` and increment sequentially within the epic.

## Frontmatter

```yaml
---
title: "Task title"
epic: "<serial>-<epic-name>"
task_id: "<task-serial>-<task-name>"
status: "todo"
priority: "high | medium | low"
estimated_scope: "small | medium | large"
dependencies: []
resources:
  - "resources/path-to-resource.md"
affected_files:
  - "path/to/file.ts"
  - "path/to/component.tsx"
verification:
  type: "manual | automated | both"
---
```

## Required sections

Every task file must contain all 11 sections, in order:

1. `# Summary` — concise explanation of what this task accomplishes.
2. `# Implementation Goal` — the specific outcome this task must produce.
3. `# Context` — relevant observations from the initial assessment: existing
   files, systems, patterns, APIs, components, conventions, or constraints
   that matter. Enough that the implementer never has to redo discovery.
4. `# Resources` — the relevant files from the epic's `resources/` folder,
   each with a note explaining how it should be used.
5. `# Implementation Checklist` — detailed checklist of subtasks; each item
   specific and actionable, with file- or component-level guidance where
   useful.
6. `# Technical Guidance` — implementation details: files to create or
   modify, patterns to follow, naming guidance, and data flow, API, UI,
   state, styling, testing, or configuration guidance as applicable.
7. `# Constraints` — compatibility, accessibility, performance, security,
   architecture, or project-convention constraints the implementer must
   follow.
8. `# Edge Cases` — cases to handle: loading states, empty states, errors,
   validation, permissions, responsive behavior, race conditions, rollback
   behavior, migration concerns, as applicable.
9. `# Verification` — concrete steps to verify the task, including commands
   to run where applicable, manual review steps, and expected results;
   screenshots, pages, APIs, logs, tests, or files to check.
10. `# Expected Outcome` — what must be true after the task is complete.
11. `# Completion Updates` — instructions to flip this task's frontmatter
    `status` from `todo` to `done`, update the epic `STATUS.md`, and commit
    the completed task.

Each checklist must be detailed enough that another engineer or coding agent
can implement the task without redoing planning or research.
