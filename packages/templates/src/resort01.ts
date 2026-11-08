import type { SiteManifest, TemplateDefinition } from "@palawan-site-engine/schemas";

export const resort01Template: TemplateDefinition = {
  id: "resort-01",
  name: "Resort 01 — Cinematic Dawn",
  imageSlots: {
    hero: { min: 1, max: 3, label: "hero scenes" },
    rooms: { min: 2, max: 6, label: "room images" },
    gallery: { min: 2, max: 8, label: "gallery images" }
  },
  copyLimits: {
    name: 120,
    tagline: 120,
    description: 800,
    "location.address": 240
  },
  requiresVerified: ["location", "contact"]
};

function sec(id: string, type: string, config: Record<string, unknown>, variant?: string) {
  return variant ? { id, type, variant, config } : { id, type, config };
}

export function buildResort01Manifest(palette: string, fontPair: string): SiteManifest {
  const nav = [
    { label: "Home", href: "/home" },
    { label: "Rooms", href: "/rooms" },
    { label: "Amenities", href: "/amenities" },
    { label: "Gallery", href: "/gallery" },
    { label: "Location", href: "/location" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ];
  const navigation = sec("nav", "navigation", { sticky: true, showCTA: true });
  const footer = sec("foot", "footer", { showSocials: true });
  const heroSunrise = (id: string) =>
    sec(id, "hero", { headline: "", subheadline: "", primaryCTA: "Send an inquiry", primaryHref: "/contact", imageSlot: "hero", showClock: true }, "scroll-sunrise");
  const heroSplit = (id: string) =>
    sec(id, "hero", { headline: "", subheadline: "", primaryCTA: "Send an inquiry", primaryHref: "/contact", imageSlot: "hero", showClock: false }, "split-image");

  return {
    templateId: "resort-01",
    themeId: "cinematic-dawn",
    palette,
    fontPair,
    navigation: { items: nav },
    pages: [
      {
        slug: "home",
        title: "Home",
        sections: [
          navigation,
          heroSunrise("hero-home"),
          sec("stmt", "statement", { text: "", revealOnScroll: true }),
          sec("rooms", "rooms", { heading: "Three ways to stay", showPrices: true }),
          sec("gal", "gallery", { heading: "Days on the water", imageSlot: "gallery" }),
          sec("quote", "testimonial", { fictional: true }),
          sec("exp", "experiences", { heading: "What a day can hold" }),
          sec("inq", "inquiry", { heading: "Tell us when you would like to wake up here." }),
          footer
        ]
      },
      {
        slug: "rooms",
        title: "Rooms",
        sections: [
          navigation,
          heroSplit("hero-rooms"),
          sec("rooms", "rooms", { heading: "Rooms", showPrices: true }),
          sec("am", "amenities", { heading: "Amenities" }),
          sec("cta", "cta", { heading: "Tell us when you would like to wake up here.", primaryCTA: "Send my dates", primaryHref: "/contact" }),
          footer
        ]
      },
      {
        slug: "amenities",
        title: "Amenities",
        sections: [
          navigation,
          heroSplit("hero-amenities"),
          sec("am", "amenities", { heading: "Amenities" }),
          sec("gal", "gallery", { heading: "Gallery", imageSlot: "gallery" }),
          footer
        ]
      },
      {
        slug: "gallery",
        title: "Gallery",
        sections: [
          navigation,
          heroSplit("hero-gallery"),
          sec("gal", "gallery", { heading: "Gallery", imageSlot: "gallery" }),
          footer
        ]
      },
      {
        slug: "location",
        title: "Location",
        sections: [
          navigation,
          heroSplit("hero-location"),
          sec("loc", "location", { heading: "Location", showMapLink: true }),
          sec("inq", "inquiry", { heading: "Send an inquiry" }),
          footer
        ]
      },
      {
        slug: "about",
        title: "About",
        sections: [
          navigation,
          heroSplit("hero-about"),
          sec("stmt", "statement", { text: "", revealOnScroll: true }),
          sec("quote", "testimonial", { fictional: true }),
          footer
        ]
      },
      {
        slug: "contact",
        title: "Contact",
        sections: [
          navigation,
          heroSplit("hero-contact"),
          sec("loc", "location", { heading: "Location", showMapLink: true }),
          sec("inq", "inquiry", { heading: "Send an inquiry" }),
          sec("faq", "faq", { heading: "FAQ", items: [] }),
          footer
        ]
      }
    ],
    motionPreset: "cinematic",
    responsive: { maxContentWidth: 1200, mobileNav: "overlay" }
  };
}

export const resort01Pages = ["home", "rooms", "amenities", "gallery", "location", "about", "contact"];
