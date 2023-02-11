import ppc from "./assets/ppc.png";
import ppcTexture from "./assets/ppc_xsmall.png";
import qoor from "./assets/qoor.png";
import qoorTexture from "./assets/qoor_xsmall.png";
import cfp from "./assets/cfp.png";
import cfpTexture from "./assets/cfp_xsmall.png";
import starship from "./assets/starship.png";
import starshipTexture from "./assets/starship_xsmall.png";
import starshipVideo from "./assets/starship-nexus-demo.mp4";

export const projects = [
  {
    image: ppc,
    texture: ppcTexture,
    title: { text: "Perfect Pixels Club", position: [-2, 1.4, 0], transition: [0, 1, 0] },
    date: { text: "2022", position: [1.05, 1.37, 0], transition: [1, 0, 0] },
    description: {
      text: "A collections page for planned NFT projects.",
      position: [-2, 0.65, 0],
      transition: [-4, 0, 0],
    },
    tech: {
      text: "Tech: HTML, CSS, React, Canvas",
      position: [-2, 0.05, 0],
      transition: [-4, 0, 0],
    },
    siteLink: {
      href: "https://www.perfectpixels.club",
      position: [-1.25, -0.55, 0],
      transition: [0, -2, 0],
    },
    codeLink: {
      href: "https://github.com/jblaszak/perfect-pixels-club",
      position: [0.4, -0.55, 0],
      transition: [0, -2, 0],
    },
  },
  {
    image: cfp,
    texture: cfpTexture,
    title: { text: "Crypto Flex Pixels", position: [-2, 1.4, 0], transition: [0, 1, 0] },
    date: { text: "2021", position: [1.05, 1.37, 0], transition: [1, 0, 0] },
    description: {
      text: "An NFT project where all 10,000 NFTs are visible at once. Includes custom smart contract, minting and viewer.",
      position: [-2, 0.55, 0],
      transition: [-4, 0, 0],
    },
    tech: {
      text: "Tech: HTML, CSS, React, Redux, Canvas, Solidity",
      position: [-2, -0.32, 0],
      transition: [-4, 0, 0],
    },
    siteLink: {
      href: "https://www.cryptoflexpixels.com",
      position: [-1.25, -1.05, 0],
      transition: [0, -2, 0],
    },
    codeLink: {
      href: "https://github.com/jblaszak/crypto-pixels",
      position: [0.4, -1.05, 0],
      transition: [0, -2, 0],
    },
  },
  {
    image: starship,
    texture: starshipTexture,
    title: { text: "Qoor Starship/Nexus", position: [-2, 1.4, 0], transition: [0, 1, 0] },
    date: { text: "2019", position: [1.35, 1.37, 0], transition: [1, 0, 0] },
    description: {
      text: "Prototype for monitoring/scheduling service for AI/Machine Learning and Crypto Mining workloads. Only video demo available.",
      position: [-2, 0.37, 0],
      transition: [-4, 0, 0],
    },
    tech: {
      text: "Tech: HTML, CSS, Node.js, React, Socket.io",
      position: [-2, -0.65, 0],
      transition: [-4, 0, 0],
    },
    video: {
      video: starshipVideo,
      videoCaption:
        "This project required a number of machines communicating with one another to simulate monitoring and accessing a machine in a datacenter. It was created for the purpose of conveying the concept to investors and is no longer operational.",
      position: [-1.2, -1.3, 0],
      transition: [0, -3, 0],
    },
  },
  {
    image: qoor,
    texture: qoorTexture,
    title: { text: "Qoor Website", position: [-2, 1.4, 0], transition: [0, 1, 0] },
    date: { text: "2019", position: [0.3, 1.37, 0], transition: [1, 0, 0] },
    description: {
      text: "Company site for pre-seed startup. Code is private.",
      position: [-2, 0.65, 0],
      transition: [-4, 0, 0],
    },
    tech: {
      text: "Tech: HTML, CSS, React",
      position: [-2, 0.05, 0],
      transition: [-4, 0, 0],
    },
    siteLink: {
      href: "https://qoor.io/",
      position: [-1.25, -0.55, 0],
      transition: [0, -2, 0],
    },
  },
];
