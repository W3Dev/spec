#!/usr/bin/env node
// Validates frontmatter of every specs/*.md file against schema/spec-frontmatter.schema.json.
// Also checks that frontmatter.id === filename (without .md).
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

let specFiles = [];
try {
  specFiles = readdirSync(specsDir).filter((f) => f.endsWith(".md"));
} catch (err) {
  console.error(`Could not read specs directory at ${specsDir}: ${err.message}`);
  process.exit(1);
}

if (specFiles.length === 0) {
  console.warn(`No spec files found in ${specsDir}.`);
}

let hasErrors = false;

for (const filename of specFiles.sort()) {
  const filePath = path.join(specsDir, filename);
  const slug = filename.replace(/\.md$/, "");
  const raw = readFileSync(filePath, "utf8");

  let frontmatter;
  try {
    ({ data: frontmatter } = matter(raw));
  } catch (err) {
    console.error(`✗ ${filename}\n  - could not parse frontmatter: ${err.message}`);
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
    errors.push(`id "${frontmatter.id}" does not match filename "${slug}"`);
  }

  if (errors.length > 0) {
    hasErrors = true;
    console.error(`✗ ${filename}`);
    for (const e of errors) {
      console.error(`  - ${e}`);
    }
  } else {
    console.log(`✓ ${filename}`);
  }
}

if (hasErrors) {
  console.error("\nvalidation failed");
  process.exit(1);
} else {
  console.log(`\nvalidation passed (${specFiles.length} spec${specFiles.length === 1 ? "" : "s"})`);
}
