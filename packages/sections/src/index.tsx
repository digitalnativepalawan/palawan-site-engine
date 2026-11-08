import { createElement, type ComponentType } from "react";
import { Navigation } from "./Navigation";
import { Hero } from "./Hero";
import { Statement } from "./Statement";
import { Rooms } from "./Rooms";
import { Amenities } from "./Amenities";
import { Gallery } from "./Gallery";
import { Experiences } from "./Experiences";
import { Testimonial } from "./Testimonial";
import { Location } from "./Location";
import { InquiryForm } from "./InquiryForm";
import { FAQ } from "./FAQ";
import { CTA } from "./CTA";
import { Footer } from "./Footer";
import type { BusinessProfile } from "@palawan-site-engine/schemas";
type ImageRecord = { url: string; alt: string; width?: number; height?: number };

export type SectionProps = {
  profile: BusinessProfile;
  config: Record<string, unknown>;
  variant?: string | undefined;
  navItems: Array<{ label: string; href: string }>;
  images: Record<string, ImageRecord[]>;
};

export type SectionComponent = ComponentType<SectionProps>;

function asComp(fn: (p: SectionProps) => unknown): SectionComponent {
  return ((props: SectionProps) => fn(props) as never) as SectionComponent;
}

export const registry: Record<string, SectionComponent> = {
  navigation: asComp((p) => createElement(Navigation, { profile: p.profile, navItems: p.navItems })),
  hero: asComp((p) => createElement(Hero, { profile: p.profile, config: p.config as never, variant: p.variant, images: p.images })),
  statement: asComp((p) => createElement(Statement, { profile: p.profile, config: p.config as never })),
  rooms: asComp((p) => createElement(Rooms, { profile: p.profile, config: p.config as never, images: p.images })),
  amenities: asComp((p) => createElement(Amenities, { profile: p.profile, config: p.config as never })),
  gallery: asComp((p) => createElement(Gallery, { config: p.config as never, images: p.images })),
  experiences: asComp((p) => createElement(Experiences, { profile: p.profile, config: p.config as never })),
  testimonial: asComp((p) => createElement(Testimonial, { config: p.config as never })),
  location: asComp((p) => createElement(Location, { profile: p.profile, config: p.config as never })),
  inquiry: asComp((p) => createElement(InquiryForm, { config: p.config as never })),
  faq: asComp((p) => createElement(FAQ, { config: p.config as never })),
  cta: asComp((p) => createElement(CTA, { config: p.config as never })),
  footer: asComp((p) => createElement(Footer, { profile: p.profile }))
};

export const packageName = "@palawan-site-engine/sections" as const;
export type PackageName = typeof packageName;
