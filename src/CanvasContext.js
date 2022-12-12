import { createContext, useState } from "react";

export const CanvasContext = createContext({
  width: null,
  height: null,
  scrollElement: null,
  activeProject: null,
  setWidth: null,
  setHeight: null,
  setScrollElement: null,
  setActiveProject: null,
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
        setWidth: (width) => setWidth(width),
        setHeight: (height) => setHeight(height),
        setScrollElement: (scrollElement) => setScrollElement(scrollElement),
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
}
