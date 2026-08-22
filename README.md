# w3dev specs

A registry of software specifications adopted or tracked by w3dev, published
as a static site at **https://spec.w3dev.app**.

Each spec is a single markdown file with structured frontmatter. The site
(built with [Eleventy](https://www.11ty.dev/)) renders that file as a human
page, and also exposes it — and the whole registry — in machine-readable
form so agents and tooling can consume it directly.

## URL contract

| URL | Contents |
| --- | --- |
| `/` | Landing page — the registry list |
| `/specs/<slug>/` | Rendered HTML page for one spec |
| `/specs/<slug>.md` | The raw markdown source, byte-for-byte (for `curl`, agents, diffing) |
| `/specs.json` | Machine-readable index: every spec's frontmatter plus `url` and `raw_url` |
| `/llms.txt` | [llms.txt](https://llmstxt.org/)-convention plain-text index: title, one-line summary, link |

`specs.json` and `llms.txt` are **generated** by Eleventy templates
(`specs.json.11ty.js`, `llms.txt.11ty.js`) from the `specs` collection —
never hand-edit them.

## Adding a spec

1. Create `specs/<slug>.md`, where `<slug>` is a kebab-case id
   (`^[a-z0-9]+(-[a-z0-9]+)*$`) — the filename must equal the frontmatter
   `id`.
2. Fill in frontmatter per the reference below. `specs/conventional-commits.md`
   is the canonical example — copy its shape.
3. Write the body in markdown. There are no required sections, but new specs
   generally cover: what it is, why w3dev adopted it, any w3dev-specific
   notes/deviations, and how it's enforced.
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

Status lives in frontmatter only — content is flat (`specs/<slug>.md`, no
subfolders); never encode status in directory structure.

> **Quote date values.** Write `updated: "2026-08-22"`, not
> `updated: 2026-08-22`. Unquoted, YAML parses it as a native date and it
> stops being the plain `YYYY-MM-DD` string the schema and templates expect.

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
