import { useEffect, useState } from "react";
import { BakeShadows } from "@react-three/drei";
import { useThree, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import useNavigateStore from "./stores/useNavigate";
import useMoveCharacter from "./hooks/useMoveCharacter";
import { projects } from "./data";
import { INITIAL_CAMERA_POSITION, INITIAL_CAMERA_LOOKAT, PORTAL_SEPARATION } from "./constants";

import Card from "./Card";
import Avatar from "./Avatar";
import Floor from "./Floor";
import GlassPortal from "./GlassPortal";
import Particles from "./Particles";

import "./style.css";

export default function Scene() {
  const currentSection = useNavigateStore((state) => state.currentSection);
  const targetSection = useNavigateStore((state) => state.targetSection);
  const setTargetSection = useNavigateStore((state) => state.setTargetSection);
  const avatar = useNavigateStore((state) => state.avatar);
  const focus = useNavigateStore((state) => state.focus);
  const setFocus = useNavigateStore((state) => state.setFocus);

  const moveCharacter = useMoveCharacter();

  const projectTextureFiles = projects.map((project) => project.texture);
  const projectImageFiles = projects.map((project) => project.image);
  const projectTextures = useLoader(THREE.TextureLoader, projectTextureFiles);
  const projectImages = useLoader(THREE.TextureLoader, projectImageFiles);
  const { width, height } = useThree((state) => state.size);

  const rotation = [0, Math.PI / 6, 0];

  // Seems stupid to declare things like this but if you use the actual vector in the useFrame below,
  // the lerp function changes INITIAL_CAMERA variables :(
  const [initialCameraX, initialCameraY, initialCameraZ] = [...INITIAL_CAMERA_POSITION];
  const [initialLookAtX, initialLookAtY, initialLookAtZ] = [...INITIAL_CAMERA_LOOKAT];

  const [smoothedCameraPosition] = useState(
    () => new THREE.Vector3(initialCameraX, initialCameraY, initialCameraZ)
  );
  const [smoothedLookAtPosition] = useState(
    () => new THREE.Vector3(initialLookAtX, initialLookAtY, initialLookAtZ)
  );

  useFrame((state, delta) => {
    if (!avatar.current) return;

    const cameraPositionTarget = new THREE.Vector3();
    cameraPositionTarget.copy(avatar.current.position);
    cameraPositionTarget.x += initialCameraX;
    cameraPositionTarget.y += initialCameraY;
    cameraPositionTarget.z += initialCameraZ;

    const lookAtPositionTarget = new THREE.Vector3();
    lookAtPositionTarget.copy(avatar.current.position);
    lookAtPositionTarget.x += initialLookAtX;
    lookAtPositionTarget.y += initialLookAtY;
    lookAtPositionTarget.z += initialLookAtZ;

    smoothedCameraPosition.lerp(cameraPositionTarget, 20 * delta);
    smoothedLookAtPosition.lerp(lookAtPositionTarget, 20 * delta);
    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedLookAtPosition);
  });

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
      <Floor />
      <BakeShadows />
    </>
  );
}
