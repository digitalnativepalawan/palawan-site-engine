import type { BusinessProfile } from "@palawan-site-engine/schemas";

// FICTIONAL demo profiles — no real business data.
export const profileAmihan: BusinessProfile = {
  id: "amihan",
  name: { value: "Amihan Lagoon Villas (FICTIONAL)", status: "verified", source: "fictional seed" },
  industry: "resort",
  tagline: { value: "Wake before the island does.", status: "verified" },
  description: {
    value:
      "There is no lobby here and no schedule. Breakfast arrives when you ask, the reef starts at your deck, and the only thing we plan is the tide. (FICTIONAL demo copy.)",
    status: "verified"
  },
  location: {
    value: { address: "Lagoon Road (FICTIONAL)", city: "San Vicente", region: "Palawan", country: "Philippines" },
    status: "verified",
    source: "fictional seed"
  },
  contact: {
    value: { email: "hello@amihan.example", phone: "+63 900 000 0000" },
    status: "verified",
    source: "fictional seed"
  },
  hours: {
    value: {
      timezone: "Asia/Manila",
      lines: [
        { day: "Daily", open: "07:00", close: "22:00" },
        { day: "Boat departures", open: "05:30", close: "17:00" }
      ]
    },
    status: "verified"
  },
  socials: { value: { instagram: "https://instagram.com/amihan.example" }, status: "verified" },
  services: {
    value: [
      { name: "Sunrise boat to the coves", description: "A bangka leaves the jetty at 5:30. Coffee on board. (FICTIONAL)" },
      { name: "Snorkel the house reef", description: "Ten minutes from the deck. Guides and gear included. (FICTIONAL)" },
      { name: "Dinner on the sandbar", description: "Tide permitting. A table in the shallows. (FICTIONAL)" }
    ],
    status: "verified"
  },
  rooms: {
    value: [
      { name: "Tide Villa", description: "Built over the water. The deck steps straight into the lagoon. (FICTIONAL)", sleeps: 2, pricePerNight: "₱14,500 / night (FICTIONAL)" },
      { name: "Karst Villa", description: "On the limestone point, with a plunge pool. (FICTIONAL)", sleeps: 4, pricePerNight: "₱21,000 / night (FICTIONAL)" },
      { name: "Canopy Villa", description: "Raised in the coconut grove. (FICTIONAL)", sleeps: 3, pricePerNight: "₱11,800 / night (FICTIONAL)" }
    ],
    status: "verified"
  },
  amenities: {
    value: [
      { name: "House reef", description: "Snorkel from your deck. (FICTIONAL)" },
      { name: "Breakfast on demand", description: "Brought to your deck when you ask. (FICTIONAL)" },
      { name: "Sunrise boat", description: "Leaves at 5:30. (FICTIONAL)" }
    ],
    status: "verified"
  },
  images: {
    value: {
      hero: [{ url: "/images/hero-lagoon.svg", alt: "Lagoon dawn (FICTIONAL SVG)" }],
      rooms: [
        { url: "/images/room-tide.svg", alt: "Tide Villa (FICTIONAL SVG)" },
        { url: "/images/room-karst.svg", alt: "Karst Villa (FICTIONAL SVG)" },
        { url: "/images/room-canopy.svg", alt: "Canopy Villa (FICTIONAL SVG)" }
      ],
      gallery: [
        { url: "/images/gallery-reef.svg", alt: "House reef (FICTIONAL SVG)" },
        { url: "/images/gallery-boat.svg", alt: "Sunrise boat (FICTIONAL SVG)" },
        { url: "/images/gallery-sandbar.svg", alt: "Sandbar dinner (FICTIONAL SVG)" },
        { url: "/images/gallery-deck.svg", alt: "Morning deck (FICTIONAL SVG)" }
      ]
    },
    status: "verified"
  },
  seo: {
    value: { title: "Amihan Lagoon Villas (FICTIONAL)", description: "Lagoon villas in northern Palawan. (FICTIONAL demo.)" },
    status: "verified"
  }
};

export const profileSibuyan: BusinessProfile = {
  id: "sibuyan",
  name: { value: "Sibuyan Tide Retreat (FICTIONAL)", status: "verified", source: "fictional seed" },
  industry: "resort",
  tagline: { value: "Slow mornings, loud sunsets, no checkout rush.", status: "verified" },
  description: {
    value:
      "Five pavilions behind a mangrove boardwalk, a kitchen that cooks with the day's catch, and a jetty that never really closes. We built Sibuyan for people who measure a day by the tide, not the clock — and yes, this paragraph is deliberately longer than the other demo profile so you can see copy limits and image counts differ. (FICTIONAL demo copy.)",
    status: "verified"
  },
  location: {
    value: { address: "Mangrove Boardwalk (FICTIONAL)", city: "El Nido", region: "Palawan", country: "Philippines" },
    status: "verified",
    source: "fictional seed"
  },
  contact: {
    value: { email: "stay@sibuyan.example", phone: "+63 901 111 1111" },
    status: "verified",
    source: "fictional seed"
  },
  hours: {
    value: {
      timezone: "Asia/Manila",
      lines: [
        { day: "Monday – Friday", open: "06:30", close: "21:30" },
        { day: "Saturday", open: "06:30", close: "23:00" },
        { day: "Sunday", open: "07:00", close: "20:00" }
      ]
    },
    status: "verified"
  },
  socials: { value: { facebook: "https://facebook.com/sibuyan.example" }, status: "verified" },
  services: {
    value: [
      { name: "Mangrove kayaks at dawn", description: "Paddles out before the heat. (FICTIONAL)" },
      { name: "Catch-and-cook supper", description: "You fish, we grill. (FICTIONAL)" },
      { name: "Reef night snorkel", description: "Torch-lit, guide-led. (FICTIONAL)" },
      { name: "Boardwalk breakfasts", description: "Served on the water. (FICTIONAL)" }
    ],
    status: "verified"
  },
  rooms: {
    value: [
      { name: "Mangrove Pavilion", description: "Over the mangroves, screened and breezy. (FICTIONAL)", sleeps: 2, pricePerNight: "₱9,800 / night (FICTIONAL)" },
      { name: "Tide Bungalow", description: "Ground floor, garden shower. (FICTIONAL)", sleeps: 3, pricePerNight: "₱12,400 / night (FICTIONAL)" },
      { name: "Jetty Family Villa", description: "Two bedrooms, big deck, sunset front row. (FICTIONAL)", sleeps: 6, pricePerNight: "₱18,900 / night (FICTIONAL)" },
      { name: "Kitchen Garden Suite", description: "Upper floor above the kitchen garden. (FICTIONAL)", sleeps: 2, pricePerNight: "₱10,200 / night (FICTIONAL)" },
      { name: "Longhouse Room", description: "Shared longhouse, private alcoves. (FICTIONAL)", sleeps: 2, pricePerNight: "₱7,600 / night (FICTIONAL)" }
    ],
    status: "verified"
  },
  amenities: {
    value: [
      { name: "Mangrove boardwalk", description: "Lit at night. (FICTIONAL)" },
      { name: "Catch-and-cook kitchen", description: "Day's catch, cooked your way. (FICTIONAL)" },
      { name: "Jetty bar", description: "Sunset drinks. (FICTIONAL)" },
      { name: "Night snorkel gear", description: "Torches and wetsuits. (FICTIONAL)" }
    ],
    status: "verified"
  },
  images: {
    value: {
      hero: [
        { url: "/images/hero-tide.svg", alt: "Tide pavilions (FICTIONAL SVG)" },
        { url: "/images/hero-sunset.svg", alt: "Sunset jetty (FICTIONAL SVG)" }
      ],
      rooms: [
        { url: "/images/room-mangrove.svg", alt: "Mangrove Pavilion (FICTIONAL SVG)" },
        { url: "/images/room-bungalow.svg", alt: "Tide Bungalow (FICTIONAL SVG)" },
        { url: "/images/room-jetty.svg", alt: "Jetty Villa (FICTIONAL SVG)" },
        { url: "/images/room-kitchen.svg", alt: "Kitchen Suite (FICTIONAL SVG)" },
        { url: "/images/room-longhouse.svg", alt: "Longhouse (FICTIONAL SVG)" }
      ],
      gallery: [
        { url: "/images/gallery-kayak.svg", alt: "Dawn kayaks (FICTIONAL SVG)" },
        { url: "/images/gallery-grill.svg", alt: "Catch and cook (FICTIONAL SVG)" },
        { url: "/images/gallery-night.svg", alt: "Night snorkel (FICTIONAL SVG)" },
        { url: "/images/gallery-boardwalk.svg", alt: "Boardwalk (FICTIONAL SVG)" },
        { url: "/images/gallery-bar.svg", alt: "Jetty bar (FICTIONAL SVG)" },
        { url: "/images/gallery-pavilion.svg", alt: "Pavilion deck (FICTIONAL SVG)" }
      ]
    },
    status: "verified"
  },
  seo: {
    value: { title: "Sibuyan Tide Retreat (FICTIONAL)", description: "Tide-side retreat with mangrove pavilions. (FICTIONAL demo.)" },
    status: "verified"
  }
};

export const demoProfiles: BusinessProfile[] = [profileAmihan, profileSibuyan];

export function getDemoProfile(id: string): BusinessProfile | undefined {
  return demoProfiles.find((p) => p.id === id);
}
