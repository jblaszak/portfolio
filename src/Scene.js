import { useEffect } from "react";
import { BakeShadows, Environment } from "@react-three/drei";
import { useThree, useLoader } from "@react-three/fiber";
import * as THREE from "three";

import useNavigateStore from "./stores/useNavigate";
import useMoveCamera from "./hooks/useMoveCamera";
import { projects } from "./data";
import { PORTAL_SEPARATION } from "./constants";

import Card from "./Card";
import IntroText from "./IntroText";
import Avatar from "./Avatar";
import GlassPortal from "./GlassPortal";
import Particles from "./Particles";

import "./style.css";

export default function Scene({ moveCharacter }) {
  const currentSection = useNavigateStore((state) => state.currentSection);

  const moveCamera = useMoveCamera();

  const projectTextureFiles = projects.map((project) => project.texture);
  const projectImageFiles = projects.map((project) => project.image);
  const projectTextures = useLoader(THREE.TextureLoader, projectTextureFiles);
  const projectImages = useLoader(THREE.TextureLoader, projectImageFiles);
  const { width, height } = useThree((state) => state.size);

  const rotation = [0, Math.PI / 6, 0];

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
            <group rotation={rotation}>
              <Particles
                position={[0, 3, 0.101]}
                texture={projectTextures[i]}
                image={projectImages[i]}
                index={i + 1}
              />
              <GlassPortal />
            </group>
            <Card
              title={project.title}
              date={project.date}
              description={project.description}
              tech={project.tech}
              siteLink={project.siteLink || null}
              codeLink={project.codeLink || null}
              video={project.video || null}
              videoCaption={project.videoCaption || null}
              videoAriaLabel={project.videoAriaLabel || null}
            />
          </group>
        );
      })}
      <BakeShadows />
    </>
  );
}
