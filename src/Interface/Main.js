import { useContext } from "react";
import { SectionContext } from "../SectionContext";
import Project from "./Project";
import classes from "./Main.module.css";
import starshipVideo from "../assets/starship-nexus-demo.mp4";

export default function Main() {
  const { currSection, setTargetSection } = useContext(SectionContext);

  const projects = [
    {
      title: "Perfect Pixels Club",
      date: "2022",
      description: "A collections page for planned NFT projects.",
      tech: "HTML, CSS, React, Canvas",
      siteLink: "https://www.perfectpixels.club",
      codeLink: "https://github.com/jblaszak/perfect-pixels-club",
    },
    {
      title: "Crypto Flex Pixels",
      date: "2021",
      description:
        "An NFT project where all 10,000 NFTs are visible at once. Includes custom smart contract, minting and viewer.",
      tech: "HTML, CSS, React, Redux, Canvas, Solidity",
      siteLink: "https://www.cryptoflexpixels.com",
      codeLink: "https://github.com/jblaszak/crypto-pixels",
    },
    {
      title: "Qoor Starship/Nexus",
      date: "2019",
      description:
        "Prototype for monitoring/scheduling service for AI/Machine Learning and Crypto Mining workloads. Required multiple running machines so no live demo available.",
      tech: "HTML, CSS, Node.js, React, Socket.io",
      video: starshipVideo,
      videoCaption:
        "This project required a number of machines communicating with one another to simulate monitoring and accessing a machine in a datacenter. It was created for the purpose of conveying the concept to investors and is no longer operational.",
      videoAriaLabel: "View a video of the Qoor Starship/Nexus Project",
    },
    {
      title: "Qoor Website",
      date: "2019",
      description: "Company site for pre-seed startup. Code is private.",
      tech: "HTML, CSS, React",
      siteLink: "https://qoor.io/",
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
          <button
            className={classes.largeButton}
            aria-label="View My Work"
            onClick={(e) => setTargetSection(1)}
          >
            View My Work
          </button>
        </header>
        <article className={classes.projects}>
          {projects.map((p, i) => (
            <Project
              key={p.title}
              active={i + 1 === currSection}
              title={p.title}
              date={p.date}
              description={p.description}
              tech={p.tech}
              siteLink={p.siteLink ?? null}
              codeLink={p.codeLink ?? null}
              video={p.video ?? null}
              videoCaption={p.videoCaption ?? null}
            />
          ))}
        </article>
        <footer className={classes.contact}>
          <p>I'm currently open to opportunities!</p>
          <p>
            If you would like to discuss my work or connect with me you may do so{" "}
            <span>
              <a
                className={classes.largeLink}
                href="mailto:jblaszak@gmail.com"
                aria-label="Send Jo Blaszak an email"
                target="_blank"
                rel="noopener noreferrer"
              >
                via e-mail
              </a>{" "}
              or{" "}
              <a
                className={classes.largeLink}
                href="https://www.linkedin.com/in/joblaszak/"
                aria-label="Visit my linkedIn page"
                target="_blank"
                rel="noopener noreferrer"
              >
                via LinkedIn
              </a>
            </span>
          </p>
        </footer>
      </main>
    </>
  );
}
