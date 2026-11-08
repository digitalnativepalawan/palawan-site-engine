# Palawan Site Engine

A website factory that renders full client sites from validated inputs, with an agency studio, multi-tenant CMS, visual editing, and agent tooling.

**Status:** Phase 0 — bootstrap. See [docs/STATUS.md](./docs/STATUS.md) for BUILT / NOT BUILT / KNOWN ISSUES.
Design reference for the first resort template: [docs/reference/amihan.html](./docs/reference/amihan.html).
Build plan (9 phases, gates, and review checklist): [docs/reference/palawan-site-engine-prompts.md](./docs/reference/palawan-site-engine-prompts.md).

> PUBLIC repo: fictional data only, no secrets, no real client data, ever.

## Stack (Phase 0)

| Layer | Choice | Notes |
|---|---|---|
| Monorepo | pnpm workspaces + Turborepo 2 | `apps/*`, `packages/*` |
| Apps | Next.js 16 (App Router) | `apps/web` renders sites, `apps/studio` is the agency dashboard |
| Language | TypeScript strict | `strict: true` everywhere, see `tsconfig.base.json` |
| Validation | Zod 4 | Schemas live in `packages/schemas` (full schemas in Phase 1) |
| Unit tests | Vitest 5 | Run with `pnpm test` |
| E2E tests | Playwright 1 (config in Phase 0, tests from Phase 1) | `playwright.config.ts` at the root |
| Lint / format | ESLint 10 (flat config) + Prettier 3 | |
| CI | GitHub Actions | `install`, `lint`, `typecheck`, `test`, `build` |

Payload CMS (Phase 2), Puck editor (Phase 4), and deployment providers (Phase 5) are **NOT BUILT** yet. See STATUS.

## Quickstart

Requires Node `>=20.9.0` and pnpm `>=10.0.0` (verified against Node 24.21.0 / pnpm 10.30.3).

```sh
pnpm install
pnpm dev      # turbo: web + studio
pnpm build    # turbo: build all
pnpm lint
pnpm typecheck
pnpm test
```

Clean-clone verification for the Phase 0 gate:

```sh
rm -rf node_modules apps/*/node_modules packages/*/node_modules
rm -f pnpm-lock.yaml
pnpm install --frozen-lockfile 2>/dev/null || pnpm install
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

## Environment variables

Every variable is documented in [.env.example](./.env.example). Phase 0 requires no secrets; later phases reserve keys for Postgres/Payload (Phase 2), email (Phase 3), deployment (Phase 5), and Hermes (Phase 6). Never commit `.env`.

## Layout

```
apps/
  web/          Next.js site renderer (static generation by manifest id)
  studio/       Next.js agency dashboard (Payload from Phase 2)
packages/
  schemas/      Zod schemas + exported types
  sections/     Typed section library (one file per section)
  themes/       Token system, palettes, font pairs
  templates/    Template manifests + variants (original designs only)
  engine/       Validation, image-slot resolution, rendering
  modules/      Inquiry, booking, restaurant, tour, blog, reviews
  integrations/ Deploy providers + Hermes tool layer
docs/
  STATUS.md     BUILT / NOT BUILT / KNOWN ISSUES (source of truth)
  reference/    amihan.html, engine build plan
infrastructure/docker/
  Docker notes (deployment guide lands in Phase 9)
scripts/
```

## Rules

Read [AGENTS.md](./AGENTS.md) first. It carries the standing rules (no placeholder core functionality, fictional demo data only, original designs only, phase gates, STATUS discipline, env-var documentation).

## License

Code is ours. No third-party templates are vendored. Fonts, images, and libraries used in later phases must be checked against their license terms before any client goes live. See the Phase 9 checklist in the build plan.
