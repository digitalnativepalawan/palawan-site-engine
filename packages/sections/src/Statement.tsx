import type { BusinessProfile } from "@palawan-site-engine/schemas";

export function Statement({ profile, config }: { profile: BusinessProfile; config: { text?: string } }) {
  const text = config.text && config.text.length > 0 ? config.text : profile.description.value;
  return (
    <section className="pse-statement" aria-label="Statement">
      <p>{text}</p>
    </section>
  );
}
