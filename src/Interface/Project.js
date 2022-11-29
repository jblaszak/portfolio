import classes from "./Project.module.css";

export default function Project({ title, date, description, tech, siteLink, codeLink }) {
  return (
    <section className={classes.project1}>
      <h2>{title}</h2>
      <p className={classes.date}>{date}</p>
      <p className={classes.description}></p>
      <p className={classes.tech}>
        <span>Tech: </span>
        {tech}
      </p>
      <div className={classes.links}>
        <a href={siteLink}>Visit Site</a>
        <a href={codeLink}>See Code</a>
      </div>
    </section>
  );
}
