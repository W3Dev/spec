# GOAL.md — w3dev Default Goal Format

Reference for [`../SPEC.md`](../SPEC.md). `GOAL.md` is the harness-facing
file in every epic folder: it states the epic's end goal in a format the
implementing harness can work toward and verify against, distinct from the
human-facing `STATUS.md` checklist. It is required, not optional.

> **Experimental.** This is the current w3dev-default goal format, not a
> finalized standard. This spec's maturity is `experimental` — expect this
> template to be refined as harnesses standardize on a goal format.

## Template

```md
# Goal: <serial>-<epic-name>

## Objective

One paragraph stating the epic's end goal as a verifiable outcome — what
must be true in the world (system, product, codebase) once every task in
this epic is complete. Written for a harness to work toward, not as a
human-readable summary.

## Success Criteria

- [ ] Checkable, observable condition 1
- [ ] Checkable, observable condition 2
- [ ] Checkable, observable condition 3

## Out of Scope

What this epic deliberately does not cover, so the harness doesn't expand
scope while pursuing the objective.

## Verification

How the harness confirms the goal is met overall, once every task's
`STATUS.md` checkbox is checked — commands to run, behaviors to exercise, or
artifacts to inspect at the epic level. This is distinct from each task's
own `# Verification` section, which checks that one task's change works.
```

## Notes

- Success Criteria should be independently checkable — the actual outcome
  the tasks were meant to produce, not just "all epic tasks are complete."
- Keep Objective and Success Criteria consistent with the epic's task list.
  If a task is added, removed, or rescoped during execution, update
  `GOAL.md` to match.
