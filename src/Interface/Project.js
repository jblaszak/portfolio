import { useContext } from "react";
import { VideoContext } from "../VideoContext";

import classes from "./Project.module.css";

export default function Project({
  active,
  title,
  date,
  description,
  tech,
  siteLink,
  codeLink,
  video,
  videoCaption,
  videoAriaLabel,
}) {
  const videoContext = useContext(VideoContext);

  return (
    <section className={`${classes.project}${active ? ` ${classes.active}` : ""}`}>
      <h2>{title}</h2>
      <p className={classes.date}>{date}</p>
      <p className={classes.description}>{description}</p>
      <p className={classes.tech}>
        Tech: <span>{tech}</span>
      </p>
      <div className={classes.links}>
        {siteLink && (
          <a href={siteLink} target="_blank" rel="noopener noreferrer">
            Visit Site
          </a>
        )}
        {codeLink && (
          <a href={codeLink} target="_blank" rel="noopener noreferrer">
            See Code
          </a>
        )}
        {video && (
          <button
            aria-label={videoAriaLabel}
            onClick={() => {
              videoContext.setVideo((prev) => video);
              videoContext.setVideoCaption((prev) => videoCaption);
            }}
          >
            View Video
          </button>
        )}
      </div>
    </section>
  );
}
