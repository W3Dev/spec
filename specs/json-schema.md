---
id: json-schema
title: JSON Schema
status: official
number: "0005"
maturity: stable
owner: w3dev
updated: "2026-08-22"
adopted_date: "2026-08-22"
canonical_url: https://json-schema.org
version: "2020-12"
tags: [api, validation, config]
summary: "Declarative vocabulary for describing and validating the shape of JSON documents — configs, API payloads, frontmatter."
---

## What it is

JSON Schema is a declarative, JSON-based vocabulary for describing the
structure, constraints, and semantics of JSON documents: required fields,
types, string patterns, enums, formats (date, URI), and composition rules
like `additionalProperties`. A schema is itself JSON (or YAML), so it can be
validated, diffed, and versioned like any other artifact, and it has
implementations across essentially every language.

The specification is published in dated drafts; **2020-12** is the current
stable draft in wide use, identified by the `$schema` value
`https://json-schema.org/draft/2020-12/schema`.

## Why we adopted this

- **Machine-checkable contracts.** A schema turns "the frontmatter should
  look like this" from a prose convention into something CI can enforce
  automatically and reject on mismatch.
- **Self-hosting fits this registry.** JSON Schema validates the very
  frontmatter contract this registry is built on — `schema/spec-frontmatter.schema.json`
  defines what every `specs/*.md` file's frontmatter must satisfy.
- **Language-agnostic.** Any tool in any language that touches our configs or
  API payloads can validate against the same schema file, so the contract
  doesn't live only in one codebase's types.

## w3dev-specific notes

- **Target draft 2020-12.** New schemas should declare
  `"$schema": "https://json-schema.org/draft/2020-12/schema"` explicitly
  rather than omitting it — don't rely on a validator's default draft.
- **`additionalProperties: false` by default.** Config and frontmatter schemas
  should reject unknown keys unless there's a specific reason to allow
  extension — this catches typos (`sumary` vs `summary`) at validation time
  instead of silently ignoring them.
- **This registry's own schema is the reference example.** See
  `schema/spec-frontmatter.schema.json`, validated in CI via
  `pnpm validate` (`scripts/validate-frontmatter.mjs`, using Ajv's
  2020-12 build).

## Links

- Canonical: https://json-schema.org
- Draft 2020-12: https://json-schema.org/draft/2020-12/schema
- Our schema: `schema/spec-frontmatter.schema.json`
