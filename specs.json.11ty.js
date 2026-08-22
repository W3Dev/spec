import { toSpecEntry } from "./lib/spec-fields.mjs";

// Generates /specs.json: a machine-readable index of every spec's
// frontmatter plus its rendered url and raw_url. Never hand-maintained —
// this template is the single source that builds it from the specs
// collection.
export default class {
  data() {
    return {
      permalink: "specs.json",
      eleventyExcludeFromCollections: true,
    };
  }

  render({ collections }) {
    const entries = collections.specs.map((item) => toSpecEntry(item.data));
    return JSON.stringify(entries, null, 2);
  }
}
