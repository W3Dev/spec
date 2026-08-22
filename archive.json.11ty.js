import { toSpecEntry } from "./lib/spec-fields.mjs";

// Generates /archive.json: same entry shape as specs.json (see
// specs.json.11ty.js) but for the archive collection — url/raw_url point
// at /archive/<slug>/ instead of /specs/<slug>/. Never hand-maintained.
// Empty array when nothing is archived.
export default class {
  data() {
    return {
      permalink: "archive.json",
      eleventyExcludeFromCollections: true,
    };
  }

  render({ collections }) {
    const entries = collections.archive.map((item) => toSpecEntry(item.data, "archive"));
    return JSON.stringify(entries, null, 2);
  }
}
