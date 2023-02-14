import { create } from "zustand";
// import { subscribeWithSelector } from "zustand/middleware";

const useNavigateStore = create(
  // subscribeWithSelector((set) => {
  (set) => {
    return {
      targetSection: 0,
      currentSection: 0,
      currentAction: "IDLE",
      focus: null,
      avatar: null,
      actions: null,
      targetRotation: 0,
      targetPosition: 0,
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
      setAvatar: (newAvatar) => {
        set((state) => {
          return { avatar: newAvatar };
        });
      },
      setActions: (newActions) => {
        set((state) => {
          return { actions: newActions };
        });
      },
      updateRotation: (rotation) => {
        set((state) => {
          return { targetRotation: state.targetRotation + rotation };
        });
      },
      setTargetPosition: (newTargetPosition) => {
        set((state) => {
          return { targetPosition: newTargetPosition };
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
  }
);

export default useNavigateStore;
