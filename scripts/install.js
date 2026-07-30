#!/usr/bin/env node
const fs = require("fs");
const os = require("os");
const path = require("path");

function usage() {
  console.log("\nExtract Design Kit installer\n\nUsage:\n  npx --yes extract-design-kit@latest\n  extract-design-kit --skills-dir ~/.codex/skills\n\nAfter install, pass a GitHub repository URL, a live website URL, or both.\n\nOptions:\n  --skills-dir PATH  Install into a custom Codex skills directory\n  --force            Replace an existing installed copy\n  --help             Show this help\n");
}
function expandHome(value) {
  if (value === "~") return os.homedir();
  return value && value.startsWith("~/") ? path.join(os.homedir(), value.slice(2)) : value;
}
function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") options.help = true;
    else if (arg === "--force") options.force = true;
    else if (arg === "--skills-dir") {
      const value = argv[index + 1];
      if (!value) throw new Error("--skills-dir requires a value");
      options.skillsDir = expandHome(value);
      index += 1;
    } else throw new Error(`Unknown option: ${arg}`);
  }
  return options;
}
function defaultSkillsDir() {
  return path.join(process.env.CODEX_HOME || path.join(os.homedir(), ".codex"), "skills");
}
function copyDirectory(source, destination) {
  fs.mkdirSync(destination, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name);
    const to = path.join(destination, entry.name);
    if (entry.isDirectory()) copyDirectory(from, to);
    else if (entry.isFile()) fs.copyFileSync(from, to);
  }
}
function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) return usage();
  const source = path.resolve(__dirname, "..", "extract-design-kit");
  const skillsDir = path.resolve(options.skillsDir || defaultSkillsDir());
  const destination = path.join(skillsDir, "extract-design-kit");
  if (!fs.existsSync(source)) throw new Error("Cannot find the bundled skill.");
  if (fs.existsSync(destination) && !options.force) throw new Error(`Skill already exists at ${destination}. Re-run with --force to replace it.`);
  fs.mkdirSync(skillsDir, { recursive: true });
  if (fs.existsSync(destination)) fs.rmSync(destination, { recursive: true, force: true });
  copyDirectory(source, destination);
  console.log("Installed Extract Design Kit for Codex.");
  console.log("Restart Codex, then run with a repository, live website, or both:");
  console.log("  Use $extract-design-kit to create a reusable design kit from this GitHub repository: [URL]");
  console.log("  Use $extract-design-kit to create a reusable design kit from this live website: [URL]");
}
try { main(); } catch (error) { console.error(`Error: ${error.message}`); process.exit(1); }
