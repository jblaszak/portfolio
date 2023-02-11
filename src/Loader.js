import { useProgress } from "@react-three/drei";
import { useRef, useState, useEffect, useCallback } from "react";
import classes from "./Loader.module.css";

export default function Loader() {
  const { active, loaded } = useProgress();
  const totalItems = 31; // figured out manually by running above and checking in network tab...
  const progressRef = useRef(0);
  const rafRef = useRef(0);
  const progressSpanRef = useRef(null);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    let t;
    if (active !== shown) t = setTimeout(() => setShown(active), 300);
    return () => clearTimeout(t);
  }, [shown, active]);

  const updateProgress = useCallback(() => {
    if (!progressSpanRef.current) return;
    const progress = (loaded / totalItems) * 100;
    progressRef.current += (progress - progressRef.current) / 2;
    if (progressRef.current > 0.95 * progress || progress === 100) progressRef.current = progress;
    progressSpanRef.current.innerText = `Loading ${progressRef.current.toFixed(2)}%`;
    if (progressRef.current < progress) rafRef.current = requestAnimationFrame(updateProgress);
    // console.log(progress, item, loaded, total);
  }, [loaded, progressSpanRef]);

  useEffect(() => {
    updateProgress();
    return () => cancelAnimationFrame(rafRef.current);
  }, [updateProgress]);

  return (
    shown && (
      //   <div className={classes.container} style={{ opacity: active ? 1 : 0 }}>
      <div className={classes.container} style={{ opacity: shown ? 1 : 0 }}>
        <div>
          {/* <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#000"
              //   width="800"
              //   height="800"
              viewBox="0 0 470 470"
            >
              <path
                className={classes.path}
                d="M211.68 151.08a7.5 7.5 0 0 0-10.25-2.7l-51.98 30.28a7.5 7.5 0 0 0 7.55 12.96l51.98-30.28a7.5 7.5 0 0 0 2.7-10.26zm49.34 10.26L313 191.62a7.47 7.47 0 0 0 10.26-2.7 7.5 7.5 0 0 0-2.7-10.26l-51.99-30.28a7.5 7.5 0 0 0-7.55 12.96zM149.55 356.4l51.88 30.22a7.46 7.46 0 0 0 10.25-2.7 7.5 7.5 0 0 0-2.7-10.26l-51.88-30.22a7.5 7.5 0 1 0-7.55 12.96z"
              />
              <path
                className={classes.path}
                d="M465.64 267.42c0-.6-.08-1.2-.23-1.78v-.22a7.52 7.52 0 0 0-.2-.65l-.06-.22a7.5 7.5 0 0 0-.36-.7l-.05-.1a7.58 7.58 0 0 0-.5-.75l-.12-.15a7.49 7.49 0 0 0-1.2-1.21l-.1-.09c-.25-.18-.5-.35-.76-.5L354.1 198.2V72.42a8.2 8.2 0 0 0-.26-1.78l-.06-.22a7.52 7.52 0 0 0-.22-.64l-.1-.23a7.5 7.5 0 0 0-.33-.7l-.06-.1a7.31 7.31 0 0 0-.5-.75l-.11-.15a7.47 7.47 0 0 0-1.22-1.22l-.08-.07a6.5 6.5 0 0 0-.77-.52L238.73 1.02a7.5 7.5 0 0 0-7.56 0l-111.57 65c-.3.18-.55.35-.8.54l-.08.07a7.4 7.4 0 0 0-1.22 1.22l-.12.15c-.17.23-.34.47-.48.73l-.07.12a7.5 7.5 0 0 0-.34.7l-.09.23a7.3 7.3 0 0 0-.2.65l-.07.2c-.15.6-.23 1.2-.24 1.8V198.2L8.08 261.01c-.3.18-.55.35-.8.54l-.1.08a7.55 7.55 0 0 0-1.2 1.2l-.12.16a9.2 9.2 0 0 0-.5.72l-.05.13a7.5 7.5 0 0 0-.35.7l-.08.23a7.3 7.3 0 0 0-.23.64l-.06.33a6.81 6.81 0 0 0-.35 1.77v130.1a7.5 7.5 0 0 0 3.8 6.41l111.57 65 .07.03a7.5 7.5 0 0 0 1.68.7l.2.06c.24.06.47.1.7.14l.23.05a7.6 7.6 0 0 0 1.8 0l.22-.03c.24-.04.47-.08.7-.14l.2-.06a7.53 7.53 0 0 0 1.69-.7l.06-.03 107.8-62.8 107.8 62.8.06.03a7.49 7.49 0 0 0 2.6.9l.22.04a7.6 7.6 0 0 0 1.8 0l.22-.03.7-.14.2-.06a7.5 7.5 0 0 0 1.65-.7l.07-.03 111.57-65a7.5 7.5 0 0 0 3.75-6.48v-130.1zm-22.4.08-96.67 56.32-96.67-56.32 96.67-56.32 96.68 56.32zM130.94 85.55l96.57 56.26v112.64l-96.57-56.26V85.55zm208.14 112.64-96.57 56.26V141.81l96.57-56.26v112.64zm-111.57 195-96.57 56.26V336.81l96.57-56.26v112.64zm15-112.64 96.57 56.26v112.64l-96.57-56.26V280.55zm-7.5-264.37 96.66 56.32L235 128.82 138.33 72.5 235 16.18zm-111.58 195 96.67 56.32-96.67 56.32-96.68-56.32 96.68-56.32zM19.35 280.55l96.58 56.26v112.64l-96.58-56.26V280.55zm334.72 168.9V336.81l96.58-56.26v112.64l-96.58 56.26z"
              />
              <path
                className={classes.path}
                d="M323.16 346.14a7.5 7.5 0 0 0-10.26-2.7l-51.88 30.22a7.5 7.5 0 0 0 7.55 12.96l51.88-30.22a7.5 7.5 0 0 0 2.7-10.26zm-223.05-.06a7.5 7.5 0 0 0-10.26-2.7L37.98 373.6a7.5 7.5 0 0 0 7.55 12.96l51.87-30.22a7.5 7.5 0 0 0 2.7-10.26zm331.91 27.52-51.67-30.1a7.5 7.5 0 1 0-7.55 12.96l51.67 30.1a7.46 7.46 0 0 0 10.26-2.7 7.5 7.5 0 0 0-2.7-10.26z"
              />
            </svg>
          </div> */}
          <div className={classes.inner}>
            <div
              className={classes.bar}
              style={{ transform: `scaleX(${loaded / totalItems})` }}
            ></div>
            <span className={classes.data} ref={progressSpanRef} />
          </div>
        </div>
      </div>
    )
  );
}
