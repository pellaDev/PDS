#!/usr/bin/env node

import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const REPO = "pellaDev/PDS";

function usage() {
  console.error("usage: node update.mjs <version | latest | stable> [--force]");
  console.error('  e.g. node update.mjs --1.3.1   (the "--" before a version is optional)');
  process.exit(2);
}

function die(msg) {
  console.error("update: " + msg);
  process.exit(1);
}

const raw = process.argv.slice(2);
const force = raw.includes("--force");
let target = null;
for (const a of raw) {
  const t = a.startsWith("--") ? a.slice(2) : a;
  if (t === "latest" || t === "stable" || /^v?\d+\.\d+\.\d+$/.test(t)) { target = t; break; }
}
if (!target) usage();

function git(cmd) {
  return execSync("git " + cmd, { stdio: ["ignore", "pipe", "pipe"] }).toString().trim();
}

function explicitTag(v) {
  const tag = v.startsWith("v") ? v : "v" + v;
  const out = git("ls-remote --tags origin " + tag);
  if (!out.includes("refs/tags/" + tag + "\t")) die("tag " + tag + " not found on origin - is that a released version?");
  return tag;
}

function semverCmp(a, b) {
  const pa = a.replace(/^v/, "").split(".").map(Number);
  const pb = b.replace(/^v/, "").split(".").map(Number);
  for (let i = 0; i < 3; i++) if (pa[i] !== pb[i]) return pa[i] - pb[i];
  return 0;
}

function tagFromTags(kind) {
  const out = git("ls-remote --tags origin");
  const tags = out.split("\n").map((l) => l.split(/\s+/).pop()).filter((t) => /^v\d+\.\d+\.\d+$/.test(t));
  if (!tags.length) die("no version tags found on origin");
  tags.sort(semverCmp);
  if (kind === "latest") return tags[tags.length - 1];
  const stable = tags.filter((t) => t.endsWith(".0"));
  if (!stable.length) die("no stable (vX.Y.0) tags found on origin");
  return stable[stable.length - 1];
}

async function tagFromApi(kind) {
  const res = await fetch("https://api.github.com/repos/" + REPO + "/releases?per_page=50", {
    headers: { accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error("GitHub API responded " + res.status);
  const list = (await res.json()).filter((r) => !r.draft);
  if (!list.length) throw new Error("no releases found");
  if (kind === "latest") return list[0].tag_name;
  const stable = list.find((r) => !r.prerelease);
  if (!stable) throw new Error("no stable release found yet");
  return stable.tag_name;
}

let tag;
if (/^v?\d/.test(target)) {
  tag = explicitTag(target);
} else {
  try {
    tag = await tagFromApi(target);
  } catch (e) {
    console.warn("update: GitHub API unavailable (" + e.message + "); falling back to git tags");
    tag = tagFromTags(target);
  }
}

const dirty = git("status --porcelain");
if (dirty && !force) die("working tree is dirty - commit or stash your changes first (or pass --force to discard them)");

console.log("update: fetching " + tag + " ...");
git("fetch origin --tags");

if (dirty) {
  git("reset --hard " + tag);
  git("clean -fd");
} else {
  git("checkout --detach " + tag);
}

let hasPnpm = true;
try { execSync("command -v pnpm", { stdio: "ignore" }); } catch { hasPnpm = false; }

if (existsSync("pnpm-lock.yaml") && hasPnpm) {
  console.log("update: reinstalling dependencies (pnpm install) ...");
  try {
    execSync("pnpm install", { stdio: "inherit" });
  } catch {
    console.warn("update: pnpm install failed - run it manually if needed");
  }
}

let version = tag;
try { version = JSON.parse(readFileSync("package.json", "utf8")).version || version; } catch {}
console.log("\nupdate: PDS is now at " + tag + " (package version " + version + ")");
console.log("       switch to another version anytime: node update.mjs <version | latest | stable>");
