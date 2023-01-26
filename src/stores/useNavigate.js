import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { projects } from "../data";

const useNavigateStore = create(
  subscribeWithSelector((set) => {
    return {
      targetSection: 0,
      currentSection: 0,
      focus: "player",
      animation: "IDLE",
      video: null,
      videoCaption: null,
      setTargetSection: (newTargetSection) => {
        set((state) => {
          return { targetSection: newTargetSection };
        });
      },
      setCurrentSection: (newCurrentSection) => {
        set((state) => {
          return { currentSection: newCurrentSection };
        });
      },
      setFocus: (newFocus) => {
        set((state) => {
          return { focus: newFocus };
        });
      },
      setAnimation: (newAnimation) => {
        set((state) => {
          return { animation: newAnimation };
        });
      },
      setVideo: (newVideo) => {
        set((state) => {
          return { video: newVideo };
        });
      },
      setVideoCaption: (newVideoCaption) => {
        set((state) => {
          return { videoCaption: newVideoCaption };
        });
      },
    };
  })
);

export default useNavigateStore;
