# Migration status

The English dxFeed Knowledge Base was migrated from the July 2026 Paligo
DocBook XML publication to Markdown.

## Completed

- 117 Paligo topics converted into 123 content pages
- Original hierarchy retained in `src/content/docs/`
- Images copied to `public/images/`
- Admonitions, code blocks, lists, tables, and internal links converted
- Complex tables with `rowspan` or `colspan` retained as valid raw HTML
- Markdown left inside raw HTML tables normalized to HTML markup
- Malformed multiline Markdown tables repaired
- 234 legacy URL redirects added, with and without the `/en` prefix
- Pagefind search, sitemap, custom 404, and `llms.txt` output enabled
- Pull request build, source-content checks, and internal-link checks added
- GitHub Pages deployment workflow added
- Duplicate image directory removed

The `xml-migration-report.json` file is the historical report produced during
conversion. Its unresolved-link list describes the pre-cleanup conversion
result; the current site is validated from the built output by
`npm run check`.

## Intentional decisions

- GitHub and Markdown are the source of truth after migration.
- Paligo reusable components, variables, audiences, multi-publication output,
  translation workflows, granular topic permissions, and PDF publishing are
  not required for this Knowledge Base.
- Topics marked `paligoInternal` remain published because the same pages are
  publicly available in the current Knowledge Base. The flag is retained only
  as migration metadata.
- `robots.txt` is not required because the public Knowledge Base does not need
  crawler restrictions. The sitemap is generated automatically.

## Remaining before production cutover

- Confirm the desired sidebar order; it currently follows Starlight’s
  alphabetical folder order.
- Review the GitHub Pages preview with the technical writer and one SME.
- Decide whether production deploys through GitHub Pages or the existing
  S3/CDN environment.
- Configure `kb.dxfeed.com`, validate all legacy redirects in the selected
  hosting environment, and keep the Paligo deployment available for rollback
  during the cutover window.
- Connect the existing analytics and feedback mechanisms if they are required
  on the new site.
