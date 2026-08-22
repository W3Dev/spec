# Specs Directory

A registry of software specifications adopted or tracked by w3dev, published
as a static site at **https://spec.w3dev.app**.

One spec = one directory: `specs/<slug>/SPEC.md` holds the markdown file
with structured frontmatter, plus any optional reference files (diagrams,
examples, etc.) alongside it in that same directory. The site (built with
[Eleventy](https://www.11ty.dev/)) renders `SPEC.md` as a human page, and
also exposes it — and the whole registry — in machine-readable form so
agents and tooling can consume it directly.

## URL contract

| URL | Contents |
| --- | --- |
| `/` | Landing page — the registry list |
| `/specs/<slug>/` | Rendered HTML page for one spec |
| `/specs/<slug>/SPEC.md` | The raw markdown source, byte-for-byte (for `curl`, agents, diffing) |
| `/specs/<slug>/<file>` | Any reference/asset file bundled alongside that spec (copied through as-is) |
| `/specs.json` | Machine-readable index: every spec's frontmatter plus `url` and `raw_url` |
| `/llms.txt` | [llms.txt](https://llmstxt.org/)-convention plain-text index: title, one-line summary, link |

`specs.json` and `llms.txt` are **generated** by Eleventy templates
(`specs.json.11ty.js`, `llms.txt.11ty.js`) from the `specs` collection —
never hand-edit them.

## Adding a spec

1. Create `specs/<slug>/SPEC.md`, where `<slug>` is a kebab-case id
   (`^[a-z0-9]+(-[a-z0-9]+)*$`) — the directory name must equal the
   frontmatter `id`.
2. Fill in frontmatter per the reference below.
   `specs/conventional-commits/SPEC.md` is the canonical example — copy its
   shape.
3. Write the body in markdown. There are no required sections, but new specs
   generally cover: what it is, why w3dev adopted it, any w3dev-specific
   notes/deviations, and how it's enforced. Drop any reference files
   (diagrams, examples) the spec needs into the same directory alongside
   `SPEC.md` — they're copied through to `/specs/<slug>/<file>` as-is.
4. Run `pnpm validate` — it must pass before you open a PR.
5. Open a PR. CI runs `pnpm validate` and `pnpm build` on every PR; merging
   to `main` deploys automatically (see below).

### Frontmatter reference

Schema lives at `schema/spec-frontmatter.schema.json` (JSON Schema, draft
2020-12) — it's the source of truth; this table is a summary.

**Required**

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Kebab-case, must equal the filename |
| `title` | string | |
| `status` | enum | `official`, `unofficial`, `draft`, `adopted`, `deprecated` |
| `summary` | string | ≤160 chars |
| `owner` | string | |
| `updated` | date | ISO 8601 (`YYYY-MM-DD`) |

**Optional**

| Field | Type | Notes |
| --- | --- | --- |
| `number` | string | e.g. `"0007"` |
| `canonical_url` | string (uri) | Link to the upstream spec, if any |
| `version` | string | |
| `maturity` | enum | `experimental`, `stable`, `legacy` |
| `tags` | string[] | |
| `applies_to` | string[] | |
| `adopted_date` | date | ISO 8601 |
| `related` | string[] | Other spec ids |
| `supersedes` | string | Spec id this replaces |
| `superseded_by` | string | Spec id that replaces this one |

Status lives in frontmatter only — never encode status in the directory
name. Each spec gets exactly one directory (`specs/<slug>/`) holding
`SPEC.md` plus its own reference files; don't nest specs or add per-status
subfolders.

> **Quote date values.** Write `updated: "2026-08-22"`, not
> `updated: 2026-08-22`. Unquoted, YAML parses it as a native date and it
> stops being the plain `YYYY-MM-DD` string the schema and templates expect.

## Versioning & archive

- **Version pin.** Frontmatter `version` is the single source of truth for
  the revision/version a spec currently follows (a dated revision, e.g.
  MCP's `2026-07-28`, or a semver string). `SPEC.md` describes only the
  current state — no version-history section in the body.
- **CHANGELOG.md.** History lives in an optional sibling
  `specs/<slug>/CHANGELOG.md`, in
  [Keep a Changelog](https://keepachangelog.com) format. Add one the first
  time a spec's `version` pin moves — every entry is self-contained
  (written as if its links might die) plus a link to the commit/PR
  (internal specs) or the upstream dated revision (external standards).
  Served raw at `/specs/<slug>/CHANGELOG.md`; `specs.json` gains a
  `changelog_url` for any spec that has one. A bump that needs more than a
  changelog entry gets a runbook at
  `specs/<slug>/references/migration-<old>-to-<new>.md`, linked from the
  entry.
- **Archive.** `specs/` holds only current, followed specs. To retire one:
  `git mv specs/<slug> archive/<slug>` (mirrors the `specs/` layout), set
  `status: deprecated` (+ `superseded_by` if something replaces it), and
  add a final `CHANGELOG.md` entry. Archived specs render at
  `/archive/<slug>/` with an Archived banner; the old `/specs/<slug>/` URL
  becomes a redirect stub, never a 404; `/archive.json` lists them;
  `llms.txt` gains an Archive section once non-empty.
- **Generational breaks vs. bumps.** A spec whose contract is rewritten
  wholesale (not just revised) is a new spec id using
  `supersedes`/`superseded_by` — not a changelog entry on the old id.
  In-place revisions and semver-style bumps stay the same spec id and get a
  `CHANGELOG.md` entry instead.

See [`spec-versioning`](specs/spec-versioning/SPEC.md) for the full
convention.

## Local development

```sh
pnpm install
pnpm dev       # eleventy --serve, local preview with rebuild-on-save
pnpm build     # build the static site into _site/
pnpm validate  # validate every spec's frontmatter against the schema
```

## Deployment

The **only** deploy path is GitHub Actions → GitHub Pages
(`.github/workflows/deploy.yml`). Do not deploy by hand.

- On every pull request: install deps, `pnpm validate`, `pnpm build`.
- On push to `main`: the same, then the built `_site/` is uploaded and
  deployed via `actions/configure-pages`, `actions/upload-pages-artifact`,
  and `actions/deploy-pages`.

### One-time setup

1. In the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.
2. Set the custom domain to `spec.w3dev.app` in the same Pages settings
   panel (this writes a `CNAME` file into the deployment automatically).
3. In your DNS provider, add a `CNAME` record: `spec.w3dev.app` →
   `<org>.github.io`.
