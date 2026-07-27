# dxFeed Knowledge Base

The Markdown and Astro Starlight source for the dxFeed Knowledge Base.
GitHub is the source of truth: documentation changes are reviewed in pull
requests and published from the `main` branch.

## Stack

- Markdown for documentation source
- Astro Starlight for the static site
- Pagefind for full-text search
- GitHub Actions for validation and deployment
- GitHub Pages by default; the generated `dist/` folder can also be deployed
  to the existing dxFeed S3/CDN environment

## Repository contents

- `src/content/docs/` — all documentation pages
- `public/images/` — documentation images
- `astro.config.mjs` — navigation, search, redirects, and site settings
- `redirects.json` — 234 redirects from legacy Paligo URLs
- `scripts/check-source-content.mjs` — migration-content validation
- `scripts/check-built-links.mjs` — internal path and fragment validation
- `.github/workflows/ci.yml` — pull request checks
- `.github/workflows/deploy.yml` — GitHub Pages deployment from `main`

The initial migration contains 117 Paligo topics represented as 123 content
pages, plus the site home page and a custom 404 page. Ten tables that require
merged cells remain as raw HTML; all other content is plain Markdown.

## Local development

Node.js 22 is used in CI.

```bash
npm ci
npm run dev
```

Before opening a pull request, run the same validation used in CI:

```bash
npm run check
```

This command validates source content, builds the production site and Pagefind
index, and checks all internal paths and fragments.

To inspect the production build locally:

```bash
npm run preview
```

## Editing documentation

1. Create a branch.
2. Edit the relevant file in `src/content/docs/`.
3. Store new images in `public/images/` and reference them as
   `/images/<filename>`.
4. Use root-relative links such as `/data-model/market-events/`.
5. Run `npm run check`.
6. Open a pull request and request review from the relevant subject-matter
   expert.

Each migrated topic retains a `paligoOriginId` frontmatter value for historical
traceability. It is not used to build or publish the site.

## Deployment

Pushes to `main` build and deploy the site through
`.github/workflows/deploy.yml`. For GitHub Pages project URLs such as
`<org>.github.io/<repo>`, add the repository path as Astro’s `base` setting.
No `base` setting is required when `kb.dxfeed.com` is configured as the custom
domain.

The production-domain switch is a separate infrastructure change. Validate the
GitHub Pages preview first, then configure the custom domain or replace the
deployment step with the existing S3/CDN upload process.

