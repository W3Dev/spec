// Directory data file for specs/ — Eleventy's directory data cascades
// recursively, so this also applies to every specs/<slug>/*.md file, not
// just files directly under specs/. We only want specs/<slug>/SPEC.md to
// render as a page, so the permalink function checks the source file and
// returns false (no output written) for anything else — e.g. a future
// specs/<slug>/notes.md must never get its own rendered page.
//
// Uses a permalink *function* (not a template string) so it doesn't depend
// on any template-engine preprocessing being enabled for markdown files.
export default {
  layout: "spec.njk",
  permalink: (data) =>
    data.page.inputPath.endsWith("/SPEC.md") ? `/specs/${data.id}/` : false,
};
