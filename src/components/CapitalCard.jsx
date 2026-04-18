import React from "react";
import { calculateNet, calculateRealised, formatCurrency } from "../utils/calculations";

export default function CapitalCard({ title, data, accent, totalLabel, helperText }) {
  if (!data?.stcg || !data?.ltcg) {
    return null;
  }

  const shortTermNet = calculateNet(data.stcg.profits, data.stcg.losses);
  const longTermNet = calculateNet(data.ltcg.profits, data.ltcg.losses);
  const total = calculateRealised(data.stcg, data.ltcg);

  return (
    <section className={`capital-card ${accent === "blue" ? "capital-card--blue" : ""}`}>
      <div className="capital-card__title">{title}</div>

      <div className="capital-card__grid capital-card__grid--head">
        <div />
        <div>Short-term</div>
        <div>Long-term</div>
      </div>

      <div className="capital-card__grid">
        <div>Profits</div>
        <div>{formatCurrency(data.stcg.profits)}</div>
        <div>{formatCurrency(data.ltcg.profits)}</div>
      </div>

      <div className="capital-card__grid">
        <div>Losses</div>
        <div>{formatCurrency(-data.stcg.losses)}</div>
        <div>{formatCurrency(-data.ltcg.losses)}</div>
      </div>

      <div className="capital-card__grid capital-card__grid--strong">
        <div>Net Capital Gains</div>
        <div>{formatCurrency(shortTermNet)}</div>
        <div>{formatCurrency(longTermNet)}</div>
      </div>

      <div className="capital-card__footer">
        <span>{totalLabel}</span>
        <strong>{formatCurrency(total)}</strong>
      </div>

      {helperText ? <p className="capital-card__helper">{helperText}</p> : null}
    </section>
  );
}
