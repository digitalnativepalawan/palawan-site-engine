import type { BusinessProfile } from "@palawan-site-engine/schemas";
type ImageRecord = { url: string; alt: string; width?: number; height?: number };

type Props = {
  profile: BusinessProfile;
  config: { headline?: string; subheadline?: string; primaryCTA?: string; primaryHref?: string; imageSlot?: string; showClock?: boolean };
  variant?: string | undefined;
  images: Record<string, ImageRecord[]>;
};

export function Hero({ profile, config, variant, images }: Props) {
  const headline = config.headline && config.headline.length > 0 ? config.headline : profile.tagline.value;
  const subheadline = config.subheadline && config.subheadline.length > 0 ? config.subheadline : profile.description.value;
  const primaryCTA = config.primaryCTA && config.primaryCTA.length > 0 ? config.primaryCTA : "Send an inquiry";
  const primaryHref = config.primaryHref || "/contact";
  const slot = config.imageSlot || "hero";
  const slotImages = images[slot] ?? [];

  if (variant === "split-image") {
    const img = slotImages[0];
    return (
      <header className="pse-hero pse-hero-split">
        <div className="pse-hero-text">
          <h1>{headline}</h1>
          <p>{subheadline}</p>
          <a className="pse-btn" href={primaryHref}>
            {primaryCTA}
          </a>
        </div>
        <div className="pse-hero-media" aria-hidden={img ? undefined : true}>
          {img ? (
            <img src={img.url} alt={img.alt} width={img.width ?? 1200} height={img.height ?? 800} loading="eager" />
          ) : (
            <div className="pse-hero-placeholder">FICTIONAL SVG — {slot}</div>
          )}
          <p className="pse-fictional">Demo images are generated SVG scenes, labeled FICTIONAL. Slots also accept real photos.</p>
        </div>
      </header>
    );
  }

  // scroll-sunrise (reference: docs/reference/amihan.html)
  const img = slotImages[0];
  return (
    <header className="pse-hero pse-hero-sunrise">
      <div className="pse-sunrise-stage">
        <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="pse-sunrise-svg">
          <defs>
            <radialGradient id="pse-glow">
              <stop offset="0" stopColor="var(--sun)" stopOpacity="0.9" />
              <stop offset="1" stopColor="var(--sun)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="1600" height="650" fill="var(--p5)" />
          <circle cx="1010" cy="460" r="64" fill="var(--sun)" />
          <circle cx="1010" cy="460" r="330" fill="url(#pse-glow)" opacity="0.6" />
          <path d="M0 650C300 620 500 660 800 640C1100 620 1300 650 1600 630V1000H0Z" fill="var(--p7)" />
          <path d="M0 760C200 730 400 780 700 760C1000 740 1300 780 1600 750V1000H0Z" fill="var(--p4)" />
        </svg>
        <div className="pse-hero-text">
          <h1>
            <span>{headline}</span>
          </h1>
          <p>{subheadline}</p>
          <a className="pse-btn" href={primaryHref}>
            {primaryCTA}
          </a>
        </div>
        {config.showClock ? (
          <div className="pse-clock" aria-hidden="true">
            5:12<small>am, scroll to let the sun up</small>
          </div>
        ) : null}
      </div>
      {img ? <img src={img.url} alt={img.alt} className="pse-hero-img" aria-hidden="true" width={img.width ?? 1200} height={img.height ?? 800} style={{ display: "none" }} /> : null}
    </header>
  );
}
