#!/usr/bin/env node
//
// Fails if a plugin's per-host manifests (Claude/Codex/Cursor) or its MCP
// server config files have drifted out of sync with each other.
//
// This repo has hit exactly that drift before: a domain rename that had to
// be applied "everywhere" (c566137), and a sandbox MCP server that was added
// to one config and reverted from another a commit later (e229d89/344417f).

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pluginsDir = join(root, "plugins");

const MANIFEST_NAMES = [
  ".claude-plugin/plugin.json",
  ".codex-plugin/plugin.json",
  ".cursor-plugin/plugin.json",
];
const SYNCED_FIELDS = ["version", "description"];

const colors = { red: "\x1b[31m", green: "\x1b[32m", reset: "\x1b[0m" };
let failed = false;

const relative = (path) => (path.startsWith(root) ? path.slice(root.length + 1) : path);
const ok = (msg) => console.log(`  ${colors.green}✓ ${msg}${colors.reset}`);
const error = (msg) => {
  console.log(`  ${colors.red}✗ ${msg}${colors.reset}`);
  failed = true;
};
const note = (msg) => console.log(`  ${msg}`);
const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));
const sameValue = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const pluginNames = readdirSync(pluginsDir).filter((name) =>
  statSync(join(pluginsDir, name)).isDirectory(),
);

for (const pluginName of pluginNames) {
  const pluginDir = join(pluginsDir, pluginName);
  console.log(`== ${pluginName} ==`);

  const manifestPaths = MANIFEST_NAMES.map((name) => join(pluginDir, name)).filter(existsSync);

  if (manifestPaths.length < 2) {
    note("only one manifest found, nothing to compare");
    console.log();
    continue;
  }

  const manifests = new Map();
  for (const path of manifestPaths) {
    try {
      manifests.set(path, readJson(path));
    } catch (err) {
      error(`${relative(path)} is not valid JSON: ${err.message}`);
    }
  }

  for (const field of SYNCED_FIELDS) {
    const values = manifestPaths.map((path) => [path, manifests.get(path)?.[field]]);
    const refValue = values[0][1];
    const mismatched = values.some(([, v]) => !sameValue(v, refValue));
    if (mismatched) {
      error(`"${field}" differs across manifests:`);
      for (const [path, v] of values) note(`    ${relative(path)}: ${JSON.stringify(v)}`);
    } else {
      ok(`"${field}" matches across ${manifestPaths.length} manifests (${JSON.stringify(refValue)})`);
    }
  }

  const keywordSets = manifestPaths.map((path) => [path, [...(manifests.get(path)?.keywords ?? [])].sort()]);
  const refKeywords = keywordSets[0][1];
  const keywordsMismatched = keywordSets.some(([, v]) => !sameValue(v, refKeywords));
  if (keywordsMismatched) {
    error(`"keywords" differ across manifests (order-independent compare):`);
    for (const [path] of keywordSets) {
      note(`    ${relative(path)}: ${JSON.stringify(manifests.get(path)?.keywords ?? [])}`);
    }
  } else {
    ok(`"keywords" match across ${manifestPaths.length} manifests`);
  }

  const mcpConfigPaths = new Set();
  for (const path of manifestPaths) {
    const ref = manifests.get(path)?.mcpServers;
    if (ref) mcpConfigPaths.add(resolve(pluginDir, ref));
  }

  if (mcpConfigPaths.size > 1) {
    const entries = [...mcpConfigPaths].map((path) => {
      if (!existsSync(path)) {
        error(`MCP config ${relative(path)} is referenced but does not exist`);
        return [path, null];
      }
      const servers = readJson(path).mcpServers ?? {};
      const normalized = Object.keys(servers)
        .sort()
        .map((key) => ({ key, url: servers[key]?.url }));
      return [path, normalized];
    });
    const refEntry = entries.find(([, v]) => v !== null);
    const refServers = refEntry?.[1];
    const serversMismatched = entries.some(([, v]) => v !== null && !sameValue(v, refServers));
    if (serversMismatched) {
      error("MCP server URLs differ across config files:");
      for (const [path, v] of entries) {
        if (v !== null) note(`    ${relative(path)}: ${JSON.stringify(v)}`);
      }
    } else if (refServers) {
      ok(`MCP server URLs match across ${mcpConfigPaths.size} config files (${[...mcpConfigPaths].map(relative).join(", ")})`);
    }
  }

  console.log();
}

if (failed) {
  console.log("Manifest consistency check FAILED");
  process.exit(1);
}
console.log("All plugin manifests are consistent.");
