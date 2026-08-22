---
id: llms-txt
title: llms.txt
status: official
number: "0004"
maturity: stable
owner: w3dev
updated: "2026-08-22"
adopted_date: "2026-08-22"
canonical_url: https://llmstxt.org
tags: [ai-agents, docs, seo]
summary: "Plain-markdown site index at /llms.txt that gives LLMs and agents a concise, links-first map of a site's content."
---

## What it is

`llms.txt` is a proposed convention for a plain-Markdown file served at a
site's root (`/llms.txt`, or scoped subpaths like `/docs/llms.txt`) that gives
language models and agents a concise, context-window-friendly index of a
site's content. Web pages are built for human browsing — navigation chrome,
ads, JavaScript-rendered content — which wastes tokens and can defeat simple
fetchers. `llms.txt` instead offers an H1 title, an optional one-line
blockquote summary, free-text context, and H2-delimited link lists pointing
to the detailed pages behind it, so an agent can decide what to fetch next
without ingesting the whole site.

The format was proposed by Jeremy Howard (Answer.AI) in September 2024 and
has since been revised (v2, August 2026); it is maintained via an open GitHub
repository.

## Why we adopted this

- **We dogfood it.** `spec.w3dev.app` serves `/llms.txt` itself, so an agent
  discovering our registry gets a machine-readable index of every spec
  instead of having to scrape rendered HTML.
- **Cheap to produce, cheap to consume.** It's a static Markdown file
  generated from content we already have (the specs list); no new
  infrastructure required.
- **Complements, doesn't replace, normal SEO.** `llms.txt` is additive to a
  sitemap — it's optimized for a different consumer (an LLM deciding what to
  fetch) than `sitemap.xml` (a crawler indexing everything).

## w3dev-specific notes

- **`spec.w3dev.app/llms.txt` is generated, not hand-maintained.** It's built
  from the same frontmatter (`id`, `title`, `summary`) that drives the site,
  at build time — keep it in sync by never hand-editing the output file.
- **List format.** Follow the spec's H2 "file list" convention: one H2 section
  per logical group (e.g. "Official Specs", "Adopted Specs"), with each entry
  a markdown link plus an optional trailing description.
- **Not a replacement for `AGENTS.md`.** `llms.txt` is for a *site* an agent
  browses (docs, marketing, this registry); `AGENTS.md` (spec `agents-md`) is
  for a *repository* an agent works inside. A repo doesn't need both unless
  it also serves public docs.

## Links

- Canonical: https://llmstxt.org
- Our index: https://spec.w3dev.app/llms.txt
