import { z } from "zod";

// ─── Provenance ────────────────────────────────────────────────────────────
// Every factual field carries provenance: { value, status, source? }
export const ProvenanceStatus = z.enum(["verified", "unverified", "assumed"]);
export type ProvenanceStatus = z.infer<typeof ProvenanceStatus>;

export const prov = <T extends z.ZodTypeAny>(valueSchema: T) =>
  z.object({
    value: valueSchema,
    status: ProvenanceStatus,
    source: z.string().optional()
  });

export type Prov<T> = {
  value: T;
  status: ProvenanceStatus;
  source?: string;
};

export const provenance = (value: string, status: ProvenanceStatus = "verified", source?: string) => ({
  value,
  status,
  source
});

export const provObj = <T>(value: T, status: ProvenanceStatus = "verified", source?: string) => ({
  value,
  status,
  source
});

// ─── BusinessProfile ───────────────────────────────────────────────────────

export const LocationValue = z.object({
  address: z.string().min(1),
  city: z.string().min(1).max(120),
  region: z.string().min(1).max(120),
  country: z.string().min(1).max(120),
  lat: z.number().optional(),
  lng: z.number().optional()
});

export const ContactValue = z.object({
  email: z.string().email().max(120),
  phone: z.string().min(1).max(40),
  whatsapp: z.string().max(40).optional()
});

export const HoursValue = z.object({
  timezone: z.string().min(1).max(60),
  lines: z.array(
    z.object({
      day: z.string().min(1).max(40),
      open: z.string().min(1).max(20),
      close: z.string().min(1).max(20)
    })
  )
});

export const SocialsValue = z.object({
  instagram: z.string().url().optional(),
  facebook: z.string().url().optional(),
  tiktok: z.string().url().optional()
});

export const ServiceValue = z.object({
  name: z.string().min(1).max(120),
  description: z.string().min(1).max(400)
});

export const RoomValue = z.object({
  name: z.string().min(1).max(120),
  description: z.string().min(1).max(400),
  sleeps: z.number().int().min(1).max(12),
  pricePerNight: z.string().max(40).optional(),
  imageSlot: z.string().min(1).max(60).optional()
});

export const AmenityValue = z.object({
  name: z.string().min(1).max(120),
  description: z.string().min(1).max(400).optional()
});

export const ImageValue = z.object({
  url: z.string().min(1).max(2048),
  alt: z.string().min(1).max(200),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional()
});

export const ImagesValue = z.record(z.string(), z.array(ImageValue));

export const SEOValue = z.object({
  title: z.string().max(120),
  description: z.string().max(300),
  keywords: z.array(z.string().max(60)).max(10).optional()
});

export const Industry = z.enum(["resort", "cafe", "restaurant", "tour", "service"]);
export type Industry = z.infer<typeof Industry>;

export const BusinessProfileSchema = z.object({
  id: z.string().min(1).max(60),
  name: prov(z.string().min(1)),
  industry: Industry,
  tagline: prov(z.string().min(1)),
  description: prov(z.string().min(1)),
  location: prov(LocationValue),
  contact: prov(ContactValue),
  hours: prov(HoursValue),
  socials: prov(SocialsValue),
  services: prov(z.array(ServiceValue).min(1).max(12)),
  rooms: prov(z.array(RoomValue).min(1).max(20)),
  amenities: prov(z.array(AmenityValue).min(1).max(20)),
  images: prov(ImagesValue),
  seo: prov(SEOValue)
});

export type BusinessProfile = z.infer<typeof BusinessProfileSchema>;

// ─── SiteManifest ──────────────────────────────────────────────────────────

export const NavItem = z.object({
  label: z.string().min(1).max(60),
  href: z.string().min(1).max(200)
});

export const SectionInstance = z.object({
  id: z.string().min(1).max(80),
  type: z.string().min(1).max(60),
  variant: z.string().max(60).optional(),
  config: z.record(z.string(), z.unknown())
});

export const PageManifest = z.object({
  slug: z.string().min(1).max(80),
  title: z.string().min(1).max(120),
  sections: z.array(SectionInstance).min(1).max(40)
});

export const SiteManifestSchema = z.object({
  templateId: z.string().min(1).max(80),
  themeId: z.string().min(1).max(80),
  palette: z.string().min(1).max(40),
  fontPair: z.string().min(1).max(60),
  navigation: z.object({
    items: z.array(NavItem).min(1).max(12)
  }),
  pages: z.array(PageManifest).min(1).max(20),
  motionPreset: z.enum(["none", "subtle", "cinematic"]),
  responsive: z.object({
    maxContentWidth: z.number().int().min(320).max(1600).default(1200),
    mobileNav: z.enum(["overlay", "inline"]).default("overlay")
  })
});

export type SiteManifest = z.infer<typeof SiteManifestSchema>;

// ─── AppConfig ─────────────────────────────────────────────────────────────

export const AppConfigSchema = z.object({
  modules: z.object({
    inquiry: z.boolean().default(true),
    booking: z.boolean().default(false)
  }),
  settings: z.record(z.string(), z.unknown()).default({})
});

export type AppConfig = z.infer<typeof AppConfigSchema>;

// ─── Section configs + defaults ────────────────────────────────────────────

export const NavigationConfig = z.object({
  sticky: z.boolean().default(true),
  showCTA: z.boolean().default(true)
});
export const HeroConfig = z.object({
  headline: z.string().max(120).default(""),
  subheadline: z.string().max(300).default(""),
  primaryCTA: z.string().max(60).default(""),
  primaryHref: z.string().max(200).default("/contact"),
  imageSlot: z.string().max(60).default("hero"),
  showClock: z.boolean().default(false)
});
export const StatementConfig = z.object({
  text: z.string().max(600).default(""),
  revealOnScroll: z.boolean().default(true)
});
export const RoomsConfig = z.object({
  heading: z.string().max(120).default("Rooms"),
  showPrices: z.boolean().default(true)
});
export const AmenitiesConfig = z.object({
  heading: z.string().max(120).default("Amenities")
});
export const GalleryConfig = z.object({
  heading: z.string().max(120).default("Gallery"),
  imageSlot: z.string().max(60).default("gallery")
});
export const ExperiencesConfig = z.object({
  heading: z.string().max(120).default("Experiences")
});
export const TestimonialConfig = z.object({
  quote: z.string().max(500).optional(),
  author: z.string().max(120).optional(),
  source: z.string().max(120).optional(),
  fictional: z.boolean().default(true)
});
export const LocationConfig = z.object({
  heading: z.string().max(120).default("Location"),
  showMapLink: z.boolean().default(true)
});
export const InquiryConfig = z.object({
  heading: z.string().max(120).default("Send an inquiry"),
  subheading: z.string().max(300).optional()
});
export const FAQConfig = z.object({
  heading: z.string().max(120).default("FAQ"),
  items: z
    .array(
      z.object({
        question: z.string().max(200),
        answer: z.string().max(600)
      })
    )
    .default([])
});
export const CTAConfig = z.object({
  heading: z.string().max(200).default(""),
  subheading: z.string().max(300).optional(),
  primaryCTA: z.string().max(60).default(""),
  primaryHref: z.string().max(200).default("/contact")
});
export const FooterConfig = z.object({
  showSocials: z.boolean().default(true)
});

export const SectionConfigSchemas = {
  navigation: NavigationConfig,
  hero: HeroConfig,
  statement: StatementConfig,
  rooms: RoomsConfig,
  amenities: AmenitiesConfig,
  gallery: GalleryConfig,
  experiences: ExperiencesConfig,
  testimonial: TestimonialConfig,
  location: LocationConfig,
  inquiry: InquiryConfig,
  faq: FAQConfig,
  cta: CTAConfig,
  footer: FooterConfig
} as const;

export type SectionType = keyof typeof SectionConfigSchemas;

export const sectionDefaults: Record<SectionType, Record<string, unknown>> = {
  navigation: { sticky: true, showCTA: true },
  hero: { headline: "", subheadline: "", primaryCTA: "", primaryHref: "/contact", imageSlot: "hero", showClock: false },
  statement: { text: "", revealOnScroll: true },
  rooms: { heading: "Rooms", showPrices: true },
  amenities: { heading: "Amenities" },
  gallery: { heading: "Gallery", imageSlot: "gallery" },
  experiences: { heading: "Experiences" },
  testimonial: { fictional: true },
  location: { heading: "Location", showMapLink: true },
  inquiry: { heading: "Send an inquiry" },
  faq: { heading: "FAQ", items: [] },
  cta: { heading: "", primaryCTA: "", primaryHref: "/contact" },
  footer: { showSocials: true }
};

// ─── Template definition (image slots + copy limits) ───────────────────────

export const TemplateDefinitionSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageSlots: z.record(
    z.string(),
    z.object({
      min: z.number().int().min(0),
      max: z.number().int().min(1),
      label: z.string()
    })
  ),
  copyLimits: z.record(z.string(), z.number().int().positive()),
  requiresVerified: z.array(z.string())
});

export type TemplateDefinition = z.infer<typeof TemplateDefinitionSchema>;

// ─── HealthCheck (retained for Phase 0 compat) ─────────────────────────────

export const HealthCheckSchema = z.object({
  ok: z.literal(true),
  phase: z.literal(0)
});
export type HealthCheck = z.infer<typeof HealthCheckSchema>;
export const healthCheck: HealthCheck = { ok: true, phase: 0 };
