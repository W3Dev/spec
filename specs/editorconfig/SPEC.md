---
id: editorconfig
title: EditorConfig
status: official
number: "0009"
maturity: stable
owner: w3dev
updated: "2026-08-22"
adopted_date: "2026-08-22"
canonical_url: https://editorconfig.org
tags: [tooling, formatting]
applies_to: [all]
summary: "A .editorconfig file at repo root defines indentation, line endings, charset, and trailing-whitespace rules across editors."
---

## What it is

EditorConfig is a file format and a set of editor/IDE plugins that keep
basic coding style consistent across different tools and contributors. A
plain-text `.editorconfig` file, in INI-like format, lives at the project
root (and optionally in subdirectories); any editor with EditorConfig
support reads it and applies the rules automatically, with no per-editor
configuration required.

```ini
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

## Why we adopted this

- **Cross-editor consistency.** Contributors use different editors and
  IDEs; EditorConfig means indentation and line endings stay uniform
  without everyone hand-configuring their tool the same way.
- **Prevents noisy diffs.** Mismatched line endings, trailing whitespace,
  or missing final newlines create diff churn unrelated to the actual
  change — EditorConfig removes that class of noise at the source.
- **Zero runtime cost.** It's a static config file read by editor plugins,
  not a build step or CI gate — the cheapest possible way to standardize
  basics.
- **Complements, doesn't replace, formatters.** Prettier/ESLint/etc. still
  own language-specific style; EditorConfig covers the universal baseline
  (whitespace, encoding, line endings) every file type shares.

## w3dev-specific notes

- Every repo has a `.editorconfig` at its root with `root = true`.
- Baseline for `[*]`: `indent_style = space`, `indent_size = 2`,
  `end_of_line = lf`, `charset = utf-8`, `trim_trailing_whitespace = true`,
  `insert_final_newline = true`.
- Markdown files (`*.md`) disable `trim_trailing_whitespace` — two trailing
  spaces is a valid hard line break in Markdown.
- Makefiles and other tab-sensitive formats get their own section with
  `indent_style = tab`.

## Links

- Canonical spec: https://editorconfig.org
