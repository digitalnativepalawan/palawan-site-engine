import {
  AppConfigSchema,
  BusinessProfileSchema,
  SiteManifestSchema,
  SectionConfigSchemas,
  sectionDefaults,
  type AppConfig,
  type BusinessProfile,
  type SiteManifest,
  type TemplateDefinition
} from "@palawan-site-engine/schemas";

export type Issue = {
  path: string;
  code: string;
  message: string;
};

export type ValidationResult = {
  ok: boolean;
  issues: Issue[];
};

const VALID_PAGE_SLUGS = ["home", "rooms", "amenities", "gallery", "location", "about", "contact"];

export function validateSite(
  profile: unknown,
  manifest: unknown,
  appConfig: unknown,
  template: TemplateDefinition
): ValidationResult {
  const issues: Issue[] = [];

  // 1. Zod validation of all three inputs
  const pRes = BusinessProfileSchema.safeParse(profile);
  if (!pRes.success) {
    for (const issue of pRes.error.issues) {
      issues.push({
        path: `profile.${issue.path.join(".") || "$"}`,
        code: "missing_or_invalid",
        message: issue.message
      });
    }
  }
  const mRes = SiteManifestSchema.safeParse(manifest);
  if (!mRes.success) {
    for (const issue of mRes.error.issues) {
      issues.push({
        path: `manifest.${issue.path.join(".") || "$"}`,
        code: "invalid_manifest",
        message: issue.message
      });
    }
  }
  const aRes = AppConfigSchema.safeParse(appConfig);
  if (!aRes.success) {
    for (const issue of aRes.error.issues) {
      issues.push({
        path: `appConfig.${issue.path.join(".") || "$"}`,
        code: "invalid_app_config",
        message: issue.message
      });
    }
  }
  if (!pRes.success || !mRes.success || !aRes.success) {
    return { ok: false, issues };
  }

  const bp: BusinessProfile = pRes.data;
  const sm: SiteManifest = mRes.data;
  const ac: AppConfig = aRes.data;

  // 2. Over-length copy (template copyLimits)
  for (const [field, max] of Object.entries(template.copyLimits)) {
    const value = getCopy(bp, field);
    if (value !== undefined && value.length > max) {
      issues.push({
        path: `profile.${field}.value`,
        code: "copy_too_long",
        message: `Too long: ${value.length} chars, max ${max} for "${field}"`
      });
    }
  }

  // 3. Image slots too few / too many
  for (const [slot, spec] of Object.entries(template.imageSlots)) {
    const list = bp.images.value[slot] ?? [];
    if (list.length < spec.min) {
      issues.push({
        path: `profile.images.value.${slot}`,
        code: "too_few_images",
        message: `Too few images in slot "${slot}": ${list.length}, min ${spec.min} (${spec.label})`
      });
    }
    if (list.length > spec.max) {
      issues.push({
        path: `profile.images.value.${slot}`,
        code: "too_many_images",
        message: `Too many images in slot "${slot}": ${list.length}, max ${spec.max} (${spec.label})`
      });
    }
  }

  // 4. Broken internal links (navigation + CTA hrefs must be known pages or external)
  const validSlugs = new Set([...VALID_PAGE_SLUGS, ...sm.pages.map((p) => p.slug)]);
  for (const item of sm.navigation.items) {
    if (item.href.startsWith("/") && !isKnownInternal(item.href, validSlugs)) {
      issues.push({
        path: "manifest.navigation.items",
        code: "broken_link",
        message: `Broken internal link "${item.href}" in navigation (${item.label})`
      });
    }
  }

  // 5. Empty SEO fields
  if (!bp.seo.value.title.trim()) {
    issues.push({ path: "profile.seo.value.title", code: "empty_seo", message: "SEO title is empty" });
  }
  if (!bp.seo.value.description.trim()) {
    issues.push({ path: "profile.seo.value.description", code: "empty_seo", message: "SEO description is empty" });
  }

  // 6. Invalid section config (each section validated against its schema)
  for (const page of sm.pages) {
    for (const section of page.sections) {
      const schema = (SectionConfigSchemas as Record<string, { safeParse: (v: unknown) => { success: boolean; error?: { issues: Array<{ path: Array<string | number>; message: string }> } } }>)[section.type];
      if (!schema) {
        issues.push({
          path: `manifest.pages.${page.slug}.${section.id}`,
          code: "invalid_section_config",
          message: `Unknown section type "${section.type}"`
        });
        continue;
      }
      const res = schema.safeParse(section.config);
      if (!res.success) {
        if (!res.error) continue;
        for (const issue of res.error.issues) {
          issues.push({
            path: `manifest.pages.${page.slug}.${section.id}.${issue.path.join(".")}`,
            code: "invalid_section_config",
            message: issue.message
          });
        }
      }
    }
  }

  // 7. Unverified facts where verified required
  for (const field of template.requiresVerified) {
    const fieldObj = (bp as unknown as Record<string, { status: string } | undefined>)[field];
    if (fieldObj && fieldObj.status !== "verified") {
      issues.push({
        path: `profile.${field}.status`,
        code: "unverified_fact",
        message: `Field "${field}" must be verified (currently "${fieldObj.status}")`
      });
    }
  }

  // Module-disabled check (Phase 3 prep): if manifest uses inquiry section but module disabled
  if (!ac.modules.inquiry) {
    for (const page of sm.pages) {
      if (page.sections.some((s) => s.type === "inquiry")) {
        issues.push({
          path: "appConfig.modules.inquiry",
          code: "module_disabled",
          message: `Inquiry module disabled but page "${page.slug}" references an inquiry section`
        });
      }
    }
  }

  return { ok: issues.length === 0, issues };
}

function getCopy(bp: BusinessProfile, field: string): string | undefined {
  const v = (bp as unknown as Record<string, { value?: unknown } | undefined>)[field];
  if (v && typeof v.value === "string") return v.value;
  if (v && typeof v.value === "object" && v.value !== null && "address" in (v.value as Record<string, unknown>)) {
    return (v.value as { address: string }).address;
  }
  return undefined;
}

function isKnownInternal(href: string, slugs: Set<string>): boolean {
  // href like "/contact", "/rooms", "/", "/sites/amihan/contact"
  const parts = href.split("/").map((s) => s.trim()).filter(Boolean);
  const last = parts[parts.length - 1];
  if (href === "/" || last === undefined) return true;
  if (slugs.has(last)) return true;
  if (last === "contact" || last === "rooms" || last === "gallery" || last === "location" || last === "about" || last === "amenities" || last === "home") return true;
  return false;
}

// Re-export defaults helper for templates
export function withDefaults(type: string, config: Record<string, unknown>): Record<string, unknown> {
  const defaults = (sectionDefaults as Record<string, Record<string, unknown>>)[type] ?? {};
  return { ...defaults, ...config };
}
