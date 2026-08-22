# START.md — Execution Protocol

Reference for [`../SPEC.md`](../SPEC.md). `START.md` lives at the root of
every epic folder and gives the entity executing the epic (human or agent)
the order of work and the commit discipline to follow.

## Order of work

- Start with the first incomplete task (lowest unchecked serial in
  `STATUS.md`).
- Read the full task markdown file before making any change.
- Review every linked resource in that task's `# Resources` section before
  implementing.
- Implement only the scope described in the task. Do not expand scope
  unless required for correctness.
- Do not create additional research tasks. If missing information is
  discovered mid-task, document it immediately under `resources/` and
  continue with the best implementation path.
- Run the task's `# Verification` steps.
- Update the task frontmatter `status` from `todo` to `done`.
- Update the task's checklist if it changed during implementation.
- Update the epic `STATUS.md` checkbox for that task.
- Commit the completed task.
- Move to the next incomplete task only after verification, documentation
  updates, status updates, and the commit are all complete.

## Commit rules

- Every commit has a proper message that includes the epic slug or task
  slug, for example:
  - `01-user-onboarding-flow: add onboarding state model`
  - `02-build-progress-ui: implement onboarding progress component`
- **DO NOT IGNORE ANY PRECOMMIT HOOK.** If a hook fails, fix the underlying
  issue and rerun — never bypass it.
- Do not skip linting, formatting, type-checking, tests, builds, migrations,
  or any other validation check that's part of the project's workflow.
- Do not start a new task until the current one is verified, documented,
  status-updated, and committed.
- Keep changes scoped to the active task.
- Do not mark a task `done` unless its verification passes.
- If verification cannot be completed, document exactly what could not be
  verified and why, before committing.
