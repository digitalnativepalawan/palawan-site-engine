export function Testimonial({ config }: { config: { quote?: string; author?: string; source?: string; fictional?: boolean } }) {
  const quote = config.quote || "“We stayed three nights and lost track of all of them.”";
  const author = config.author || "Marisol and Ethan";
  const source = config.source || "Stayed in March (FICTIONAL)";
  return (
    <section className="pse-quote" aria-label="Guest quote">
      <blockquote>{quote}</blockquote>
      <cite>
        {author}, {source}
        {config.fictional ? " — FICTIONAL" : ""}
      </cite>
    </section>
  );
}
