# Palawan Site Engine: phased opencode prompts

## How to run these

1. One phase per opencode session. Paste the phase prompt, nothing else.
2. Phase 0 creates `AGENTS.md`. Every later session starts with: "Read AGENTS.md and docs/STATUS.md first."
3. Do not start a phase until the previous gate passed. Check `git log` and the screenshots yourself.
4. If a gate fails, paste the failure back into the same session. Do not move on.
5. Save `amihan.html` (the sunrise resort preview) into `docs/reference/` before Phase 1.

Phases: 0 Bootstrap, 1 Engine + first resort, 2 Studio + tenancy, 3 Inquiry + booking + client CMS, 4 Puck editor, 5 SEO + deployment, 6 Hermes integration, 7 Content modules, 8A to 8D Template batches, 9 Hardening.

---

## PHASE 0: Bootstrap and rules

```text
Repo: digitalnativepalawan/palawan-site-engine. Work ONLY in this repo. Never touch any other repository. The repo is PUBLIC: fictional data only, no secrets, no real client data, ever.

Inspect the repo first and preserve anything that exists.

Create a pnpm + Turborepo monorepo, TypeScript strict everywhere:
  apps/web        Next.js app that renders sites
  apps/studio     Next.js app for agency dashboard (Payload comes in Phase 2)
  packages/schemas, sections, themes, templates, engine, modules, integrations
  docs/, scripts/, infrastructure/docker, .env.example
Tooling: ESLint, Prettier, Vitest, Playwright, Zod. Verify current stable versions and compatibility before installing. No unnecessary dependencies.

Write AGENTS.md at the repo root containing these standing rules:
1. TypeScript only. Reuse mature open-source libraries instead of rebuilding them.
2. No placeholder core functionality. If something is not built, it is listed in docs/STATUS.md as NOT BUILT, never stubbed to look finished.
3. Never claim something works unless a command you ran proves it. Report real command output.
4. Never invent business addresses, prices, facilities, awards, reviews, or contact details. All demo data is labeled FICTIONAL.
5. All designs are original. Do not vendor third-party templates.
6. Design bans: no generic AI look, no default gradients, no identical rounded cards, no glass effects for decoration, no tracked all-caps eyebrow above every heading, no numbered markers unless the content is a sequence, no single accented word in headlines. Motion is sparse: one orchestrated moment per page, plus motion that responds to user action. Respect prefers-reduced-motion.
7. Commit in small logical groups with clear messages. Report with a git log, not a status essay.
8. Each phase ends with a GATE. Stop at the gate and wait for approval. Do not start the next phase.
9. Keep docs/STATUS.md updated: BUILT, NOT BUILT, KNOWN ISSUES.
10. Document every environment variable in .env.example and the README.

Add CI (GitHub Actions) that runs install, lint, typecheck, test, build.

GATE:
- pnpm install, lint, typecheck, test, build all pass from a clean clone.
- CI file exists. AGENTS.md and docs/STATUS.md exist.
- Report the git log and the output of pnpm build. Stop.
```

---

## PHASE 1: Engine and first complete resort template

```text
Read AGENTS.md and docs/STATUS.md first. This is Phase 1 only.

Goal: a rendering engine that builds a full site from three separate validated inputs, plus ONE finished resort template. No CMS, no database, no auth yet.

1. packages/schemas (Zod, exported TS types):
   - BusinessProfile: name, industry, tagline, description, location, contact, hours, socials, services, rooms, amenities, images (slot-keyed), SEO. Every field that is factual carries provenance: { value, status: "verified" | "unverified" | "assumed", source?: string }.
   - SiteManifest: template id, theme id, palette tokens, font pair, navigation, pages, ordered sections with variant + config, motion preset, responsive options.
   - AppConfig: enabled modules and settings (empty for now, schema only).
   - Section config schemas, each with defaults.
   - Per-field maxLength and per-slot image min/max declared in the template definition.

2. packages/themes: token system (CSS variables) with 3 palettes and 3 font pairs, switchable at runtime. Fonts via next/font.

3. packages/sections (typed config, defaults, responsive, accessible, theme-driven, optional motion, preview support): Navigation (with mobile menu), Hero, Statement, Rooms, Amenities, Gallery, Experiences (expandable list), Testimonial, Location, Inquiry form (UI only, posts nowhere yet), FAQ, CTA, Footer. Hero variants: "scroll-sunrise" (reference: docs/reference/amihan.html) and "split-image". One file per section. No giant component.

4. packages/engine: takes (BusinessProfile, SiteManifest, AppConfig), validates all three, resolves image slots, renders pages. Validation must report: missing required fields, over-length copy, too few or too many images per slot, broken internal links, empty SEO fields, invalid section config, unverified facts used where verified is required.

5. packages/templates: "resort-01" (cinematic dawn), built from the reference design but as configurable sections. Pages: Home, Rooms, Amenities, Gallery, Location, About, Contact.

6. apps/web: renders any site by manifest id with static generation. A /templates gallery route lists templates with a switch between two business profiles and three palettes.

7. Demo data: two different FICTIONAL resort business profiles (different name, palette, room count, image counts, copy lengths). Images may be generated SVG scenes, clearly labeled. Image slots must also work with real photos.

8. Tests (Vitest): schema validation, each validation rule above, image slot resolution. Playwright: both demo sites at 390px and 1440px on Home, Rooms, Contact; screenshots saved to docs/screenshots/; no horizontal overflow; axe accessibility check with zero serious violations.

GATE (all must pass, then stop):
- pnpm lint, typecheck, test, build pass.
- Both demo sites build and render all 7 pages.
- A deliberately bad business JSON fails with a clear, field-level error message (show the output).
- Screenshots exist for both sites at both widths.
- Report: git log, test summary, screenshot paths, and an honest NOT BUILT list.
```

---

## PHASE 2: Studio, CMS, and multi-tenant security

```text
Read AGENTS.md and docs/STATUS.md first. This is Phase 2 only.

Goal: Payload CMS + PostgreSQL inside apps/studio with real tenant isolation. Persist what Phase 1 uses as JSON files.

1. Use Payload 3 (verify current stable) with PostgreSQL. docker-compose for local Postgres. Check and prefer Payload's official multi-tenant plugin over hand-rolling.
2. Collections: tenants, users, sites, business-profiles, pages, media, activity-log. Every tenant-owned record has a tenant relation. Schemas come from packages/schemas; no duplicate type definitions.
3. Roles: agency_admin, agency_editor, client_admin, client_editor. Server-side access control on every collection and every field that needs it. Agency roles see all tenants. Client roles see only their tenant.
4. Media: S3-compatible storage adapter (Cloudflare R2). Local filesystem fallback for dev. Per-tenant key prefixes. Signed or access-checked media URLs for private media.
5. Defense in depth: PostgreSQL row-level security policies in migrations for tenant-owned tables, in addition to app-level checks. Document how the tenant id is set per request.
6. Audit log: record create, update, delete, login, failed login, role change, publish, with actor, tenant, timestamp, and diff summary.
7. Input validation on all API inputs with Zod. Rate-limit auth routes. Secrets via env only.
8. Seed script: one agency admin and two FICTIONAL tenants with sites built from the Phase 1 demo profiles.
9. apps/web renders a site from the database (by site id) in addition to the file-based demo.

Tests (Vitest and API-level): with two tenants A and B, prove a tenant A user cannot read, list, update, delete, or search tenant B's sites, profiles, pages, media records, media files, users, or audit log, via REST, GraphQL, and direct media URL. Prove client roles cannot edit templates or manifests' structural fields. Prove agency roles can. Prove tampering with a tenant id in a request body is rejected.

GATE (then stop):
- All tests above pass; show the isolation test names and results.
- Fresh clone to running studio works with only .env.example and documented commands.
- The seeded sites render from the database in apps/web.
- Report: git log, test summary, NOT BUILT list.
```

---

## PHASE 3: Inquiry and booking modules, client CMS

```text
Read AGENTS.md and docs/STATUS.md first. This is Phase 3 only.

Goal: real inquiry and booking-request functionality, and a simplified client editing experience.

1. Module architecture in packages/modules: each module declares its schema, Payload collections, sections it provides, settings schema, and client-CMS panels. Modules register without modifying packages/engine. Disabled modules are detected by the validator.

2. Inquiry module: form section posts to a real API route. Zod validation, honeypot, rate limiting, spam-safe. Stored per tenant. Statuses: new, contacted, closed. Email notification through an adapter interface (SMTP and Resend implementations; console adapter for dev). Inquiry management UI in the studio and client CMS.

3. Booking module: this is booking REQUESTS only. Availability configuration (room types, capacity, blackout dates, minimum stay). Request form validates against configuration. Statuses: requested, approved, declined, cancelled. Confirmation workflow with email. All copy says "request". Never present a request as a confirmed booking. No real-time inventory sync is claimed anywhere in code or UI.

4. Client CMS (simplified, branded, in apps/studio under /client): clients edit business info, text, images, galleries, services, rooms, prices, contact details, hours, testimonials. The visible panels adapt to the modules enabled for that client. Clients cannot see or edit templates, manifests, other tenants, or engine settings.

5. Record who edited what: every field edit stores editor type (agency, client, hermes) and timestamp. This feeds manual-edit preservation in Phase 6.

Tests: submit inquiry and booking request end to end; spam and invalid input rejected; emails sent through the console adapter; client cannot reach agency routes; module disabled hides its panel and sections and fails validation if referenced.

GATE (then stop):
- Tests pass. Show an inquiry and a booking request flowing from the demo site to the client CMS.
- Screenshots of the client CMS at 390px and 1440px.
- Report: git log, test summary, NOT BUILT list.
```

---

## PHASE 4: Puck visual editor

```text
Read AGENTS.md and docs/STATUS.md first. This is Phase 4 only.

Goal: visual page editing with Puck on top of the existing section library.

1. Integrate Puck (verify current stable and license) in apps/studio at /sites/[id]/pages/[page]/edit.
2. Generate the Puck config from the section registry and Zod schemas, so adding a section in packages/sections automatically makes it editable. No hand-maintained duplicate configs.
3. Store page data as the same SiteManifest JSON the engine renders. Draft and published versions with version history and restore.
4. Live preview through a signed, expiring preview token in apps/web. Preview uses the real renderer, not a lookalike.
5. Validate on save using the engine validator. Show field-level errors in the editor. Block publish when validation fails.
6. Permissions: agency roles can edit structure and content. Client roles can edit only text and images inside existing sections (no add, remove, reorder, or variant change). Enforce server-side, not only in the UI.
7. Edit provenance from Phase 3 is recorded for every Puck save.
8. Theme editor: palette, font pair, motion preset, with live preview.

Tests: editor round trip (edit, save, reload, render matches); permissions enforced on the API; invalid config blocked; version restore works; preview token expires.

GATE (then stop):
- Playwright test drives the editor: change a headline, swap a section variant, save, preview, publish.
- Screenshots of the editor at 1440px.
- Report: git log, test summary, NOT BUILT list.
```

---

## PHASE 5: SEO and deployment

```text
Read AGENTS.md and docs/STATUS.md first. This is Phase 5 only.

Goal: production-grade SEO output and a deployment abstraction with a real Vercel path.

1. SEO in apps/web: metadata, Open Graph, canonical URLs, sitemap.xml, robots.txt, structured data (LodgingBusiness, Restaurant, TouristTrip, LocalBusiness as appropriate). Structured data uses ONLY fields with status "verified". Image optimization and responsive images. Static generation wherever possible. Semantic HTML.
2. Tenant resolution by host for custom domains, plus subdomain fallback.
3. packages/integrations/deploy: DeploymentProvider interface (createPreview, promote, attachDomain, getStatus, listHistory, rollback). Implement VercelProvider against the real Vercel API, and a LocalDockerProvider that builds and runs a site container. Provider chosen by config; nothing hardwired to Vercel.
4. Deployment records per site: status, url, commit or manifest version, actor, timestamps. Rollback re-promotes a previous deployment. Show history and status in the studio.
5. Publish requires an approval record (who approved, when). No publish without it.
6. Domain checklist UI: DNS records the user must set, verification status.

Tests: sitemap and robots output; structured data excludes unverified fields; provider interface contract tests; deployment lifecycle with a mocked provider, clearly labeled as mocked.

GATE (then stop):
- If VERCEL_TOKEN is provided: one real preview deployment URL for a demo site, shown in the report. If not provided: say so plainly and mark real Vercel deployment as UNVERIFIED in docs/STATUS.md.
- Lighthouse (mobile) on a demo home page: report scores honestly, target 90 or higher for SEO and accessibility, 85 or higher for performance.
- Report: git log, test summary, NOT BUILT list.
```

---

## PHASE 6: Hermes integration

```text
Read AGENTS.md and docs/STATUS.md first. This is Phase 6 only.

Goal: let Hermes operate the engine through structured, adapter-based tools. Do not assume Hermes uses any particular framework or API.

1. packages/integrations/hermes: tool definitions as Zod schemas with JSON Schema export:
   create_business_profile, record_research_findings, recommend_template, generate_brand_config, generate_copy, configure_sections, create_page, configure_modules, validate_site, preview_site, revise_site, request_publish, publish_site, update_site, list_sites, get_site.
2. Fact provenance: record_research_findings stores each fact with status (verified, unverified, assumed), source URL, and retrieval date. Generated copy and structured data may not state unverified facts as verified. validate_site flags unverified address, prices, awards, reviews, and contact details and blocks publish until a human confirms them.
3. revise_site takes structured patch operations (JSON Patch over the manifest and profile). Natural-language interpretation belongs to Hermes, not to the engine. The engine applies and validates patches.
4. Manual-edit preservation: using Phase 3 provenance, a patch touching a field last edited by a client or agency human is rejected unless the call sets force with a reason, which is audit-logged.
5. Surfaces over the same tool layer: REST endpoints under /api/hermes (API-key auth scoped per agency, rate limited, audit-logged), a CLI named pse, and an MCP server. Document how to register each with Hermes in docs/hermes.md.
6. publish_site requires a valid approval token from a human user (Phase 5). Hermes alone cannot publish.
7. Deterministic test harness (no LLM) that plays a scripted Hermes session.

Tests: full scripted flow: intake to profile to template recommendation to copy to sections to validate to preview; revise with patches; blocked patch on a client-edited field; blocked publish without approval; unverified fact blocked; wrong-agency API key rejected.

GATE (then stop):
- Scripted session passes; show its transcript.
- Show the pse CLI building a preview of a new fictional business from a single intake JSON.
- Report: git log, test summary, NOT BUILT list.
```

---

## PHASE 7: Content modules

```text
Read AGENTS.md and docs/STATUS.md first. This is Phase 7 only.

Goal: the remaining modules and their sections, so restaurant, tour, and blog templates have real functionality.

Modules (each: schema, Payload collections, section(s), settings, client-CMS panel, validator rules, tests):
1. Restaurant: menu categories, items, prices, availability labels (available, sold out, seasonal). Sections: Menu, FoodDrinkCards.
2. Tour: packages, schedules, inclusions, pricing, reservation inquiries (inquiries, not confirmed reservations). Sections: TourPackages, TourDetails.
3. Blog: posts, categories, SEO metadata, related content. Sections: Blog, Related.
4. Reviews: testimonials, review management, external review links. Sections: Reviews. Never fabricate reviews; seed data is labeled FICTIONAL.

Add the missing sections from the master spec if not yet present: Announcement bar, Video hero, Storytelling, Services, Room details, Pricing, Booking form.

GATE (then stop):
- All module tests pass; each module editable in the client CMS and visible on a demo site.
- Report: git log, test summary, NOT BUILT list.
```

---

## PHASE 8: Template batches

Run 8A, 8B, 8C, 8D one at a time. Review the screenshot grid yourself before approving each.

### Shared rules (paste at the top of each batch prompt)

```text
Read AGENTS.md and docs/STATUS.md first.

Each template is a manifest plus theme tokens plus section variants. It must differ from every other template in at least four of: layout structure, hero treatment, type pairing, palette, motion style, section order. Not a reskin.

Before building each template, write a half-page design brief in docs/templates/<id>.md: subject, audience, one memorable idea, palette (4 to 6 named hex values), type roles, layout concept, motion plan. Check the brief against the design bans in AGENTS.md. If it reads like a generic default, revise it first.

For each template: build it, render it with TWO different fictional business profiles (different copy length, image counts, palette), and run the validator. Add new section variants to packages/sections instead of forking sections.

Per-template tests: builds, validates, axe zero serious violations, no horizontal overflow at 390px and 1440px.

BATCH GATE: a screenshot grid of all templates in the batch (home page, 390px and 1440px, both profiles) saved to docs/screenshots/<batch>/, a distinctness table (hero treatment, fonts, palette, motion per template), pnpm test and build passing. Stop and wait for approval.
```

### Batch 8A: resort templates 02 to 06

```text
Build these five resort templates (resort-01 already exists):
- resort-02 Editorial luxury: large serif display, asymmetric photo collage, slow reveals, restrained palette.
- resort-03 Bold contemporary: eco-surf camp feel, oversized sans type, color blocks, kinetic marquee.
- resort-04 Minimal modern: boutique hotel, strict grid, generous space, near-zero motion.
- resort-05 Cinematic immersive: full-screen video hero, horizontal-scroll room gallery.
- resort-06 Calm tropical: organic image masks, soft sand and sea palette, gentle parallax.
```

### Batch 8B: cafe templates 01 to 04, restaurant 01

```text
Build these five templates:
- cafe-01 Editorial: roaster's journal feel, menu as a printed-style spread.
- cafe-02 Bold contemporary: saturated color blocking, big type, playful hover states.
- cafe-03 Minimal modern: quiet, spacious, Japanese-influenced restraint.
- cafe-04 Calm tropical: garden cafe, plant-filled imagery, soft palette.
- restaurant-01 Editorial luxury: tasting-menu restaurant, menu is the hero, reservation inquiry.
```

### Batch 8C: restaurant 02 to 04, tours 01 to 02

```text
Build these five templates:
- restaurant-02 Bold contemporary: ihaw and street-food energy, high contrast, fast motion.
- restaurant-03 Cinematic immersive: dark, candlelit, full-screen dishes, slow transitions.
- restaurant-04 Calm tropical: beachfront seafood, daylight palette, relaxed layout.
- tour-01 Cinematic immersive: island-hopping operator, full-bleed hero, package cards that expand.
- tour-02 Bold contemporary: dive and adventure operator, kinetic type, strong packages and pricing.
```

### Batch 8D: tour 03, services 01 to 03

```text
Build these four templates:
- tour-03 Editorial: slow-travel guided experiences, story-led layout.
- service-01 Minimal modern: clinic, contractor, or consultancy; trust-first, clear services and inquiry.
- service-02 Bold contemporary: transport and vehicle rental; pricing and route clarity first.
- service-03 Calm tropical: spa and wellness; soft imagery, booking-request flow.
```

---

## PHASE 9: Hardening and launch readiness

```text
Read AGENTS.md and docs/STATUS.md first. This is Phase 9 only.

1. Security review: re-run all tenant isolation tests against every module and every template-driven route. Dependency audit. Verify no secrets in git history. Check CSRF, rate limits, file upload limits and types, and signed media URLs.
2. Accessibility: axe across all 20 templates on key pages; keyboard navigation, focus visibility, reduced motion, color contrast.
3. Performance: Lighthouse mobile on every template's home page; fix regressions; report the table honestly.
4. E2E: Playwright for the full agency flow (login, create site from intake, edit in Puck, preview, approve, publish) and the full client flow (login, edit text and image, submit inquiry, view it).
5. Deployment: Docker and Coolify deployment guide that you actually tested, or marked UNVERIFIED. Backups and restore procedure for Postgres and media.
6. Docs: README, setup, environment variables, architecture diagram, how to add a template, how to add a section, how to add a module, Hermes guide, runbooks.
7. docs/STATUS.md final: BUILT, NOT BUILT, KNOWN ISSUES, UNVERIFIED.

GATE: all test suites green from a clean clone; Lighthouse and axe tables in docs/; an honest STATUS.md. Report git log and the tables. Stop.
```

---

## Your review checklist per phase

- Run `git log --oneline` and open the screenshots yourself.
- Check STATUS.md: anything marked UNVERIFIED is not done.
- Look for repeated layouts in template batches. If two feel like the same site recolored, reject the batch.
- Before any real client goes live: read the license terms of any third-party asset or font you use.
