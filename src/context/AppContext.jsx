import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchHoldings } from "../mock/holdings";
import { fetchCapitalGains } from "../mock/capitalGains";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [holdings, setHoldings] = useState([]);
  const [gains, setGains] = useState(null);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([fetchHoldings(), fetchCapitalGains()])
      .then(([nextHoldings, nextGains]) => {
        setHoldings(nextHoldings);
        setGains(nextGains.capitalGains);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppContext.Provider
      value={{
        holdings,
        gains,
        selected,
        setSelected,
        loading,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }

  return context;
};
