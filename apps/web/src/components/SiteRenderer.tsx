import { registry } from "@palawan-site-engine/sections";
import type { BusinessProfile, SiteManifest, AppConfig } from "@palawan-site-engine/schemas";
type ImageRecord = { url: string; alt: string; width?: number; height?: number };

export function SiteRenderer({
  profile,
  manifest,
  pageSlug,
  resolvedImages
}: {
  profile: BusinessProfile;
  manifest: SiteManifest;
  appConfig: AppConfig;
  pageSlug: string;
  resolvedImages: Record<string, ImageRecord[]>;
}) {
  const page = manifest.pages.find((p) => p.slug === pageSlug);
  if (!page) return null;
  // Fix nav hrefs to be site-scoped: /rooms -> /sites/{id}/rooms
  const scopedNav: Array<{ label: string; href: string }> = manifest.navigation.items.map((item) => {
    const slug = item.href.replace(/^\//, "");
    if (slug === "") return { label: item.label, href: `/sites/${profile.id}/home` };
    return { label: item.label, href: `/sites/${profile.id}/${slug}` };
  });
  return (
    <main>
      {page.sections.map((section) => {
        const C = registry[section.type] as import("@palawan-site-engine/sections").SectionComponent | undefined;
        if (!C) return null;
        if (section.type === "navigation") {
          return <C key={section.id} profile={profile} config={section.config} navItems={scopedNav} images={resolvedImages} />;
        }
        return (
          <C key={section.id} profile={profile} config={section.config} variant={section.variant} navItems={scopedNav} images={resolvedImages} />
        );
      })}
    </main>
  );
}
