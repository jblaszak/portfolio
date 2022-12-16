import { createContext, useState } from "react";

export const VideoContext = createContext({
  video: null,
  setVideo: null,
  videoCaption: null,
  setVideoCaption: null,
});

export function VideoContextProvider({ children }) {
  const [video, setVideo] = useState(null);
  const [videoCaption, setVideoCaption] = useState(null);

  return (
    <VideoContext.Provider
      value={{
        video,
        setVideo,
        videoCaption,
        setVideoCaption,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}
