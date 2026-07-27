import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightLlmsTxt from "starlight-llms-txt";
import redirectsConfig from "./redirects.json" with { type: "json" };

export default defineConfig({
  site: "https://kb.dxfeed.com",
  redirects: redirectsConfig,
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
        // Point this at the real docs repo once migrated - enables "Edit this
        // page" links and is a big part of what makes docs-as-code workflows
        // (PR review, git blame, CODEOWNERS) actually work.
        baseUrl: "https://github.com/dxfeed/dxfeed-docs/edit/main/",
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
  ],
});
