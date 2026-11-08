import type { BusinessProfile } from "@palawan-site-engine/schemas";

export function Location({ profile, config }: { profile: BusinessProfile; config: { heading?: string; showMapLink?: boolean } }) {
  const loc = profile.location.value;
  const hours = profile.hours.value;
  const heading = config.heading || "Location";
  const mapsUrl = `https://www.openstreetmap.org/search?query=${encodeURIComponent(`${loc.address} ${loc.city}`)}`;
  return (
    <section className="pse-location" aria-label={heading}>
      <h2>{heading}</h2>
      <address>
        {loc.address}
        <br />
        {loc.city}, {loc.region}, {loc.country}
      </address>
      <div>
        <h3>Hours ({hours.timezone})</h3>
        <ul>
          {hours.lines.map((l) => (
            <li key={l.day}>
              {l.day}: {l.open}–{l.close}
            </li>
          ))}
        </ul>
      </div>
      {config.showMapLink ? (
        <a href={mapsUrl} target="_blank" rel="noreferrer">
          Open in OpenStreetMap
        </a>
      ) : null}
    </section>
  );
}
