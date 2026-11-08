type ImageRecord = { url: string; alt: string; width?: number; height?: number };

type Props = {
  config: { heading?: string; imageSlot?: string };
  images: Record<string, ImageRecord[]>;
};

export function Gallery({ config, images }: Props) {
  const heading = config.heading || "Gallery";
  const slot = config.imageSlot || "gallery";
  const list = images[slot] ?? [];
  return (
    <section className="pse-gallery" aria-label={heading}>
      <h2>{heading}</h2>
      <ul className="pse-gallery-list">
        {list.map((img) => (
          <li key={img.url}>
            <figure>
              <img src={img.url} alt={img.alt} width={img.width ?? 800} height={img.height ?? 600} loading="lazy" />
              <figcaption>{img.alt} (FICTIONAL SVG)</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
