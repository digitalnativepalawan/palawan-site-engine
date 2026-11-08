export function CTA({ config }: { config: { heading?: string; subheading?: string; primaryCTA?: string; primaryHref?: string } }) {
  const heading = config.heading && config.heading.length > 0 ? config.heading : "Tell us when you would like to wake up here.";
  const label = config.primaryCTA && config.primaryCTA.length > 0 ? config.primaryCTA : "Send my dates";
  const href = config.primaryHref || "/contact";
  return (
    <section className="pse-cta" aria-label="Call to action">
      <h2>{heading}</h2>
      {config.subheading ? <p>{config.subheading}</p> : null}
      <a className="pse-btn" href={href}>
        {label}
      </a>
    </section>
  );
}
