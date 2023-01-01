import { createContext, useState } from "react";

export const CanvasContext = createContext({
  width: null,
  scrollElement: null,
  setWidth: null,
  setScrollElement: null,
});

export function CanvasContextProvider({ children }) {
  const [width, setWidth] = useState(null);
  const [scrollElement, setScrollElement] = useState(null);

  return (
    <CanvasContext.Provider
      value={{
        width,
        scrollElement,
        setWidth: (width) => setWidth(width),
        setScrollElement: (scrollElement) => setScrollElement(scrollElement),
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
}
