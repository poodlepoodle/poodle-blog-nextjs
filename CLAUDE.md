# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `yarn dev` — Next.js dev server
- `yarn build` — Production build (SSG; all content routes are statically generated)
- `yarn start` — Serve the production build
- `yarn lint` — `next lint`

There is no test framework configured in this repo.

## Architecture

### Content model: three parallel sections

The blog has **three content types** — `blog`, `playground`, `log` — each backed by MDX files in `posts/{blog|playground|log}/*.mdx`. They are intentionally parallel in structure (routing, metadata, structured data, markdown serving) but diverge in their frontmatter schema:

- `BlogPost`: full schema (title, description, publishedAt, updatedAt?, slug, tags, published?)
- `PlaygroundPost`: **omits `description` and `tags`** — keep this in mind when adding features that touch all three types
- `LogPost`: **omits `tags`**

Types live in `src/types/post.types.ts`. The pattern: one `CommonPostMetadata` interface, each type `Omit`s the fields it doesn't use.

Loader functions in `src/utils/get-posts.ts` (`getBlogPosts`, `getPlaygroundPosts`, `getLogPosts`) all delegate to a single `loadMdxPosts` generic helper. They are wrapped in `unstable_cache` with `revalidate: false` — the cache is effectively build-time only since all routes are SSG.

### Routing and static generation

`src/app/{posts,playgrounds,logs}/` each contain:
- `page.tsx` — list page
- `[slug]/page.tsx` — detail page (uses `generateStaticParams` + `dynamicParams = false`)
- `md/[slug]/route.ts` — serves the same post as raw markdown

All three sections are fully SSG. If you add a new section, follow this exact three-file pattern.

**Legacy redirect**: `/blog` and `/blog/:slug*` are permanent-redirected to `/posts*` in `next.config.ts`. Don't re-add `/blog` routes.

**pageExtensions**: `next.config.ts` sets `pageExtensions: ['js', 'jsx', 'ts', 'tsx']` — MDX files under `posts/` are **content, not pages**. Don't place `.mdx` inside `src/app/`.

### Markdown serving for LLMs and crawlers

Posts are served as raw markdown via two mechanisms (both configured as `rewrites` in `next.config.ts`):
1. `GET /posts/:slug.md` → `/posts/md/:slug`
2. `GET /posts/:slug` with `Accept: text/markdown` → `/posts/md/:slug`

The same applies to `/logs` and `/playgrounds`. When touching the route handlers in `*/md/[slug]/route.ts`, keep output parity across the three sections.

`src/app/llms.txt/route.ts` exposes an `llms.txt` index for AI crawlers.

### Structured data (JSON-LD)

All JSON-LD generators live in `src/constants/json-ld.ts`. The detailed strategy — `@graph` structure, `@id` conventions, per-page function mapping — is documented in `docs/structured-data-strategy.md`. **Read that document before modifying JSON-LD**; it captures non-obvious decisions (e.g. why list pages use single `ItemList` but detail pages use `@graph`).

Known quirk documented there: **playground URL is plural (`/playgrounds`) but image paths are singular (`/public/playground/`)**. This is intentional — don't "fix" it.

### Metadata system

`src/constants/metadata.ts` exports presets (`METADATA_PRESET`, `METADATA_OG_WEBSITE_PRESET`, `METADATA_OG_ARTICLE_PRESET`). Pages spread these and override `title`, `alternates.canonical`, `openGraph.url`. The commented-out fields at the bottom of `metadata.ts` document which fields belong at the root layout vs. per-page — respect this split.

### State and styling

- **Global state**: Zustand stores in `src/stores/` (`post-store.ts`, `ui-store.ts`). Context is reserved for narrow concerns (`src/contexts/toc-context.tsx`).
- **Styling**: Tailwind CSS v4 with the PostCSS plugin. The Tailwind stylesheet is `src/app/globals.css` (referenced from `.prettierrc` so `prettier-plugin-tailwindcss` can sort classes correctly).
- **Animation**: `motion` package (the project migrated from `framer-motion` — don't import from `framer-motion`).

### Path aliases

Configured in `tsconfig.json`: `@/*`, `@app/*`, `@components/*`, `@types/*`, `@hooks/*`, `@utils/*`, `@constants/*`, `@stores/*`. Prefer these over relative imports.

## Conventions

### Commit messages

This repo uses **gitmoji** with a double-colon separator: `:emoji: :: short message`. Examples from recent history:

- `:sparkles: ::` new feature
- `:bug: ::` bug fix
- `:recycle: ::` refactor
- `:mag: ::` SEO / discoverability
- `:memo: ::` docs
- `:lipstick: ::` UI/style
- `:arrow_up: ::` dependency bump

Match this format when creating commits.

### Language

All prose in the codebase (UI copy, post content, doc comments, commit messages) is Korean. The README, posts in `posts/`, and strategy docs in `docs/` are Korean. Write new user-facing text and commit descriptions in Korean to match.

## Reference documents in `docs/`

When a task touches these areas, read the corresponding doc first — they contain decisions that aren't reconstructable from code alone:

- `docs/structured-data-strategy.md` — JSON-LD architecture, `@graph` vs `ItemList` rationale, `@id` conventions
- `docs/utm-tracking-rules.md` — UTM parameter specification for outbound links (GitHub profile, resume, job platforms). Includes a living table of currently-deployed UTM links — **update that table when adding or changing a UTM link**.
- `docs/seo-audit-report-*.md` — dated SEO audit reports (working documents)
