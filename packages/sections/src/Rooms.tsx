import type { BusinessProfile } from "@palawan-site-engine/schemas";
type ImageRecord = { url: string; alt: string; width?: number; height?: number };

type Props = {
  profile: BusinessProfile;
  config: { heading?: string; showPrices?: boolean };
  images: Record<string, ImageRecord[]>;
};

export function Rooms({ profile, config, images }: Props) {
  const heading = config.heading || "Rooms";
  const rooms = profile.rooms.value;
  const roomImages = images["rooms"] ?? [];
  return (
    <section className="pse-rooms" aria-label={heading}>
      <h2>{heading}</h2>
      <ul className="pse-room-list">
        {rooms.map((room, i) => {
          const img = roomImages[i];
          return (
            <li key={room.name} className="pse-room">
              <div className="pse-room-media">
                {img ? <img src={img.url} alt={img.alt} width={img.width ?? 800} height={img.height ?? 600} loading="lazy" /> : null}
              </div>
              <h3>{room.name}</h3>
              <p>{room.description}</p>
              <p className="pse-meta">
                Sleeps {room.sleeps}
                {config.showPrices && room.pricePerNight ? ` · ${room.pricePerNight}` : ""}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
