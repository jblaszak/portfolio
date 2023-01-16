import React, { createContext, useState } from "react";

export const SectionContext = createContext({
  currSection: null,
  setCurrSection: null,
  targetSection: null,
  setTargetSection: null,
});

export function SectionContextProvider({ children }) {
  const [currSection, setCurrSection] = useState(1);
  const [targetSection, setTargetSection] = useState(0);

  return (
    <SectionContext.Provider
      value={{ currSection, setCurrSection, targetSection, setTargetSection }}
    >
      {children}
    </SectionContext.Provider>
  );
}
