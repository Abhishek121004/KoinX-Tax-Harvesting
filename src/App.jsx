import React from "react";
import CapitalCard from "./components/CapitalCard";
import HoldingsTable from "./components/HoldingsTable";
import NotesAccordion from "./components/NotesAccordion";
import { useApp } from "./context/AppContext";
import { applyHarvesting, calculateRealised, formatCurrency } from "./utils/calculations";

export default function App() {
  const { holdings, gains, selected, loading, error } = useApp();

  if (loading) {
    return <div className="app-state">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="app-state app-state--error">Unable to load the tax dashboard.</div>;
  }

  if (!gains?.stcg || !gains?.ltcg) {
    return <div className="app-state app-state--error">Capital gains data is unavailable.</div>;
  }

  const selectedHoldings = holdings.filter((holding) => selected.includes(holding.id));
  const updated = applyHarvesting(gains, selectedHoldings);
  const before = calculateRealised(gains.stcg, gains.ltcg);
  const after = calculateRealised(updated.stcg, updated.ltcg);
  const delta = Math.max(0, before - after);

  return (
    <main className="dashboard">
      <div className="dashboard__container">
        <div className="brand-bar">
          <div className="brand-bar__logo">
            <span className="brand-bar__logo-koin">Koin</span>
            <span className="brand-bar__logo-x">X</span>
          </div>
        </div>

        <header className="dashboard__header">
          <h1>Tax Harvesting</h1>
          <button className="dashboard__link" type="button">
            How it works?
          </button>
        </header>

        <div className="dashboard__body">
          <NotesAccordion />

          <section className="summary-grid">
            <CapitalCard
              title="Pre Harvesting"
              data={gains}
              totalLabel="Realised Capital Gains:"
            />
            <CapitalCard
              title="After Harvesting"
              data={updated}
              accent="blue"
              totalLabel="Effective Capital Gains:"
              helperText={
                selectedHoldings.length
                  ? `You are going to save upto ${formatCurrency(delta)}`
                  : ""
              }
            />
          </section>

          <HoldingsTable holdings={holdings} />
        </div>
      </div>
    </main>
  );
}
