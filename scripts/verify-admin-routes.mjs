#!/usr/bin/env node
/*
  Verifies that all sidebar links under /admin point to existing Next.js routes
  and that route files exist for those links. It also reports routes that exist
  but are not linked in the sidebar.

  How it works:
  - Reads app/(protected)/admin/layout/AppSidebar.tsx and extracts all paths in code as path: "..."
  - Recursively scans app/(protected)/admin/**/page.tsx, converts filesystem paths to URL paths
    (stripping Next.js route groups like (others-pages))
  - Compares the sets and prints a report. Exits with code 1 if missing routes are found.
*/

import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const adminDir = path.join(projectRoot, "app", "(protected)", "admin");
const sidebarFile = path.join(adminDir, "layout", "AppSidebar.tsx");

/** Recursively collect file paths matching a predicate */
function walk(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walk(full));
    else results.push(full);
  }
  return results;
}

/** Convert a file path under adminDir to its URL path, removing route groups */
function filePathToUrl(filePath) {
  // Only process page.tsx files
  if (!filePath.endsWith(path.sep + "page.tsx")) return null;
  const rel = path.relative(adminDir, filePath); // e.g. (others-pages)\\calendar\\page.tsx
  const withoutPage = rel.replace(new RegExp(`[\\\\/]page\\.tsx$`), "");
  const segments = withoutPage
    .split(path.sep)
    .filter(Boolean)
    // drop route group segments like (others-pages)
    .filter((seg) => !(seg.startsWith("(") && seg.endsWith(")")));
  const url = "/admin" + (segments.length ? "/" + segments.join("/") : "");
  return url || "/admin";
}

/** Extract all paths from the sidebar TSX source using a simple regex */
function extractSidebarPaths(tsx) {
  const re = /path\s*:\s*["'`]([^"'`]+)["'`]/g;
  const paths = new Set();
  let match;
  while ((match = re.exec(tsx))) {
    const p = match[1];
    if (p && p.startsWith("/admin")) paths.add(p);
  }
  return paths;
}

function main() {
  if (!fs.existsSync(adminDir)) {
    console.error(`Admin directory not found: ${adminDir}`);
    process.exit(1);
  }
  if (!fs.existsSync(sidebarFile)) {
    console.error(`Sidebar file not found: ${sidebarFile}`);
    process.exit(1);
  }
  const tsx = fs.readFileSync(sidebarFile, "utf8");
  const sidebarPaths = extractSidebarPaths(tsx);

  const files = walk(adminDir);
  const routeUrls = new Set();
  for (const f of files) {
    if (f.endsWith(path.sep + "page.tsx")) {
      const url = filePathToUrl(f);
      if (url) routeUrls.add(url);
    }
  }

  // Compare
  const missing = [...sidebarPaths].filter((p) => !routeUrls.has(p));
  const unlinked = [...routeUrls].filter((u) => !sidebarPaths.has(u));

  console.log("Sidebar paths (admin):", sidebarPaths.size);
  console.log("Admin route pages:", routeUrls.size);
  if (missing.length) {
    console.log("\nMissing routes (linked in sidebar but no page.tsx found):");
    for (const m of missing) console.log(" -", m);
  } else {
    console.log("\nNo missing routes for sidebar links.");
  }

  if (unlinked.length) {
    console.log("\nUnlinked admin routes (have page.tsx but not linked in sidebar):");
    for (const u of unlinked) console.log(" -", u);
  } else {
    console.log("\nAll admin routes are represented in the sidebar (or there are no extra routes).");
  }

  if (missing.length) process.exit(1);
}

main();
