# docs/STATUS.md — Palawan Site Engine

Source of truth for BUILT / NOT BUILT / KNOWN ISSUES / UNVERIFIED.
Updated each phase. If something is not listed under BUILT, it is not done.

Last updated: Phase 0 bootstrap (2026-11-08).

## BUILT (Phase 0)

- Monorepo scaffold: pnpm workspaces + Turborepo 2; `apps/web`, `apps/studio`,
  `packages/{schemas,sections,themes,templates,engine,modules,integrations}`,
  `docs/`, `scripts/`, `infrastructure/docker/`, `.env.example`.
- Tooling: ESLint 10 (flat config), Prettier 3, Vitest 5, Playwright 1 (config only),
  Zod 4 (dependency in `packages/schemas`), TypeScript 5 strict everywhere.
- `apps/web` and `apps/studio`: minimal Next.js 16 App Router shells that build
  (`next build`). No site rendering, no CMS, no auth yet.
- Each package: minimal typed `src/index.ts` + Vitest smoke test that passes.
  These prove wiring only; they are not feature implementations.
- Root `AGENTS.md` with the 10 standing rules; this STATUS; root README;
  `.env.example` documenting every reserved variable.
- CI: `.github/workflows/ci.yml` runs install, lint, typecheck, test, build.
- Reference: `docs/reference/amihan.html` (sunrise resort preview, Phase 1 hero reference)
  and `docs/reference/palawan-site-engine-prompts.md` (9-phase build plan).

## NOT BUILT

- **Engine (Phase 1):** validation (missing fields, over-length copy, image-slot
  counts, broken links, empty SEO, invalid section config, unverified-fact checks),
  image-slot resolution, page rendering from manifest. `packages/engine` is a stub.
- **Schemas (Phase 1):** `BusinessProfile`, `SiteManifest`, `AppConfig`, section
  config schemas, per-field maxLength, per-slot image min/max. `packages/schemas`
  has only a health check; full schemas are NOT BUILT.
- **Themes (Phase 1):** token system, 3 palettes, 3 font pairs, runtime switching.
  `packages/themes` is a stub.
- **Sections (Phase 1):** Navigation, Hero (+ variants), Statement, Rooms, Amenities,
  Gallery, Experiences, Testimonial, Location, Inquiry form (UI only), FAQ, CTA,
  Footer. `packages/sections` is a stub. (Announcement bar, Video hero, Storytelling,
  Services, Room details, Pricing, Booking form also land in Phase 7.)
- **Templates (Phase 1):** `resort-01` cinematic dawn. Batches 8A–8D (19 more templates,
  20 total) are NOT BUILT.
- **Demo sites (Phase 1):** two FICTIONAL resort profiles, `/templates` gallery,
  7 pages per site, screenshots at 390px/1440px, axe checks. NOT BUILT.
- **Studio + CMS (Phase 2):** Payload 3 + PostgreSQL, collections, roles, RLS,
  media on S3/R2, audit log, seed script, DB-backed rendering in `apps/web`. NOT BUILT.
- **Modules (Phase 3, 7):** module registry, inquiry, booking-requests, restaurant,
  tour, blog, reviews, email adapters, client CMS at `/client`. NOT BUILT.
- **Puck editor (Phase 4), SEO + deploy providers (Phase 5), Hermes tools (Phase 6),
  template batches (Phase 8), hardening (Phase 9):** NOT BUILT.

## KNOWN ISSUES (Phase 0)

- Playwright config exists; no e2e tests run yet (they start in Phase 1 with screenshots).
  `pnpm test` runs Vitest only.
- Next.js 16 + TypeScript 5.9 pinned deliberately (TypeScript 7.0.2 is latest on npm
  but unproven against Next 16.4.5; switch only after a clean `pnpm build`).
- `@types/node` pinned to `^24.0.0` to match the Node 24 runtime (npm latest is 26.x).
  Revisit with the runtime.
- Turborepo build outputs are `.next/**` and `dist/**`; package builds are
  typecheck-only in Phase 0 (no emitted artifacts). This is intentional until Phase 1.

## UNVERIFIED

- Phase 0 gate (install/lint/typecheck/test/build from clean clone + CI) is verified
  locally at bootstrap. GitHub Actions CI status is UNVERIFIED until the first push
  to `main` runs green.
- Vercel deploy, Payload, Puck, and Hermes paths are UNVERIFIED by definition until
  their phases.
