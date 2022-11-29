import classes from "./Main.module.css";
import Project from "./Project";

export default function Main() {
  const projects = [
    {
      title: "Perfect Pixels Club",
      date: "2022",
      description: "A collections page for planned NFT projects.",
      tech: "HTML, CSS, Canvas",
      siteLink: "https://www.perfectpixelsclub.com",
      codeLink: "https://github.com/jblaszak/perfect-pixels-club",
    },
  ];

  return (
    <>
      <main>
        <header className={classes.mainHeader}>
          <h1>
            Jo Blaszak <span>Full Stack Web Developer</span>
          </h1>
          <p>I craft the future using web technologies.</p>
          <p>See some of my projects =></p>
        </header>
        <article className={classes.projects}>
          {projects.map((p) => (
            <Project
              key={p.title}
              title={p.title}
              date={p.date}
              description={p.description}
              tech={p.tech}
              siteLink={p.siteLink}
              codeLink={p.codeLink}
            />
          ))}
        </article>
      </main>
    </>
  );
}
