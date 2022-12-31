import React, { createContext, useState } from "react";

export const ActiveProjectContext = createContext({
  activeProject: null,
  setActiveProject: null,
});

export function ActiveProjectContextProvider({ children }) {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <ActiveProjectContext.Provider value={{ activeProject, setActiveProject }}>
      {children}
    </ActiveProjectContext.Provider>
  );
}
