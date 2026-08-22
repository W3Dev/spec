// Directory data file for archive/ — mirrors specs/specs.11tydata.js. The
// Eleventy directory data cascade applies this recursively to every
// archive/<slug>/*.md file, so the permalink function is scoped to
// SPEC.md only (same reasoning as specs/specs.11tydata.js: a future
// archive/<slug>/notes.md must never get its own rendered page).
//
// Reuses the spec.njk layout — spec.njk branches on `archived` (set here)
// to render the "this spec is archived" banner and point raw/changelog
// links at /archive/<slug>/ instead of /specs/<slug>/.
export default {
  layout: "spec.njk",
  archived: true,
  permalink: (data) =>
    data.page.inputPath.endsWith("/SPEC.md") ? `/archive/${data.id}/` : false,
};
