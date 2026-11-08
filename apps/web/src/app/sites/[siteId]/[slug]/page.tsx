import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDemoProfile, demoProfiles, buildResort01Manifest, resort01Template } from "@palawan-site-engine/templates";
import { validateSite, resolveImageSlots } from "@palawan-site-engine/engine";
import { SiteRenderer } from "@/components/SiteRenderer";
import { PaletteSwitcher } from "@/components/PaletteSwitcher";

type Props = {
  params: Promise<{ siteId: string; slug: string }>;
};

const APP_CONFIG = { modules: { inquiry: true, booking: false }, settings: {} };

export function generateStaticParams() {
  const out: Array<{ siteId: string; slug: string }> = [];
  const slugs = ["home", "rooms", "amenities", "gallery", "location", "about", "contact"];
  for (const profile of demoProfiles) {
    for (const slug of slugs) {
      out.push({ siteId: profile.id, slug });
    }
  }
  return out;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { siteId } = await params;
  const profile = getDemoProfile(siteId);
  if (!profile) return { title: "Not found" };
  return { title: profile.seo.value.title, description: profile.seo.value.description };
}

export default async function SitePage({ params }: Props) {
  const { siteId, slug } = await params;
  const profile = getDemoProfile(siteId);
  if (!profile) notFound();
  const manifest = buildResort01Manifest("lagoon", "editorial");
  const validation = validateSite(profile, manifest, APP_CONFIG, resort01Template);
  if (!validation.ok) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Validation failed (FICTIONAL demo)</h1>
        <ul>
          {validation.issues.map((i, idx) => (
            <li key={idx}>
              <code>{i.path}</code> [{i.code}]: {i.message}
            </li>
          ))}
        </ul>
      </main>
    );
  }
  const resolvedImages = resolveImageSlots(profile, resort01Template);
  return (
    <>
      <PaletteSwitcher siteId={siteId} />
      <SiteRenderer profile={profile} manifest={manifest} appConfig={APP_CONFIG} pageSlug={slug} resolvedImages={resolvedImages} />
    </>
  );
}
