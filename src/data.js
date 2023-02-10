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
    title: { text: "Perfect Pixels Club", position: [0, 1, 0], transition: [-2, 0, 0] },
    date: { text: "2022", position: [2, 5, 0], transition: [-2, 0, 0] },
    description: {
      text: "A collections page for planned NFT projects.",
      position: [0, 4, 0],
      transition: [-2, 0, 0],
    },
    tech: { text: "HTML, CSS, React, Canvas", position: [0, 3, 0], transition: [-2, 0, 0] },
    siteLink: {
      href: "https://www.perfectpixels.club",
      position: [0, 4, 0],
      transition: [-2, 0, 0],
      width: 1.8,
      buttonPosition: [-0.925, -0.235, 0],
    },
    codeLink: {
      href: "https://github.com/jblaszak/perfect-pixels-club",
      position: [0, 4, 0],
      transition: [-2, 0, 0],
      width: 1.8,
      buttonPosition: [-0.925, -0.22, 0],
    },
  },
  // {
  //   image: cfp,
  //   texture: cfpTexture,
  //   title: "Crypto Flex Pixels",
  //   date: "2021",
  //   description:
  //     "An NFT project where all 10,000 NFTs are visible at once. Includes custom smart contract, minting and viewer.",
  //   tech: "HTML, CSS, React, Redux, Canvas, Solidity",
  //   siteLink: "https://www.cryptoflexpixels.com",
  //   codeLink: "https://github.com/jblaszak/crypto-pixels",
  // },
  // {
  //   image: starship,
  //   texture: starshipTexture,
  //   title: "Qoor Starship/Nexus",
  //   date: "2019",
  //   description:
  //     "Prototype for monitoring/scheduling service for AI/Machine Learning and Crypto Mining workloads. Required multiple running machines so no live demo available.",
  //   tech: "HTML, CSS, Node.js, React, Socket.io",
  //   video: starshipVideo,
  //   videoCaption:
  //     "This project required a number of machines communicating with one another to simulate monitoring and accessing a machine in a datacenter. It was created for the purpose of conveying the concept to investors and is no longer operational.",
  // },
  // {
  //   image: qoor,
  //   texture: qoorTexture,
  //   title: "Qoor Website",
  //   date: "2019",
  //   description: "Company site for pre-seed startup. Code is private.",
  //   tech: "HTML, CSS, React",
  //   siteLink: "https://qoor.io/",
  // },
];
