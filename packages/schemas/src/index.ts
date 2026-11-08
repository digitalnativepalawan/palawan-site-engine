import { z } from "zod";

// Phase 0: wiring proof only. Full BusinessProfile / SiteManifest / AppConfig
// schemas land in Phase 1. See docs/STATUS.md (NOT BUILT).

export const HealthCheckSchema = z.object({
  ok: z.literal(true),
  phase: z.literal(0)
});

export type HealthCheck = z.infer<typeof HealthCheckSchema>;

export const healthCheck: HealthCheck = { ok: true, phase: 0 };
