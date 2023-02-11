import { useEffect } from "react";
import { BakeShadows, Environment } from "@react-three/drei";
import { useThree, useLoader } from "@react-three/fiber";
import * as THREE from "three";

import useNavigateStore from "./stores/useNavigate";
import useMoveCamera from "./hooks/useMoveCamera";

// import { projects } from "./data";
import ppc from "./assets/ppc.png";
import ppcTexture from "./assets/ppc_xsmall.png";
import qoor from "./assets/qoor.png";
import qoorTexture from "./assets/qoor_xsmall.png";
import cfp from "./assets/cfp.png";
import cfpTexture from "./assets/cfp_xsmall.png";
import starship from "./assets/starship.png";
import starshipTexture from "./assets/starship_xsmall.png";
import starshipVideo from "./assets/starship-nexus-demo.mp4";

import { PORTAL_SEPARATION } from "./constants";

import InfoCard from "./InfoCard";
import IntroText from "./IntroText";
import Avatar from "./Avatar";
import GlassPortal from "./GlassPortal";
import Particles from "./Particles";
import Contact from "./Contact";

import "./style.css";

export default function Scene({ moveCharacter }) {
  const currentSection = useNavigateStore((state) => state.currentSection);

  const moveCamera = useMoveCamera();

  const projects = [
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
        position: [-2, 0.65, 0],
        transition: [-4, 0, 0],
      },
      tech: {
        text: "Tech: HTML, CSS, React, Redux, Canvas, Solidity",
        position: [-2, 0.05, 0],
        transition: [-4, 0, 0],
      },
      siteLink: {
        href: "https://www.cryptoflexpixels.com",
        position: [-1.25, -0.55, 0],
        transition: [0, -2, 0],
      },
      codeLink: {
        href: "https://github.com/jblaszak/crypto-pixels",
        position: [0.4, -0.55, 0],
        transition: [0, -2, 0],
      },
    },
    {
      image: starship,
      texture: starshipTexture,
      title: { text: "Qoor Starship/Nexus", position: [-2, 1.4, 0], transition: [0, 1, 0] },
      date: { text: "2019", position: [1.05, 1.37, 0], transition: [1, 0, 0] },
      description: {
        text: "Prototype for monitoring/scheduling service for AI/Machine Learning and Crypto Mining workloads. Required multiple running machines so no live demo available.",
        position: [-2, 0.65, 0],
        transition: [-4, 0, 0],
      },
      tech: {
        text: "Tech: HTML, CSS, Node.js, React, Socket.io",
        position: [-2, 0.05, 0],
        transition: [-4, 0, 0],
      },
      video: {
        vide: starshipVideo,
        videoCaption:
          "This project required a number of machines communicating with one another to simulate monitoring and accessing a machine in a datacenter. It was created for the purpose of conveying the concept to investors and is no longer operational.",
      },
    },
    {
      image: qoor,
      texture: qoorTexture,
      title: { text: "Qoor Website", position: [-2, 1.4, 0], transition: [0, 1, 0] },
      date: { text: "2019", position: [1.05, 1.37, 0], transition: [1, 0, 0] },
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

  const projectTextureFiles = projects.map((project) => project.texture);
  const projectImageFiles = projects.map((project) => project.image);
  const projectTextures = useLoader(THREE.TextureLoader, projectTextureFiles);
  const projectImages = useLoader(THREE.TextureLoader, projectImageFiles);
  // const { width, height } = useThree((state) => state.size);

  const portalRotation = [0, Math.PI / 6, 0];
  const cardRotation = [0, -Math.PI / 8, 0];
  const cardPosition = [3.5, 4, 0];

  useEffect(() => {
    function handleKeyboard(e) {
      if (e.key === "ArrowLeft") {
        moveCharacter(currentSection - 1);
      } else if (e.key === "ArrowRight") {
        moveCharacter(currentSection + 1);
      }
    }

    function handleWheel(e) {
      if (e.deltaY < 0) {
        moveCharacter(currentSection - 1);
      } else {
        moveCharacter(currentSection + 1);
      }
    }

    document.addEventListener("keydown", handleKeyboard);
    document.addEventListener("wheel", handleWheel);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
      document.removeEventListener("wheel", handleWheel);
    };
  }, [currentSection, moveCharacter]);

  return (
    <>
      <Environment preset="warehouse" />
      {/* <fog attach="fog" args={["#FFFFFF", 10, 20]} /> */}
      <IntroText moveCharacter={moveCharacter} />
      <Avatar />
      {projects.map((project, i) => {
        return (
          <group key={i} position={[PORTAL_SEPARATION * (i + 1), 0, -3]}>
            <group rotation={portalRotation}>
              <Particles
                position={[0, 3, 0.101]}
                texture={projectTextures[i]}
                image={projectImages[i]}
                index={i + 1}
              />
              <GlassPortal />
            </group>
            <InfoCard
              position={cardPosition}
              rotation={cardRotation}
              title={project.title}
              date={project.date}
              description={project.description}
              tech={project.tech}
              siteLink={project.siteLink || null}
              codeLink={project.codeLink || null}
              video={project.video || null}
              videoCaption={project.videoCaption || null}
            />
          </group>
        );
      })}
      <Contact />
      <BakeShadows />
    </>
  );
}
