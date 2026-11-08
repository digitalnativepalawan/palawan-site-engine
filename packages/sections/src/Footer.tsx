import type { BusinessProfile } from "@palawan-site-engine/schemas";

export function Footer({ profile }: { profile: BusinessProfile }) {
  const name = profile.name.value;
  const contact = profile.contact.value;
  const socials = profile.socials.value;
  return (
    <footer className="pse-footer">
      <div>
        <p className="pse-logo">{name}</p>
        <p>
          {contact.email} · {contact.phone}
        </p>
      </div>
      {Object.entries(socials).map(([k, v]) => (v ? (
        <a key={k} href={v} rel="noreferrer" target="_blank">
          {k}
        </a>
      ) : null))}
      <p className="pse-fictional">FICTIONAL demo data. No real business information.</p>
    </footer>
  );
}
