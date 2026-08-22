# Epic Folder Structure

Reference for [`../SPEC.md`](../SPEC.md). Defines the canonical layout,
naming/serial rules, and hard do-nots for an Agent Task Planning epic.

## Canonical structure

```txt
.agents/tasks/<YYYY-MM-DD>/<serial>-<epic-name>/
  START.md
  GOAL.md
  STATUS.md
  resources/
  01-<task-name>.md
  02-<task-name>.md
  03-<task-name>.md
```

`START.md`, `GOAL.md`, `STATUS.md`, and `resources/` are all **required** in
every epic folder, alongside the numbered task files. `GOAL.md` is the
harness-facing file stating the epic's end goal in a verifiable-outcome
format — see [goal-template.md](goal-template.md). It is required even
though a shorthand example later in this convention's source brief lists a
folder without it; that shorthand is the incomplete version, the block above
is canonical.

## Naming and serial rules

- **Date folder:** `<YYYY-MM-DD>`, the current date.
- **Epic serial:** two-digit, starting at `01`. If the date folder already
  contains epic folders, use the next available serial. Otherwise use `01`.
- **Epic name:** kebab-case, descriptive of the objective.
- **Task serial:** two-digit, starting at `01` per epic, incrementing
  sequentially: `01-<task-name>.md`, `02-<task-name>.md`, etc.

## resources/ subfolders

Store all planning resources — notes, screenshots, copied references, API
findings, codebase observations, schema notes, design notes, command
outputs, snippets, diagrams, logs — inside `resources/`. Organize into
subfolders named for the material, created only as needed, for example:

- `resources/screenshots/`
- `resources/notes/`
- `resources/api/`
- `resources/codebase/`
- `resources/logs/`
- `resources/references/`

Once the initial assessment is complete, organize resources so each task can
clearly point at the specific files it needs (including references from
code, where applicable).

## Do-nots

- Do not create a root-level `tasks/` folder.
- Do not create a global `.agents/tasks/<YYYY-MM-DD>/STATUS.md` — `STATUS.md`
  lives inside the epic folder only, never at the date-folder level.
- Do not create multiple epics in a single planning run.
- Do not place any planning file for the run outside the single epic folder.

## Example

```txt
.agents/tasks/2026-06-10/01-user-onboarding-flow/
  START.md
  GOAL.md
  STATUS.md
  resources/
  01-review-current-onboarding-entrypoints.md
  02-add-onboarding-state-model.md
  03-build-onboarding-progress-ui.md
  04-connect-onboarding-api-flow.md
  05-add-end-to-end-verification.md
```
