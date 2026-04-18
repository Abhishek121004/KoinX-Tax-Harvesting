import React, { useMemo, useState } from "react";
import { useApp } from "../context/AppContext";
import {
  formatAssetAmount,
  formatCurrency,
  formatTableCurrency,
} from "../utils/calculations";

const sortHoldings = (holdings, direction) => {
  const multiplier = direction === "desc" ? -1 : 1;

  return [...holdings].sort((left, right) => {
    const leftScore =
      Math.abs(left.stcg.gain) +
      Math.abs(left.ltcg.gain) +
      left.totalHolding * left.currentPrice;
    const rightScore =
      Math.abs(right.stcg.gain) +
      Math.abs(right.ltcg.gain) +
      right.totalHolding * right.currentPrice;

    if (leftScore === rightScore) {
      return left.coinName.localeCompare(right.coinName);
    }

    return leftScore > rightScore ? multiplier : -multiplier;
  });
};

export default function HoldingsTable({ holdings }) {
  const { selected, setSelected } = useApp();
  const [sortDirection, setSortDirection] = useState("desc");
  const [showAll, setShowAll] = useState(false);

  const selectedSet = useMemo(() => new Set(selected), [selected]);
  const sortedHoldings = useMemo(
    () => sortHoldings(holdings, sortDirection),
    [holdings, sortDirection],
  );
  const visibleHoldings = useMemo(
    () => (showAll ? sortedHoldings : sortedHoldings.slice(0, 4)),
    [showAll, sortedHoldings],
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
              <th>Current Price</th>
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
              <th>Long-term</th>
              <th>Amount to Sell</th>
            </tr>
          </thead>

          <tbody>
            {visibleHoldings.map((holding) => {
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
                      <img
                        className="coin-icon"
                        src={holding.logo}
                        alt={`${holding.coin} logo`}
                        loading="lazy"
                      />
                      <div>
                        <div className="asset-cell__name">{holding.coinName}</div>
                        <div className="asset-cell__symbol">{holding.coin}</div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="table-value">
                      {formatAssetAmount(holding.totalHolding, holding.coin)}
                    </div>
                    <div className="table-subvalue">
                      {formatCurrency(holding.averageBuyPrice)}/{holding.coin}
                    </div>
                  </td>

                  <td className="table-value">{formatCurrency(holding.currentPrice)}</td>

                  <td>
                    <div
                      className={`table-value ${
                        holding.stcg.gain >= 0 ? "gain-positive" : "gain-negative"
                      }`}
                    >
                      {formatTableCurrency(holding.stcg.gain)}
                    </div>
                    <div className="table-subvalue">
                      {formatAssetAmount(holding.stcg.balance, holding.coin)}
                    </div>
                  </td>

                  <td>
                    <div
                      className={`table-value ${
                        holding.ltcg.gain >= 0 ? "gain-positive" : "gain-negative"
                      }`}
                    >
                      {formatTableCurrency(holding.ltcg.gain)}
                    </div>
                    <div className="table-subvalue">
                      {formatAssetAmount(holding.ltcg.balance, holding.coin)}
                    </div>
                  </td>

                  <td className="table-value">
                    {isSelected ? formatAssetAmount(holding.totalHolding, holding.coin) : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {!showAll && sortedHoldings.length > 4 ? (
        <button
          className="holdings-panel__view-all"
          type="button"
          onClick={() => setShowAll(true)}
        >
          View all
        </button>
      ) : null}
    </section>
  );
}
