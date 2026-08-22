#!/usr/bin/env node
// Validates frontmatter of every specs/*/SPEC.md file against schema/spec-frontmatter.schema.json.
// Also checks that frontmatter.id === the spec's parent directory name.
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
const specsDir = path.join(repoRoot, "specs");
const schemaPath = path.join(repoRoot, "schema", "spec-frontmatter.schema.json");

const schema = JSON.parse(readFileSync(schemaPath, "utf8"));

const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validate = ajv.compile(schema);

let specSlugs = [];
try {
  specSlugs = readdirSync(specsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
} catch (err) {
  console.error(`Could not read specs directory at ${specsDir}: ${err.message}`);
  process.exit(1);
}

if (specSlugs.length === 0) {
  console.warn(`No spec directories found in ${specsDir}.`);
}

let hasErrors = false;

for (const slug of specSlugs.sort()) {
  const relPath = path.join("specs", slug, "SPEC.md");
  const filePath = path.join(specsDir, slug, "SPEC.md");

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

if (hasErrors) {
  console.error("\nvalidation failed");
  process.exit(1);
} else {
  console.log(`\nvalidation passed (${specSlugs.length} spec${specSlugs.length === 1 ? "" : "s"})`);
}
