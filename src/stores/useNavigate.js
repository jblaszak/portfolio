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
    };
  }
);

export default useNavigateStore;
