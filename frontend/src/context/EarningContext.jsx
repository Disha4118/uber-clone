import React, { createContext, useState, useContext } from "react";

// Context create
const EarningContext = createContext();

// Provider
export const EarningProvider = ({ children }) => {
  const [earning, setEarning] = useState(0);

  return (
    <EarningContext.Provider value={{ earning, setEarning }}>
      {children}
    </EarningContext.Provider>
  );
};

// Custom hook
export const useEarning = () => useContext(EarningContext);