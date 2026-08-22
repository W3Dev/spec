---
id: mcp
title: Model Context Protocol
status: official
number: "0003"
maturity: stable
owner: w3dev
updated: "2026-08-22"
adopted_date: "2026-08-22"
canonical_url: https://modelcontextprotocol.io
version: "2026-07-28"
tags: [ai-agents, protocol, api]
summary: "Open JSON-RPC protocol standardizing how LLM applications connect to external tools, data sources, and prompts."
---

## What it is

The Model Context Protocol (MCP) is an open protocol that standardizes how
LLM applications (hosts) connect to external context and capabilities through
clients and servers, using JSON-RPC 2.0 messages. It defines three roles —
**hosts** (the LLM application), **clients** (connectors within the host),
and **servers** (services exposing capabilities) — and three core server
features: **resources** (data for the model or user), **prompts** (templated
workflows), and **tools** (functions the model can invoke). Clients may in
turn offer servers **elicitation** (requesting more information from the
user).

MCP is versioned by dated spec revisions; the current revision is
`2026-07-28`, which introduced a stateless protocol core, multi-round-trip
requests, header-based routing, cacheable list results, authorization
hardening, and a formal extensions framework (e.g. long-running task
extensions, MCP Apps for interactive UI).

## Why we adopted this

- **One integration surface.** Instead of every w3dev tool or data source
  needing a bespoke integration per AI client, MCP gives us a single protocol
  that Claude Code, the Claude API, and other MCP-aware clients all speak.
- **Decouples tools from models.** A server exposing tools/data over MCP works
  with any conformant client — swapping or adding an AI client doesn't
  require rewriting the integration.
- **Security model built in.** The spec bakes in explicit user-consent
  requirements for data access and tool invocation, which matches how w3dev
  expects agent tooling to behave by default.

## w3dev-specific notes

- **Track the dated revision.** MCP specs are dated, not semver'd. When we
  pin an MCP server or SDK version, record the spec revision it implements
  (e.g. `2026-07-28`) alongside it, not just a package version.
- **Prefer Tier 1 SDKs.** Use the official SDKs for the language a server is
  written in rather than hand-rolling JSON-RPC framing.
- **Tool descriptions from untrusted servers are untrusted input.** Per the
  spec's trust model, don't let a server's self-reported tool annotations
  substitute for our own review of what a tool actually does before granting
  it access to sensitive data.

## Links

- Canonical: https://modelcontextprotocol.io
- Current spec revision: https://modelcontextprotocol.io/specification/2026-07-28
- Releases: https://github.com/modelcontextprotocol/modelcontextprotocol/releases
