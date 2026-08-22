// Shared frontmatter -> index-entry mapping used by specs.json.11ty.js,
// archive.json.11ty.js, and llms.txt.11ty.js so all generated indexes stay
// in sync with the schema.

import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const SPEC_FIELDS = [
  "id",
  "title",
  "status",
  "summary",
  "owner",
  "updated",
  "number",
  "canonical_url",
  "version",
  "maturity",
  "tags",
  "applies_to",
  "adopted_date",
  "related",
  "supersedes",
  "superseded_by",
];

/**
 * Reduce an Eleventy page's data down to the whitelisted frontmatter fields
 * (avoids leaking Eleventy-internal data like the circular `collections`
 * object into specs.json/archive.json), plus the computed rendered/raw
 * URLs and (when a CHANGELOG.md sits next to the spec's SPEC.md on disk)
 * a changelog_url.
 *
 * `base` selects which top-level tree the spec lives under — "specs" for
 * the active registry, "archive" for archived specs — since both trees
 * share this same entry shape (see specs.json.11ty.js / archive.json.11ty.js).
 */
export function toSpecEntry(data, base = "specs") {
  const entry = {};
  for (const field of SPEC_FIELDS) {
    if (data[field] !== undefined) {
      entry[field] = data[field];
    }
  }
  entry.url = `/${base}/${data.id}/`;
  entry.raw_url = `/${base}/${data.id}/SPEC.md`;
  if (hasChangelog(data.id, base)) {
    entry.changelog_url = `/${base}/${data.id}/CHANGELOG.md`;
  }
  return entry;
}

/**
 * Whether specs/<id>/CHANGELOG.md (or archive/<id>/CHANGELOG.md) exists on
 * disk. Guards against a missing id: the specs/specs.11tydata.js and
 * archive/archive.11tydata.js directory data cascades apply the spec.njk
 * layout (which calls this filter) to *any* markdown file under
 * specs/<slug>/ or archive/<slug>/ — not just SPEC.md — e.g. a stray
 * notes.md dropped alongside CHANGELOG.md. Those never get an `id` and
 * are never written (the permalink function returns false for them), but
 * they still render through the layout, so this must not throw.
 */
export function hasChangelog(id, base = "specs") {
  if (!id) return false;
  return existsSync(path.join(repoRoot, base, id, "CHANGELOG.md"));
}
