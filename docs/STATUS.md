# docs/STATUS.md — Palawan Site Engine

Source of truth for BUILT / NOT BUILT / KNOWN ISSUES / UNVERIFIED.
Updated each phase. If something is not listed under BUILT, it is not done.

Last updated: Phase 1 complete (2026-11-08).

## BUILT (Phase 1)

- **Schemas (`packages/schemas`):** `BusinessProfile`, `SiteManifest`, `AppConfig`,
  section config schemas with defaults, `TemplateDefinition` (image-slot min/max +
  copyLimits + requiresVerified). Every factual field carries
  `{ value, status: verified|unverified|assumed, source? }`. Zod 4, strict TS.
- **Themes (`packages/themes`):** CSS-variable token system; 3 palettes
  (lagoon, ember, moss) and 3 font pairs (editorial, contemporary, minimal);
  runtime switching via `data-palette`/`data-fontpair` + inline CSS vars.
  Fonts loaded via `next/font` in `apps/web`.
- **Sections (`packages/sections`):** 13 components, one file per section:
  Navigation (mobile menu), Hero (scroll-sunrise + split-image), Statement,
  Rooms, Amenities, Gallery, Experiences (details), Testimonial, Location,
  InquiryForm (UI only, posts nowhere), FAQ, CTA, Footer. Typed configs,
  defaults, responsive, accessible, theme-driven.
- **Engine (`packages/engine`):** `validateSite(profile, manifest, appConfig, template)`
  checks all 7 required rules — missing fields, over-length copy, image-slot
  counts, broken internal links, empty SEO, invalid section config, unverified
  facts where verified required — plus module-disabled guard. `resolveImageSlots`
  enforces min/max per slot (works with SVG placeholders and real photo URLs).
- **Template (`packages/templates`):** `resort-01` cinematic dawn (original design
  derived from `docs/reference/amihan.html`), 7 pages
  (home, rooms, amenities, gallery, location, about, contact). Two FICTIONAL demo
  profiles: Amihan (3 rooms, 4 gallery) and Sibuyan (5 rooms, 6 gallery),
  different palettes/copy lengths. Generated SVG scenes labeled FICTIONAL in
  `apps/web/public/images/`.
- **Web app (`apps/web`):** static generation (`generateStaticParams`, SSG `●`
  for all 14 site pages + `/templates`), `/templates` gallery, site pages at
  `/sites/[siteId]/[slug]`, runtime palette/profile/font switcher dock,
  `/api/validate` POST endpoint.
- **Tests:** Vitest `pnpm test` → 7 packages, 23 tests (schemas, engine rules,
  slot resolution, sections, themes, templates). Playwright `tests/e2e/site.spec.ts`
  → 14 tests: both sites × 390/1440 on Home/Rooms/Contact (screenshots in
  `docs/screenshots/`, 12 PNGs), no horizontal overflow, axe zero serious/critical,
  all 7 pages render, palette/profile switch works.

## NOT BUILT

- **Studio + CMS (Phase 2):** Payload 3 + PostgreSQL, collections, roles, RLS,
  media on S3/R2, audit log, seed script, DB-backed rendering. NOT BUILT.
  (`apps/studio` is still the Phase 0 shell.)
- **Modules (Phase 3, 7):** module registry, inquiry delivery, booking-requests,
  restaurant/tour/blog/reviews, email adapters, client CMS at `/client`. NOT BUILT.
  (Inquiry form is UI only; `AppConfig` modules schema exists.)
- **Puck editor (Phase 4), SEO + deploy providers (Phase 5), Hermes tools (Phase 6),
  template batches (Phase 8, 19 more templates), hardening (Phase 9):** NOT BUILT.
- **Sections Phase 7:** Announcement bar, Video hero, Storytelling, Services,
  Room details, Pricing, Booking form. NOT BUILT.
- **Production photos:** demo images are SVG placeholders. Real client photos
  must replace them before any commercial use (slots already accept real URLs).

## KNOWN ISSUES (Phase 1)

- GitHub Actions CI remains **UNVERIFIED**: runs `42436320917` /
  `42436461812` report *"your account is locked due to a billing issue"*
  (GitHub-side annotation, not repo code). `.github/workflows/ci.yml` is correct
  and local `pnpm lint/typecheck/test/build` pass; remote CI cannot run until
  the account lock is cleared in GitHub settings.
- Package `build` scripts remain typecheck-only (`tsc --noEmit`); Turborepo
  warns about missing outputs. Intentional until later phases emit artifacts.
- `pnpm test` runs Vitest only; Playwright runs separately via
  `npx playwright test` (needs `pnpm --filter web build` + `playwright install`).

## UNVERIFIED

- Phase 1 gates verified locally (see command outputs in Phase 1 report).
  Remote CI, Vercel deploy, Payload, Puck, Hermes: UNVERIFIED.
