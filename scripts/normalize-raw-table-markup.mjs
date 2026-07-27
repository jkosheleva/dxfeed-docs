import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const docsDir = resolve("src/content/docs");
const allowedHtmlTags = new Set([
  "a",
  "br",
  "code",
  "em",
  "strong",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "tr",
]);

function walk(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function normalizeTable(block) {
  return block
    .replace(
      /\[([^\]]+)\]\(([^)\s]+)\)/g,
      '<a href="$2">$1</a>',
    )
    .replace(/\*\*_([^*<>]+)_\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*([^*<>]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`\n]+)`/g, "<code>$1</code>")
    .replace(/<\/?([A-Za-z][\w-]*)(?:\s[^<>]*?)?>/g, (tag, name) => {
      if (allowedHtmlTags.has(name.toLowerCase())) return tag;
      return tag.replace("<", "&lt;").replace(">", "&gt;");
    });
}

let changedFiles = 0;
for (const file of walk(docsDir).filter((path) => path.endsWith(".md"))) {
  const source = readFileSync(file, "utf8");
  const normalized = source.replace(/<table>[\s\S]*?<\/table>/g, normalizeTable);
  if (normalized !== source) {
    writeFileSync(file, normalized);
    changedFiles += 1;
  }
}

console.log(`Normalized raw table markup in ${changedFiles} file(s).`);
