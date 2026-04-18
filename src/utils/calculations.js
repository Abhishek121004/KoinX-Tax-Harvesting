export const calculateNet = (profits, losses) => profits - losses;

export const calculateRealised = (stcg, ltcg) =>
  calculateNet(stcg.profits, stcg.losses) + calculateNet(ltcg.profits, ltcg.losses);

export const applyHarvesting = (base, selectedHoldings) => {
  const updated = structuredClone(base);

  selectedHoldings.forEach((holding) => {
    if (holding.shortTermGain >= 0) {
      updated.stcg.profits += holding.shortTermGain;
    } else {
      updated.stcg.losses += Math.abs(holding.shortTermGain);
    }

    if (holding.longTermGain >= 0) {
      updated.ltcg.profits += holding.longTermGain;
    } else {
      updated.ltcg.losses += Math.abs(holding.longTermGain);
    }
  });

  return updated;
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

export const formatCompactCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);

export const formatAssetAmount = (amount, symbol) =>
  `${new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)} ${symbol}`;
