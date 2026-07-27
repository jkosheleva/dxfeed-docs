import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const docsDir = resolve("src/content/docs");
const failures = [];

function walk(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

for (const file of walk(docsDir).filter((path) => path.endsWith(".md"))) {
  const source = readFileSync(file, "utf8");
  const displayName = relative(process.cwd(), file);

  source.split("\n").forEach((line, index) => {
    if (line.startsWith("|") && !line.trimEnd().endsWith("|")) {
      failures.push(`${displayName}:${index + 1}: unterminated Markdown table row`);
    }
    if (/^``` \|/.test(line)) {
      failures.push(`${displayName}:${index + 1}: malformed code fence in a table`);
    }
    if (/\]\((?:urn:resource:|\/document\/preview\/)/.test(line)) {
      failures.push(`${displayName}:${index + 1}: unresolved Paligo link`);
    }
  });

  for (const table of source.matchAll(/<table>[\s\S]*?<\/table>/g)) {
    const block = table[0];
    if (/\*\*|(?:^|[^!])\[[^\]]+\]\([^)]+\)/m.test(block)) {
      const line = source.slice(0, table.index).split("\n").length;
      failures.push(`${displayName}:${line}: Markdown markup inside a raw HTML table`);
    }
  }
}

if (failures.length > 0) {
  console.error(`Found ${failures.length} source content issue(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Source content checks passed.");

