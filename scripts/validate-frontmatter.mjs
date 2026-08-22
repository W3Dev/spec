#!/usr/bin/env node
// Validates frontmatter of every specs/*/SPEC.md and archive/*/SPEC.md file
// against schema/spec-frontmatter.schema.json. Also checks:
//   - frontmatter.id === the spec's parent directory name
//   - specs/ specs are never status "deprecated" (that's what archive/ is for)
//   - archive/ specs are always status "deprecated"
//   - a slug never exists in both specs/ and archive/ at once (that would
//     make the /specs/<slug>/ redirect stub eleventy generates for an
//     archived spec collide with a real active spec page)
// Exits 1 if any file fails validation.

import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import matter from "gray-matter";
// The schema declares "$schema": draft 2020-12, so we need the 2020 build —
// the default `Ajv` export only understands draft-07.
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const schemaPath = path.join(repoRoot, "schema", "spec-frontmatter.schema.json");

const schema = JSON.parse(readFileSync(schemaPath, "utf8"));

const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validate = ajv.compile(schema);

function readSlugs(dir) {
  try {
    return readdirSync(dir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();
  } catch (err) {
    console.error(`Could not read directory at ${dir}: ${err.message}`);
    process.exit(1);
  }
}

// Validates every <treeDir>/<slug>/SPEC.md. `enforceStatus` is either
// "deprecated" (archive/ — must be exactly this) or "not-deprecated"
// (specs/ — must not be this). Returns { slugs, hasErrors }.
function validateTree(treeName, treeDir, enforceStatus) {
  const slugs = readSlugs(treeDir);
  let hasErrors = false;

  for (const slug of slugs) {
    const relPath = path.join(treeName, slug, "SPEC.md");
    const filePath = path.join(treeDir, slug, "SPEC.md");

    let raw;
    try {
      raw = readFileSync(filePath, "utf8");
    } catch (err) {
      console.error(`✗ ${relPath}\n  - could not read file: ${err.message}`);
      hasErrors = true;
      continue;
    }

    let frontmatter;
    try {
      ({ data: frontmatter } = matter(raw));
    } catch (err) {
      console.error(`✗ ${relPath}\n  - could not parse frontmatter: ${err.message}`);
      hasErrors = true;
      continue;
    }

    const errors = [];

    const valid = validate(frontmatter);
    if (!valid) {
      for (const e of validate.errors) {
        const location = e.instancePath ? e.instancePath.replace(/^\//, "") : "(root)";
        errors.push(`${location}: ${e.message}`);
      }
    }

    if (frontmatter.id !== undefined && frontmatter.id !== slug) {
      errors.push(`id "${frontmatter.id}" does not match directory "${slug}"`);
    }

    if (enforceStatus === "deprecated" && frontmatter.status !== "deprecated") {
      errors.push(
        `archive/ specs must have status "deprecated", got ${JSON.stringify(frontmatter.status)}`
      );
    }
    if (enforceStatus === "not-deprecated" && frontmatter.status === "deprecated") {
      errors.push(`specs/ specs must not have status "deprecated" — move it to archive/ instead`);
    }

    if (errors.length > 0) {
      hasErrors = true;
      console.error(`✗ ${relPath}`);
      for (const e of errors) {
        console.error(`  - ${e}`);
      }
    } else {
      console.log(`✓ ${relPath}`);
    }
  }

  return { slugs, hasErrors };
}

const specsDir = path.join(repoRoot, "specs");
const archiveDir = path.join(repoRoot, "archive");

const specsResult = validateTree("specs", specsDir, "not-deprecated");
const archiveResult = validateTree("archive", archiveDir, "deprecated");

if (specsResult.slugs.length === 0) {
  console.warn(`No spec directories found in ${specsDir}.`);
}

let hasErrors = specsResult.hasErrors || archiveResult.hasErrors;

// A slug must not exist under both trees at once.
const archiveSlugSet = new Set(archiveResult.slugs);
const dupes = specsResult.slugs.filter((slug) => archiveSlugSet.has(slug));
if (dupes.length > 0) {
  hasErrors = true;
  for (const slug of dupes) {
    console.error(
      `✗ "${slug}" exists in both specs/ and archive/ — a slug must live in exactly one tree`
    );
  }
}

if (hasErrors) {
  console.error("\nvalidation failed");
  process.exit(1);
} else {
  console.log(
    `\nvalidation passed (${specsResult.slugs.length} active spec${specsResult.slugs.length === 1 ? "" : "s"}, ${archiveResult.slugs.length} archived spec${archiveResult.slugs.length === 1 ? "" : "s"})`
  );
}
