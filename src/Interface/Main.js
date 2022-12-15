import Project from "./Project";
import classes from "./Main.module.css";

export default function Main({ activeProject, scrollElement, width }) {
  const projects = [
    {
      title: "Perfect Pixels Club",
      date: "2022",
      description: "A collections page for planned NFT projects.",
      tech: "HTML, CSS, React, Canvas",
      siteLink: "https://www.perfectpixelsclub.com",
      codeLink: "https://github.com/jblaszak/perfect-pixels-club",
      video: "",
    },
    {
      title: "Crypto Flex Pixels",
      date: "2021",
      description:
        "An NFT project where all 10,000 NFTs are visible at once. Includes custom smart contract, minting and viewer.",
      tech: "HTML, CSS, React, Redux, Canvas, Solidity",
      siteLink: "https://www.cryptoflexpixels.com",
      codeLink: "https://github.com/jblaszak/crypto-pixels",
      video: "",
    },
    {
      title: "Qoor Starship/Nexus",
      date: "2019",
      description:
        "Prototype for monitoring/scheduling service for AI/Machine Learning and Crypto Mining workloads. Required running machines so is no longer operational.",
      tech: "HTML, CSS, Node.js, React, Socket.io",
      siteLink: "",
      codeLink: "",
      video: "something",
    },
    {
      title: "Qoor Website",
      date: "2019",
      description: "Company site for pre-seed startup. Code is private.",
      tech: "HTML, CSS, React",
      siteLink: "https://qoor.io/",
      codeLink: "",
      video: "",
    },
  ];

  function scrollToFirstProject() {
    scrollElement.scrollTo({ left: width, behaviour: "smooth" });
  }

  return (
    <>
      <main>
        <header className={classes.mainHeader}>
          <h1>
            Jo Blaszak <span>Full Stack Web Developer</span>
          </h1>
          <p>I craft the future using web technologies.</p>
          <button aria-label="View My Work" onClick={(e) => scrollToFirstProject()}>
            View My Work
          </button>
        </header>
        <article className={classes.projects}>
          {projects.map((p, i) => (
            <Project
              key={p.title}
              active={i + 1 === activeProject}
              title={p.title}
              date={p.date}
              description={p.description}
              tech={p.tech}
              siteLink={p.siteLink}
              codeLink={p.codeLink}
              video={p.video}
            />
          ))}
        </article>
        <footer className={classes.contact}>
          <p>I'm currently open to opportunities!</p>
          <p>
            If you would like to discuss my work or connect with me you may do so{" "}
            <span>
              <a href="mailto:jblaszak@gmail.com" aria-label="Send Jo Blaszak an email">
                via e-mail
              </a>{" "}
              or{" "}
              <a href="https://www.linkedin.com/in/joblaszak/" aria-label="Visit my linkedIn page">
                via LinkedIn
              </a>
            </span>
          </p>
        </footer>
      </main>
    </>
  );
}
