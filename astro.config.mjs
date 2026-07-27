import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightLlmsTxt from "starlight-llms-txt";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import redirectsConfig from "./redirects.json" with { type: "json" };

const githubPagesBase = "/dxfeed-docs";
const githubPagesSite = "https://jkosheleva.github.io";

function prefixRootRelativeUrls({ base }) {
  return (tree) => {
    const visit = (node) => {
      if (node?.type === "element" && node.properties) {
        for (const property of ["href", "src"]) {
          const value = node.properties[property];
          if (
            typeof value === "string" &&
            value.startsWith("/") &&
            !value.startsWith("//") &&
            !value.startsWith(`${base}/`)
          ) {
            node.properties[property] = `${base}${value}`;
          }
        }
      }

      if (Array.isArray(node?.children)) {
        node.children.forEach(visit);
      }
    };

    visit(tree);
  };
}

function prefixGeneratedHtmlUrls({ base }) {
  const escapedBase = base
    .slice(1)
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const rootRelativeUrl = new RegExp(
    `\\b(href|src)="/(?!/|${escapedBase}(?:/|"))`,
    "g",
  );

  return {
    name: "prefix-generated-html-urls",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const visitDirectory = async (directory) => {
          const entries = await readdir(directory, { withFileTypes: true });

          await Promise.all(
            entries.map(async (entry) => {
              const path = join(directory, entry.name);

              if (entry.isDirectory()) {
                await visitDirectory(path);
              } else if (entry.isFile() && entry.name.endsWith(".html")) {
                const source = await readFile(path, "utf8");
                const updated = source.replace(
                  rootRelativeUrl,
                  `$1="${base}/`,
                );

                if (updated !== source) {
                  await writeFile(path, updated);
                }
              }
            }),
          );
        };

        await visitDirectory(fileURLToPath(dir));
      },
    },
  };
}

const githubPagesRedirects = Object.fromEntries(
  Object.entries(redirectsConfig).map(([source, target]) => [
    source,
    `${githubPagesBase}${target}`,
  ]),
);

export default defineConfig({
  site: githubPagesSite,
  base: githubPagesBase,
  redirects: githubPagesRedirects,
  markdown: {
    rehypePlugins: [
      [prefixRootRelativeUrls, { base: githubPagesBase }],
    ],
  },
  integrations: [
    starlight({
      title: "dxFeed Knowledge Base",
      description:
        "API documentation, data model, exchange specifications, market events, tutorials and FAQs for dxFeed market data services.",
      customCss: ["./src/styles/custom.css"],
      components: {
        PageTitle: "./src/components/PageTitle.astro",
      },
      // Built-in static search (Pagefind) ships automatically with Starlight -
      // no extra config needed, it indexes the built site at build time.
      social: [{ icon: "github", label: "GitHub", href: "https://github.com/dxfeed" }],
      editLink: {
        baseUrl: "https://github.com/jkosheleva/dxfeed-docs/edit/main/",
      },
      plugins: [
        // Generates /llms.txt (index) and /llms-full.txt (entire corpus,
        // concatenated) on every build - this is the single biggest lever for
        // "AI readiness": it gives any LLM assistant or RAG ingestion job a
        // clean, complete, distraction-free text dump of the whole KB without
        // needing to scrape/parse HTML at all.
        starlightLlmsTxt({
          projectName: "dxFeed Knowledge Base",
          description:
            "Public technical documentation for dxFeed market data APIs, data model, exchange specifications and market events.",
        }),
      ],
      sidebar: [
        {
          label: "Getting Started",
          items: [{ label: "Getting Started", link: "/getting-started/" }],
        },
        {
          label: "Data",
          items: [{ autogenerate: { directory: "data" } }],
        },
        {
          label: "Data Model",
          items: [{ autogenerate: { directory: "data-model" } }],
        },
        {
          label: "Data Services",
          items: [{ autogenerate: { directory: "data-services" } }],
        },
        {
          label: "Market Data API",
          items: [{ autogenerate: { directory: "market-data-api" } }],
        },
        {
          label: "Market Search",
          items: [{ autogenerate: { directory: "market-search" } }],
        },
        {
          label: "Visualization",
          items: [{ autogenerate: { directory: "visualization" } }],
        },
        {
          label: "dxFeed Retail Products",
          items: [{ autogenerate: { directory: "dxfeed-retail-products" } }],
        },
        {
          label: "Support",
          items: [{ autogenerate: { directory: "support" } }],
        },
        {
          label: "Reference",
          items: [
            { label: "FAQ", link: "/faq/" },
            { label: "Glossary", link: "/glossary/" },
          ],
        },
      ],
    }),
    prefixGeneratedHtmlUrls({ base: githubPagesBase }),
  ],
});
