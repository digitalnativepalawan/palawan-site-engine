import type { BusinessProfile } from "@palawan-site-engine/schemas";

export function Experiences({ profile, config }: { profile: BusinessProfile; config: { heading?: string } }) {
  const heading = config.heading || "Experiences";
  const items = profile.services.value;
  return (
    <section className="pse-experiences" aria-label={heading}>
      <h2>{heading}</h2>
      <div>
        {items.map((s) => (
          <details key={s.name}>
            <summary>{s.name}</summary>
            <p>{s.description}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
