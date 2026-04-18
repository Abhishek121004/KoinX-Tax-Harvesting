const capitalGains = {
  stcg: {
    profits: 4049.48,
    losses: 32127.03,
  },
  ltcg: {
    profits: 0,
    losses: 0,
  },
};

export const fetchCapitalGains = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(capitalGains), 300);
  });
