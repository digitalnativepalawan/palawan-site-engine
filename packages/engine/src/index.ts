import { validateSite } from "./validate";
import { resolveImageSlots } from "./resolve";
import type { BusinessProfile, AppConfig, SiteManifest, TemplateDefinition } from "@palawan-site-engine/schemas";

export { validateSite, resolveImageSlots };
export type { Issue, ValidationResult } from "./validate";
export { validateSlotCounts } from "./resolve";

export function getValidationIssues(
  profile: BusinessProfile,
  manifest: SiteManifest,
  appConfig: AppConfig,
  template: TemplateDefinition
): string[] {
  const res = validateSite(profile, manifest, appConfig, template);
  return res.issues.map((i) => `${i.path} [${i.code}]: ${i.message}`);
}
