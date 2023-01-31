import { useEffect } from "react";
import { BakeShadows } from "@react-three/drei";
import { useThree, useLoader } from "@react-three/fiber";
import * as THREE from "three";

import useNavigateStore from "./stores/useNavigate";
import useMoveCharacter from "./hooks/useMoveCharacter";
import { projects } from "./data";

import Card from "./Card";
import Avatar from "./Avatar";
import Floor from "./Floor";
import GlassPortal from "./GlassPortal";
import Particles from "./Particles";

import "./style.css";

export default function Scene() {
  const currentSection = useNavigateStore((state) => state.currentSection);
  const setCurrentSection = useNavigateStore((state) => state.setCurrentSection);
  const targetSection = useNavigateStore((state) => state.targetSection);
  const setTargetSection = useNavigateStore((state) => state.setTargetSection);
  const animation = useNavigateStore((state) => state.animation);
  const setAnimation = useNavigateStore((state) => state.setAnimation);
  const focus = useNavigateStore((state) => state.focus);
  const setFocus = useNavigateStore((state) => state.setFocus);

  const moveCharacter = useMoveCharacter();

  const projectTextureFiles = projects.map((project) => project.texture);
  const projectImageFiles = projects.map((project) => project.image);
  const projectTextures = useLoader(THREE.TextureLoader, projectTextureFiles);
  const projectImages = useLoader(THREE.TextureLoader, projectImageFiles);
  const { width, height } = useThree((state) => state.size);

  // some math, 25 at < 500px width, 23 at > 1080px width, otherwise linearly interpolate between
  // y = mx + b
  // pos = -(2/(1080-500)*width) + 25
  // pos = -width/290 + 25
  // pos = -(width - 500)/290 + 25, shift to start moving at width 500
  const portalPosition = width < 500 ? 25 : width > 1080 ? 23 : -(width - 500) / 290 + 25;
  const rotation = [0, Math.PI / 6, 0];

  // const cameraInitialPosition =
  // const { cameraPosition, lookAtPosition } = useControls("camera", {
  //   cameraPosition: { value: [0.0, 3.4, 6.3], step: 0.1 },
  //   lookAtPosition: { value: [0.0, 1.6, -8.3], step: 0.1 },
  // });

  // function getFirstDigit(num) {
  //   return parseInt(num, 10);
  // }

  // useFrame((state, delta) => {
  //   // const maxWidth = 125;
  //   // state.camera.position.copy(new THREE.Vector3(data.offset * maxWidth, 4.4, 6.3));
  //   // state.camera.lookAt(new THREE.Vector3(0.0 + data.offset * maxWidth, 2.6, -8.3));
  //   // set appropriate section if currPos +- range matches;
  //   // const currPos = data.offset * (maxSections - 1);
  //   // const firstDigit = getFirstDigit(currPos);
  //   // const range = 0.25;
  //   // if (getFirstDigit(currPos + range) > firstDigit) {
  //   //   setCurrSection(getFirstDigit(currPos + range));
  //   // } else if (getFirstDigit(currPos - range) < firstDigit) {
  //   //   setCurrSection(firstDigit);
  //   // } else {
  //   //   setCurrSection(null);
  //   // }
  // });

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
  }, [currentSection, targetSection, moveCharacter]);

  return (
    <>
      {/* <color attach="background" args={["white"]} /> */}
      <ambientLight intensity={1} />
      <Avatar />
      {projects.map((project, i) => {
        return (
          <group key={i} position={[portalPosition + 25 * (i - 1), 0, -3]}>
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
      <Floor />
      <BakeShadows />
    </>
  );
}
