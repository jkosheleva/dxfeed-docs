import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";

const distDir = resolve("dist");
const siteOrigin = "https://jkosheleva.github.io";
const siteBase = "/dxfeed-docs";

if (!existsSync(distDir)) {
  console.error("dist/ does not exist. Run `npm run build` first.");
  process.exit(1);
}

function walk(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function routeForFile(file) {
  const outputPath = relative(distDir, file).split(sep).join("/");
  if (outputPath === "index.html") return "/";
  if (outputPath.endsWith("/index.html")) {
    return `/${outputPath.slice(0, -"index.html".length)}`;
  }
  return `/${outputPath}`;
}

function targetFile(pathname) {
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    return undefined;
  }

  if (decodedPath === siteBase) {
    decodedPath = "/";
  } else if (decodedPath.startsWith(`${siteBase}/`)) {
    decodedPath = decodedPath.slice(siteBase.length);
  }

  const relativePath = decodedPath.replace(/^\/+/, "");
  const directPath = join(distDir, relativePath);
  const candidates = decodedPath.endsWith("/")
    ? [
        join(directPath, "index.html"),
        `${directPath.slice(0, -1)}.html`,
      ]
    : [
        directPath,
        join(directPath, "index.html"),
        `${directPath}.html`,
      ];

  return candidates.find((candidate) => {
    return existsSync(candidate) && statSync(candidate).isFile();
  });
}

const htmlFiles = walk(distDir).filter((file) => file.endsWith(".html"));
const idCache = new Map();
const failures = [];

function idsFor(file) {
  if (idCache.has(file)) return idCache.get(file);
  const html = readFileSync(file, "utf8");
  const ids = new Set();
  for (const match of html.matchAll(/\s(?:id|name)=["']([^"']+)["']/g)) {
    ids.add(match[1]);
  }
  idCache.set(file, ids);
  return ids;
}

for (const file of htmlFiles) {
  const sourceRoute = routeForFile(file);
  const html = readFileSync(file, "utf8");
  const references = html.matchAll(/\s(?:href|src)=["']([^"']+)["']/g);

  for (const match of references) {
    const rawReference = match[1].replaceAll("&amp;", "&").trim();
    if (
      !rawReference ||
      rawReference.startsWith("data:") ||
      rawReference.startsWith("mailto:") ||
      rawReference.startsWith("tel:") ||
      rawReference.startsWith("javascript:")
    ) {
      continue;
    }

    let url;
    try {
      url = new URL(rawReference, `${siteOrigin}${siteBase}${sourceRoute}`);
    } catch {
      failures.push(`${sourceRoute} -> invalid URL: ${rawReference}`);
      continue;
    }

    if (url.origin !== siteOrigin) continue;

    const target = targetFile(url.pathname);
    if (!target) {
      failures.push(`${sourceRoute} -> missing path: ${rawReference}`);
      continue;
    }

    if (url.hash && target.endsWith(".html")) {
      let fragment;
      try {
        fragment = decodeURIComponent(url.hash.slice(1));
      } catch {
        failures.push(`${sourceRoute} -> invalid fragment: ${rawReference}`);
        continue;
      }
      if (fragment && !idsFor(target).has(fragment)) {
        failures.push(`${sourceRoute} -> missing fragment: ${rawReference}`);
      }
    }
  }
}

const uniqueFailures = [...new Set(failures)].sort();
if (uniqueFailures.length > 0) {
  console.error(`Found ${uniqueFailures.length} broken internal link(s):`);
  for (const failure of uniqueFailures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Checked ${htmlFiles.length} HTML files: all internal links resolve.`);
