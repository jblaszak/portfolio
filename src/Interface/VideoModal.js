import { createPortal } from "react-dom";
import classes from "./VideoModal.module.css";

export default function VideoModal({ video }) {
  return createPortal(
    <div className={classes.modal}>Video modal</div>,
    document.getElementById("modal-root")
  );
}
