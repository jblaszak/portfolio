import { createContext, useState } from "react";

export const CanvasContext = createContext({
  width: null,
  height: null,
  scrollElement: null,
  setWidth: null,
  setHeight: null,
  setScrollElement: null,
});

export default function CanvasContextProvider({ children }) {
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [scrollElement, setScrollElement] = useState(null);

  return (
    <CanvasContext.Provider
      value={{
        width,
        height,
        scrollElement,
        setWidth,
        setHeight,
        setScrollElement,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
}
