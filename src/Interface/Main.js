import Project from "./Project";
import classes from "./Main.module.css";

export default function Main({ activeProject }) {
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
      title: "Qoor Starship",
      date: "2019",
      description:
        "Prototype for monitoring/scheduling service for AI/Machine Learning and Crypto Mining workloads.",
      tech: "HTML, CSS, Node.js, React, Socket.io",
      siteLink: "",
      codeLink: "",
      video: "",
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
        <article className={classes.contact}>Contact :3</article>
      </main>
    </>
  );
}
