import { describe, expect, it } from "vitest";
import { validateSite } from "./validate";
import { resolveImageSlots } from "./resolve";
import type { TemplateDefinition } from "@palawan-site-engine/schemas";

const template: TemplateDefinition = {
  id: "resort-01",
  name: "Resort 01",
  imageSlots: {
    hero: { min: 1, max: 3, label: "hero" },
    rooms: { min: 2, max: 6, label: "rooms" },
    gallery: { min: 2, max: 8, label: "gallery" }
  },
  copyLimits: { tagline: 120, description: 800, name: 120 },
  requiresVerified: ["location", "contact"]
};

function validProfile() {
  return {
    id: "amihan",
    name: { value: "Amihan (FICTIONAL)", status: "verified" as const },
    industry: "resort" as const,
    tagline: {
      value: "Wake before the island does.",
      status: "verified" as const
    },
    description: {
      value: "Seven villas on a quiet lagoon. (FICTIONAL)",
      status: "verified" as const
    },
    location: {
      value: { address: "Lagoon Road (FICTIONAL)", city: "San Vicente", region: "Palawan", country: "Philippines" },
      status: "verified" as const
    },
    contact: {
      value: { email: "hello@amihan.example", phone: "+63 900 000 0000" },
      status: "verified" as const
    },
    hours: {
      value: { timezone: "Asia/Manila", lines: [{ day: "Daily", open: "07:00", close: "22:00" }] },
      status: "verified" as const
    },
    socials: { value: {}, status: "verified" as const },
    services: {
      value: [{ name: "Sunrise boat", description: "A bangka leaves at 5:30. (FICTIONAL)" }],
      status: "verified" as const
    },
    rooms: {
      value: [
        { name: "Tide Villa", description: "Over water. (FICTIONAL)", sleeps: 2 },
        { name: "Karst Villa", description: "On the point. (FICTIONAL)", sleeps: 4 }
      ],
      status: "verified" as const
    },
    amenities: {
      value: [{ name: "House reef", description: "Ten minutes from deck. (FICTIONAL)" }],
      status: "verified" as const
    },
    images: {
      value: {
        hero: [{ url: "/images/hero-1.svg", alt: "Lagoon dawn (FICTIONAL SVG)" }],
        rooms: [
          { url: "/images/room-1.svg", alt: "Villa (FICTIONAL SVG)" },
          { url: "/images/room-2.svg", alt: "Villa 2 (FICTIONAL SVG)" }
        ],
        gallery: [
          { url: "/images/gal-1.svg", alt: "Reef (FICTIONAL SVG)" },
          { url: "/images/gal-2.svg", alt: "Beach (FICTIONAL SVG)" }
        ]
      },
      status: "verified" as const
    },
    seo: {
      value: { title: "Amihan (FICTIONAL)", description: "Lagoon villas. (FICTIONAL)" },
      status: "verified" as const
    }
  };
}

function validManifest() {
  return {
    templateId: "resort-01",
    themeId: "cinematic-dawn",
    palette: "lagoon",
    fontPair: "editorial",
    navigation: { items: [{ label: "Rooms", href: "/rooms" }, { label: "Contact", href: "/contact" }] },
    pages: [
      {
        slug: "home",
        title: "Home",
        sections: [
          { id: "nav", type: "navigation", config: { sticky: true, showCTA: true } },
          { id: "hero", type: "hero", variant: "scroll-sunrise", config: { headline: "Wake before the island does.", imageSlot: "hero" } },
          { id: "foot", type: "footer", config: { showSocials: true } }
        ]
      }
    ],
    motionPreset: "cinematic" as const,
    responsive: { maxContentWidth: 1200, mobileNav: "overlay" as const }
  };
}

describe("validateSite", () => {
  it("accepts a valid site", () => {
    const res = validateSite(validProfile(), validManifest(), { modules: { inquiry: true, booking: false }, settings: {} }, template);
    expect(res.ok).toBe(true);
    expect(res.issues).toEqual([]);
  });

  it("reports missing required fields", () => {
    const p = { ...validProfile() };
    // @ts-expect-error deliberate
    delete p.name;
    const res = validateSite(p, validManifest(), { modules: { inquiry: true, booking: false } }, template);
    expect(res.ok).toBe(false);
    expect(res.issues.some((i) => i.path.includes("profile.name"))).toBe(true);
  });

  it("reports over-length copy", () => {
    const p = validProfile();
    p.tagline = { value: "x".repeat(200), status: "verified" };
    const res = validateSite(p, validManifest(), { modules: { inquiry: true, booking: false } }, template);
    expect(res.issues.some((i) => i.code === "copy_too_long")).toBe(true);
  });

  it("reports too few images", () => {
    const p = validProfile();
    p.images.value.rooms = [{ url: "/a.svg", alt: "a" }];
    const res = validateSite(p, validManifest(), { modules: { inquiry: true, booking: false } }, template);
    expect(res.issues.some((i) => i.code === "too_few_images")).toBe(true);
  });

  it("reports too many images", () => {
    const p = validProfile();
    p.images.value.gallery = Array.from({ length: 9 }, (_, i) => ({ url: `/g${i}.svg`, alt: `g${i}` }));
    const res = validateSite(p, validManifest(), { modules: { inquiry: true, booking: false } }, template);
    expect(res.issues.some((i) => i.code === "too_many_images")).toBe(true);
  });

  it("reports broken internal links", () => {
    const m = validManifest();
    m.navigation.items = [{ label: "Nowhere", href: "/nowhere" }];
    const res = validateSite(validProfile(), m, { modules: { inquiry: true, booking: false } }, template);
    expect(res.issues.some((i) => i.code === "broken_link")).toBe(true);
  });

  it("reports empty SEO", () => {
    const p = validProfile();
    p.seo = { value: { title: "", description: "" }, status: "verified" };
    const res = validateSite(p, validManifest(), { modules: { inquiry: true, booking: false } }, template);
    expect(res.issues.some((i) => i.code === "empty_seo")).toBe(true);
  });

  it("reports invalid section config", () => {
    const m = validManifest();
    (m.pages[0] as unknown as { sections: Array<{ config: unknown }> }).sections[1]!.config = { headline: 12345 };
    const res = validateSite(validProfile(), m, { modules: { inquiry: true, booking: false } }, template);
    expect(res.issues.some((i) => i.code === "invalid_section_config")).toBe(true);
  });

  it("reports unverified facts where verified required", () => {
    const p = validProfile();
    (p as unknown as { location: unknown }).location = { ...p.location, status: "unverified" as const };
    const res = validateSite(p, validManifest(), { modules: { inquiry: true, booking: false } }, template);
    expect(res.issues.some((i) => i.code === "unverified_fact")).toBe(true);
  });

  it("resolveImageSlots throws on too few", () => {
    const p = validProfile();
    p.images.value.gallery = [];
    expect(() => resolveImageSlots(p, template)).toThrow(/Too few/);
  });
});
