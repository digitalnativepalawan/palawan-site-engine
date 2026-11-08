import type { BusinessProfile } from "@palawan-site-engine/schemas";

export function Amenities({ profile, config }: { profile: BusinessProfile; config: { heading?: string } }) {
  const heading = config.heading || "Amenities";
  const items = profile.amenities.value;
  return (
    <section className="pse-amenities" aria-label={heading}>
      <h2>{heading}</h2>
      <ul>
        {items.map((a) => (
          <li key={a.name}>
            <h3>{a.name}</h3>
            {a.description ? <p>{a.description}</p> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
