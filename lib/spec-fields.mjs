// Shared frontmatter -> index-entry mapping used by specs.json.11ty.js and
// llms.txt.11ty.js so both generated indexes stay in sync with the schema.

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
 * object into specs.json), plus the computed rendered/raw URLs.
 */
export function toSpecEntry(data) {
  const entry = {};
  for (const field of SPEC_FIELDS) {
    if (data[field] !== undefined) {
      entry[field] = data[field];
    }
  }
  entry.url = `/specs/${data.id}/`;
  entry.raw_url = `/specs/${data.id}.md`;
  return entry;
}
