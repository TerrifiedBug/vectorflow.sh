# VectorFlow public docs

This repository contains the public documentation and marketing site for VectorFlow at <https://vectorflow.sh>. The docs are built with Next.js, Fumadocs, MDX, and static export.

## Local preview

Use pnpm so the lockfile stays consistent:

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000> for the site and <http://localhost:3000/docs> for the documentation.

## Project structure

| Area | Purpose |
|------|---------|
| `content/docs` | MDX documentation pages and section metadata |
| `content/docs/meta.json` | Top-level docs navigation order |
| `content/docs/*/meta.json` | Section titles and page order |
| `app/(home)` | Landing page routes |
| `app/docs` | Fumadocs documentation routes |
| `app/api/search/route.ts` | Search index route |
| `lib/source.ts` | Fumadocs content source adapter |
| `lib/layout.shared.tsx` | Shared layout and navigation options |
| `public/screenshots` | Product screenshots used by the site |

## Authoring conventions

- Put user-facing docs in `content/docs`.
- Add or update the nearest `meta.json` whenever you create, rename, or reorder pages.
- Use short frontmatter titles that match the sidebar label.
- Start with the fastest successful path, then add advanced or troubleshooting detail.
- Prefer concrete commands, expected outcomes, and operational checks.
- Keep examples runnable. Do not invent environment variables, API fields, ports, or command output.
- Use VectorFlow secrets in examples that need credentials. Do not paste real keys or token-shaped values.
- Link to related docs with relative links when the target is inside the docs site.
- Keep screenshots in `public/screenshots` and use descriptive alt text.

## Checks

Run these before opening a PR:

```bash
pnpm types:check
pnpm build
```

`pnpm types:check` regenerates Fumadocs MDX output, runs Next.js type generation, and checks TypeScript. `pnpm build` verifies the static export path used for deployment.

## Link checks

There is no dedicated link-check script in this repo yet. Before publishing docs changes:

- Click through new sidebar entries in the local preview.
- Check every new relative link from the rendered page.
- Verify external docs links still point to the current vendor page.
- Run `pnpm build`; broken MDX imports and invalid route generation should fail there.

## Pull requests

Keep PRs focused on one reader outcome. For example, a new recipe section should include the pages, navigation metadata, and any cross-links needed to make the section discoverable.
