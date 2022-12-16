import { useContext, useRef } from "react";
import { VideoContext } from "../VideoContext";
import { createPortal } from "react-dom";
import classes from "./VideoModal.module.css";

export default function VideoModal() {
  const videoContext = useContext(VideoContext);
  const modalRef = useRef();
  const closeRef = useRef();

  function closeModal(e) {
    if (e.target === modalRef.current || e.target === closeRef.current) {
      videoContext.setVideo(null);
      videoContext.setVideoCaption(null);
    }
  }

  return (
    videoContext.video &&
    createPortal(
      <div ref={modalRef} className={classes.modal} onClick={(e) => closeModal(e)}>
        <div className={classes.container}>
          <p ref={closeRef} className={classes.close}>
            X
          </p>
          <video controls width="100%">
            <source src={videoContext.video} type="video/mp4" />
            Sorry, your browser doesn't support videos.
          </video>
          <p className={classes.caption}>{videoContext.videoCaption}</p>
        </div>
      </div>,
      document.getElementById("modal-root")
    )
  );
}
