import React, { useMemo, useState } from "react";
import { useApp } from "../context/AppContext";
import {
  formatAssetAmount,
  formatCurrency,
} from "../utils/calculations";

const sortHoldings = (holdings, direction) => {
  const multiplier = direction === "desc" ? -1 : 1;

  return [...holdings].sort((left, right) => {
    if (left.shortTermGain === right.shortTermGain) {
      return left.name.localeCompare(right.name);
    }

    return left.shortTermGain > right.shortTermGain ? multiplier : -multiplier;
  });
};

export default function HoldingsTable({ holdings }) {
  const { selected, setSelected } = useApp();
  const [sortDirection, setSortDirection] = useState("desc");

  const selectedSet = useMemo(() => new Set(selected), [selected]);
  const sortedHoldings = useMemo(
    () => sortHoldings(holdings, sortDirection),
    [holdings, sortDirection],
  );
  const allSelected = holdings.length > 0 && selected.length === holdings.length;

  const toggleRow = (holdingId) => {
    if (selectedSet.has(holdingId)) {
      setSelected(selected.filter((value) => value !== holdingId));
      return;
    }

    setSelected([...selected, holdingId]);
  };

  const toggleAll = () => {
    if (allSelected) {
      setSelected([]);
      return;
    }

    setSelected(holdings.map((holding) => holding.id));
  };

  return (
    <section className="holdings-panel">
      <div className="holdings-panel__header">
        <h2>Holdings</h2>
      </div>

      <div className="holdings-table-wrap">
        <table className="holdings-table">
          <thead>
            <tr>
              <th className="holdings-table__checkbox">
                <input type="checkbox" checked={allSelected} onChange={toggleAll} />
              </th>
              <th>Asset</th>
              <th>Holdings</th>
              <th>Total Current Value</th>
              <th>
                <button
                  className="holdings-table__sort"
                  type="button"
                  onClick={() =>
                    setSortDirection((value) => (value === "desc" ? "asc" : "desc"))
                  }
                >
                  <span>{sortDirection === "desc" ? "v" : "^"}</span>
                  Short-term
                </button>
              </th>
              <th>Long-Term</th>
              <th>Amount to Sell</th>
            </tr>
          </thead>

          <tbody>
            {sortedHoldings.map((holding) => {
              const isSelected = selectedSet.has(holding.id);

              return (
                <tr key={holding.id} className={isSelected ? "is-selected" : ""}>
                  <td className="holdings-table__checkbox">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleRow(holding.id)}
                    />
                  </td>

                  <td>
                    <div className="asset-cell">
                      <div className={holding.iconClassName}>{holding.icon}</div>
                      <div>
                        <div className="asset-cell__name">{holding.name}</div>
                        <div className="asset-cell__symbol">{holding.symbol}</div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="table-value">{formatAssetAmount(holding.holdings, holding.symbol)}</div>
                    <div className="table-subvalue">{formatCurrency(holding.avgBuyPrice)}/{holding.symbol}</div>
                  </td>

                  <td className="table-value">{formatCurrency(holding.holdings * holding.currentPrice)}</td>

                  <td>
                    <div
                      className={`table-value ${
                        holding.shortTermGain >= 0 ? "gain-positive" : "gain-negative"
                      }`}
                    >
                      {formatCurrency(holding.shortTermGain)}
                    </div>
                    <div className="table-subvalue">{formatAssetAmount(holding.holdings, holding.symbol)}</div>
                  </td>

                  <td>
                    <div
                      className={`table-value ${
                        holding.longTermGain >= 0 ? "gain-positive" : "gain-negative"
                      }`}
                    >
                      {formatCurrency(holding.longTermGain)}
                    </div>
                    <div className="table-subvalue">{(holding.holdings * 0.5724).toFixed(3)} {holding.symbol}</div>
                  </td>

                  <td className="table-value">
                    {isSelected ? formatAssetAmount(holding.holdings, holding.symbol) : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button className="holdings-panel__view-all" type="button">
        View all
      </button>
    </section>
  );
}
