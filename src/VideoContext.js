import { createContext, useState } from "react";

export const VideoContext = createContext(null);

export function VideoContextProvider({ children }) {
  const [video, setVideo] = useState(null);

  return (
    <VideoContext.Provider
      value={{
        video,
        setVideo,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}
