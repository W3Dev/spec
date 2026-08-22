// Generates a redirect stub at /specs/<slug>/ for every archived spec, so
// old /specs/<slug>/ URLs never 404 once a spec moves to archive/<slug>/.
// Paginates over the archive collection (one output file per archived
// spec); produces zero files when nothing is archived.
//
// Safe by construction: a slug can only reach here via the archive
// collection (archive/<slug>/SPEC.md), and
// scripts/validate-frontmatter.mjs refuses to let the same slug exist
// under both specs/ and archive/ — so this can never overwrite an active
// spec's real /specs/<slug>/ page.
export default class {
  data() {
    return {
      pagination: {
        data: "collections.archive",
        size: 1,
        alias: "spec",
      },
      eleventyExcludeFromCollections: true,
      permalink: (data) => `/specs/${data.spec.data.id}/`,
    };
  }

  render({ spec }) {
    const id = spec.data.id;
    const target = `/archive/${id}/`;
    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Archived · Specs Directory</title>
<meta http-equiv="refresh" content="0; url=${target}">
<link rel="canonical" href="${target}">
</head>
<body>
<p>This spec has been archived and moved to <a href="${target}">${target}</a>.</p>
</body>
</html>
`;
  }
}
