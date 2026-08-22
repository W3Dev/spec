import { toSpecEntry } from "./lib/spec-fields.mjs";

const SITE_URL = "https://spec.w3dev.app";

// Generates /llms.txt following the llms.txt convention: a plain-text
// index of title, one-line summary, and link for every spec. Generated
// from the specs collection — never hand-maintained.
export default class {
  data() {
    return {
      permalink: "llms.txt",
      eleventyExcludeFromCollections: true,
    };
  }

  render({ collections }) {
    const entries = collections.specs.map((item) => toSpecEntry(item.data));

    const lines = [
      "# Specs Directory",
      "",
      "> Registry of software specifications tracked and adopted by w3dev.",
      "",
    ];

    for (const entry of entries) {
      lines.push(`- [${entry.title}](${SITE_URL}${entry.url}): ${entry.summary}`);
    }

    return lines.join("\n") + "\n";
  }
}
