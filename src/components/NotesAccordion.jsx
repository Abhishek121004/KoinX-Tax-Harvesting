import React, { useState } from "react";

const notes = [
  "Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.",
  "Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.",
  "Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.",
  "Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.",
  "Only realized losses are considered for harvesting. Unrealized losses in unutilized balances are not counted.",
];

export default function NotesAccordion() {
  const [open, setOpen] = useState(true);

  return (
    <section className={`notes ${open ? "notes--open" : ""}`}>
      <button className="notes__toggle" type="button" onClick={() => setOpen((value) => !value)}>
        <span className="notes__label">
          <span className="notes__icon">i</span>
          Important Notes &amp; Disclaimers
        </span>
        <span className="notes__chevron">{open ? "^" : "v"}</span>
      </button>

      {open ? (
        <ul className="notes__content">
          {notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
