import { useEffect } from "react";
import { Environment } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

import useNavigateStore from "./stores/useNavigate";
import useMoveCamera from "./hooks/useMoveCamera";

import { projects } from "./data";

import { PORTAL_SEPARATION } from "./constants";

import InfoCard from "./InfoCard";
import IntroText from "./IntroText";
import Avatar from "./Avatar";
import GlassPortal from "./GlassPortal";
import Particles from "./Particles";
import Contact from "./Contact";

import "./style.css";

export default function Scene({ moveCharacter }) {
  const moveCamera = useMoveCamera(); // eslint-disable-line

  const projectTextureFiles = projects.map((project) => project.texture);
  const projectImageFiles = projects.map((project) => project.image);
  const projectTextures = useLoader(THREE.TextureLoader, projectTextureFiles);
  const projectImages = useLoader(THREE.TextureLoader, projectImageFiles);

  const portalRotation = [0, Math.PI / 6, 0];
  const cardRotation = [0, -Math.PI / 8, 0];
  const cardPosition = [3.5, 4, 0];

  useEffect(() => {
    let start = null;

    function handleKeyboard(e) {
      const currentSection = useNavigateStore.getState().currentSection;
      if (e.key === "ArrowLeft") {
        moveCharacter(currentSection - 1);
      } else if (e.key === "ArrowRight") {
        moveCharacter(currentSection + 1);
      }
    }

    function handleWheel(e) {
      const currentSection = useNavigateStore.getState().currentSection;
      if (e.deltaY < 0) {
        moveCharacter(currentSection - 1);
      } else {
        moveCharacter(currentSection + 1);
      }
    }

    function handleTouchStart(e) {
      start = e.changedTouches[0].clientX;
    }

    function handleTouchEnd(e) {
      const currentSection = useNavigateStore.getState().currentSection;
      const moved = start - e.changedTouches[0].clientX;
      if (moved < 0) {
        moveCharacter(currentSection - 1);
      } else if (moved > 0) {
        moveCharacter(currentSection + 1);
      }
    }

    document.addEventListener("keydown", handleKeyboard);
    document.addEventListener("wheel", handleWheel);
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [moveCharacter]);

  return (
    <>
      <Environment preset="warehouse" />
      <fog attach="fog" args={["#FFFFFF", 10, 20]} />
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
      <Contact moveCharacter={moveCharacter} />
    </>
  );
}
