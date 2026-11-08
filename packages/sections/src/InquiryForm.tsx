export function InquiryForm({ config }: { config: { heading?: string; subheading?: string } }) {
  const heading = config.heading || "Send an inquiry";
  return (
    <section className="pse-inquiry" aria-label={heading}>
      <h2>{heading}</h2>
      {config.subheading ? <p>{config.subheading}</p> : <p>Tell us when you would like to stay. UI only in Phase 1 — this form posts nowhere yet.</p>}
      <form action="#" method="post">
        <div>
          <label htmlFor="pse-name">Name</label>
          <input id="pse-name" name="name" required autoComplete="name" />
        </div>
        <div>
          <label htmlFor="pse-email">Email</label>
          <input id="pse-email" name="email" type="email" required autoComplete="email" />
        </div>
        <div>
          <label htmlFor="pse-message">Message</label>
          <textarea id="pse-message" name="message" required />
        </div>
        <button className="pse-btn" type="submit">
          Send inquiry
        </button>
      </form>
    </section>
  );
}
