import React, { createContext, useState } from 'react';

// Create a Context
export const SelectContext = createContext();

// Create a provider component
export const SelectProvider = ({ children }) => {
  const [selected, setSelected] = useState({
    ttClassification: ''
  });

  return (
    <SelectContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectContext.Provider>
  );
};
