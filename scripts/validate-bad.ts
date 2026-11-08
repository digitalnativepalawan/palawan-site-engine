// Validates scripts/bad-profile.json against resort-01 and prints field-level issues.
import fs from "node:fs";
import { validateSite } from "../packages/engine/src/validate.ts";
import { buildResort01Manifest, resort01Template } from "../packages/templates/src/resort01.ts";

const profile = JSON.parse(fs.readFileSync("scripts/bad-profile.json", "utf8"));
const manifest = buildResort01Manifest("lagoon", "editorial");
const res = validateSite(profile, manifest, { modules: { inquiry: true, booking: false }, settings: {} }, resort01Template);
console.log(`ok: ${res.ok}`);
for (const i of res.issues) console.log(`${i.path} [${i.code}]: ${i.message}`);
if (!res.ok) process.exitCode = 1;
