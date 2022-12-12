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
}) {
  return (
    <section className={`${classes.project}${active ? ` ${classes.active}` : ""}`}>
      <h2>{title}</h2>
      <p className={classes.date}>{date}</p>
      <p className={classes.description}>{description}</p>
      <p className={classes.tech}>
        Tech: <span>{tech}</span>
      </p>
      <div className={classes.links}>
        {siteLink && <a href={siteLink}>Visit Site</a>}
        {codeLink && <a href={codeLink}>See Code</a>}
        {video && <a href="blank">Load video!</a>}
      </div>
    </section>
  );
}
