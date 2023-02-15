import { useRef } from "react";
import { createPortal } from "react-dom";
import useNavigateStore from "../stores/useNavigate";
import classes from "./VideoModal.module.css";

export default function VideoModal() {
  const { video, videoCaption } = useNavigateStore((state) => state);
  const modalRef = useRef();
  const closeRef = useRef();

  function closeModal(e) {
    if (e.target === modalRef.current || e.target === closeRef.current) {
      useNavigateStore.setState({ video: null, videoCaption: null });
    }
  }

  return (
    video &&
    createPortal(
      <div ref={modalRef} className={classes.modal} onClick={(e) => closeModal(e)}>
        <div className={classes.container}>
          <p ref={closeRef} className={classes.close} />
          <video controls width="100%">
            <source src={video} type="video/mp4" />
            Sorry, your browser doesn't support videos.
          </video>
          <p className={classes.caption}>{videoCaption}</p>
        </div>
      </div>,
      document.getElementById("modal-root")
    )
  );
}
