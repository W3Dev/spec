// Directory data file for specs/ — applies to every specs/*.md file.
// Uses a permalink *function* (not a template string) so it doesn't depend
// on any template-engine preprocessing being enabled for markdown files.
export default {
  layout: "spec.njk",
  permalink: (data) => `/specs/${data.id}/`,
};
