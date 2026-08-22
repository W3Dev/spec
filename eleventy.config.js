import { toSpecEntry } from "./lib/spec-fields.mjs";

// Days-per-unit thresholds for the humanized "updated" column on the
// registry table (server-rendered at build time — see relativeDate below).
const DAY_MS = 86400000;

function relativeDate(dateStr) {
  if (!dateStr) return "";
  const then = new Date(`${dateStr}T00:00:00Z`);
  if (Number.isNaN(then.getTime())) return dateStr;
  const now = new Date();
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const at = Date.UTC(then.getUTCFullYear(), then.getUTCMonth(), then.getUTCDate());
  const days = Math.round((today - at) / DAY_MS);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 0) return dateStr;
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.round(days / 30)}mo ago`;
  return `${Math.round(days / 365)}y ago`;
}

export default function (eleventyConfig) {
  // Raw markdown source must be served byte-for-byte at /specs/<slug>.md
  // (separate from the rendered /specs/<slug>/ page built from the same file).
  eleventyConfig.addPassthroughCopy("specs/*.md");

  // Static, hand-authored CSS/JS — no bundler, passthrough-copied as-is.
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");

  // Repo documentation, not a site page.
  eleventyConfig.ignores.add("./README.md");

  // Collection of every spec, driven purely by frontmatter — no subfolders.
  eleventyConfig.addCollection("specs", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("specs/*.md")
      .sort((a, b) => a.data.id.localeCompare(b.data.id))
  );

  // Expose the shared frontmatter -> index-entry mapper to templates
  // (used by specs.json.11ty.js and llms.txt.11ty.js, but handy elsewhere too).
  eleventyConfig.addFilter("toSpecEntry", toSpecEntry);

  // Humanizes an ISO date ("2026-08-20" -> "2d ago") for the registry table;
  // computed once at build time, not in the browser.
  eleventyConfig.addFilter("relativeDate", relativeDate);

  // Small collection helpers for the landing page's identity strip / tag chips —
  // kept as filters (rather than inline Nunjucks loops) because {% set %}
  // inside a {% for %} doesn't escape the loop's scope in Nunjucks.
  eleventyConfig.addFilter("whereStatus", (specs, status) =>
    specs.filter((s) => s.data.status === status)
  );
  eleventyConfig.addFilter("collectTags", (specs) => {
    const tags = new Set();
    for (const s of specs) {
      for (const t of s.data.tags || []) tags.add(t);
    }
    return Array.from(tags).sort();
  });

  // Build-time "last sync" date shown in the footer, ISO (YYYY-MM-DD).
  eleventyConfig.addGlobalData("buildDate", () => new Date().toISOString().slice(0, 10));

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["md", "njk", "11ty.js"],
    htmlTemplateEngine: "njk",
    // Spec bodies are plain markdown; don't run them through Nunjucks so
    // literal `{{ }}` / `{% %}` in code samples can't be misinterpreted.
    markdownTemplateEngine: false,
  };
}
