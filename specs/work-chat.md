---
id: work-chat
title: Work Chat
status: draft
number: "0011"
maturity: experimental
owner: w3dev
updated: "2026-08-22"
tags: [communication, workflow]
summary: "Draft convention for human/agent work communication: where updates post, threading, notification etiquette, and the structured status message shape."
---

## What it is

Work Chat is the convention for how humans and agents communicate status
and progress on active work — where updates get posted, how they're
threaded, and what a status message contains, so a human can skim a
channel and know what's happening without pinging anyone.

## Why we adopted this

- **Async by default.** Agents may run for a long time unattended; a
  predictable place to post status means nobody has to poll for progress.
- **Skimmable history.** Threading keeps a task's updates together instead
  of scattering them across a channel, so context isn't lost.
- **Reduces interruption.** A structured status message answers the
  obvious follow-up questions ("what's done," "what's blocked") up front,
  cutting down on notification noise for things that don't need a human
  yet.
- **Same convention for humans and agents.** One format means a human
  scanning a channel doesn't have to context-switch between "agent style"
  and "human style" updates.

## w3dev-specific notes

- **Where updates are posted:** the Slack channel tied to the
  repo/project, not DMs — status belongs where the team can see it. One
  thread per unit of work (PR, task, incident).
- **Threading:** the first message in a thread names the unit of work
  (e.g. the PR link or task id); every subsequent update replies in that
  thread rather than posting a new top-level message.
- **Notification etiquette:** only the thread's opening message and a
  final "done/blocked" update should notify (`@here`/`@channel` or a
  direct mention); in-progress updates stay in-thread with no mention.
- **Structured status message shape:**
  ```
  Status: <in progress | blocked | done>
  Doing: <one line, current action>
  Next: <one line, next action> (omit if done)
  Blocked on: <what, and who/what unblocks it> (omit unless blocked)
  ```
- Agents post a status update at the start of a task, on any blocker, and
  on completion — not on every intermediate tool call.

> **Draft status:** this convention is still being shaped. Where updates
> live, threading, and the status shape may change — propose changes via
> PR against this file rather than treating it as final.

## Links

- Related: `specs/pr-conventions.md`
