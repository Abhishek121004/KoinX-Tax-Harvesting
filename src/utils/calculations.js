export const calculateNet = (profits, losses) => profits - losses;

export const calculateRealised = (stcg, ltcg) =>
  calculateNet(stcg.profits, stcg.losses) + calculateNet(ltcg.profits, ltcg.losses);

export const applyHarvesting = (base, selectedHoldings) => {
  const updated = structuredClone(base);

  selectedHoldings.forEach((holding) => {
    if (holding.stcg.gain >= 0) {
      updated.stcg.profits += holding.stcg.gain;
    } else {
      updated.stcg.losses += Math.abs(holding.stcg.gain);
    }

    if (holding.ltcg.gain >= 0) {
      updated.ltcg.profits += holding.ltcg.gain;
    } else {
      updated.ltcg.losses += Math.abs(holding.ltcg.gain);
    }
  });

  return updated;
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

export const formatCompactCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);

export const formatTableCurrency = (value) => {
  if (value === 0) {
    return formatCurrency(value);
  }

  const absoluteValue = Math.abs(value);

  if (absoluteValue >= 1000) {
    return formatCompactCurrency(value);
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: absoluteValue < 1 ? 4 : 2,
    maximumFractionDigits: absoluteValue < 1 ? 4 : 2,
  }).format(value);
};

export const formatAssetAmount = (amount, symbol) =>
  `${new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
  }).format(amount)} ${symbol}`;
