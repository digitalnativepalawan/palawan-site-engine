export function FAQ({ config }: { config: { heading?: string; items?: Array<{ question: string; answer: string }> } }) {
  const heading = config.heading || "FAQ";
  const items = config.items && config.items.length > 0
    ? config.items
    : [
        { question: "Is this a real business?", answer: "No — all demo copy and images are FICTIONAL, created to show the engine." },
        { question: "How do I book?", answer: "Use the inquiry form. In Phase 1 it posts nowhere; Phase 3 adds real delivery." }
      ];
  return (
    <section className="pse-faq" aria-label={heading}>
      <h2>{heading}</h2>
      <div>
        {items.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
