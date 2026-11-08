# AGENTS.md — Palawan Site Engine

Repo: `digitalnativepalawan/palawan-site-engine`. Work ONLY in this repo. Never touch any other repository. The repo is PUBLIC: fictional data only, no secrets, no real client data, ever.

Inspect the repo first and preserve anything that exists.

## Standing rules

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

## Layout (Phase 0)

- `apps/web` — Next.js app that renders sites.
- `apps/studio` — Next.js app for the agency dashboard (Payload arrives in Phase 2).
- `packages/schemas` — Zod schemas + exported TS types (full schemas land in Phase 1).
- `packages/sections` — Typed section library (one file per section, no giant component).
- `packages/themes` — Token system (CSS variables), palettes, font pairs.
- `packages/templates` — Template manifests + theme tokens + section variants (original designs only).
- `packages/engine` — Validation + resolution + rendering from (BusinessProfile, SiteManifest, AppConfig).
- `packages/modules` — Pluggable modules (inquiry, booking, restaurant, tour, blog, reviews).
- `packages/integrations` — Deployment providers, Hermes tool layer, adapters.
- `docs/` — STATUS, reference, screenshots, templates briefs, runbooks.
- `scripts/` — Repo scripts.
- `infrastructure/docker` — Local + deployment container definitions.

## Commands (Phase 0)

```sh
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

All five must pass from a clean clone before the Phase 0 gate.
