import { Scroll, softShadows, useScroll, useContextBridge } from "@react-three/drei";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { ActiveProject, ActiveProjectContext } from "./ActiveProjectContext";
import { CanvasContext } from "./CanvasContext";
import { VideoContext } from "./VideoContext";
import { useContext, useEffect, useState } from "react";
import * as THREE from "three";
import ppc_small from "./assets/ppc_small.png";
import ppc from "./assets/ppc.png";

import Floor from "./Floor";
import GlassPortal from "./GlassPortal";
import Main from "./Interface/Main";

import "./style.css";
import Particles from "./Particles";

export default function Scene() {
  const [ppcTexture, ppcImage] = useLoader(THREE.TextureLoader, [ppc_small, ppc]);
  const { width, height } = useThree((state) => state.size);
  const { setWidth, setHeight, setScrollElement } = useContext(CanvasContext);
  const ContextBridge = useContextBridge(CanvasContext, VideoContext, ActiveProjectContext);
  const data = useScroll();
  const { activeProject, setActiveProject } = useContext(ActiveProjectContext);

  const rotation = [0, Math.PI / 6, 0];

  const projects = [
    { min: width * 0.9, max: width * 1.15, texture: ppcTexture, image: ppcImage },
    { min: width * 1.9, max: width * 2.15, texture: ppcTexture, image: ppcImage },
    { min: width * 2.9, max: width * 3.15, texture: ppcTexture, image: ppcImage },
    { min: width * 3.9, max: width * 4.15, texture: ppcTexture, image: ppcImage },
  ];

  useEffect(() => {
    setWidth(width);
    setHeight(height);
    setScrollElement(data.el);
  }, [width, height]);

  // const cameraInitialPosition =
  // const { cameraPosition, lookAtPosition } = useControls("camera", {
  //   cameraPosition: { value: [0.0, 4.4, 6.3], step: 0.1 },
  //   lookAtPosition: { value: [0.0, 2.6, -8.3], step: 0.1 },
  // });

  function getActiveProject(pos) {
    for (let i = 0; i < projects.length; i++) {
      if (pos > projects[i].min && pos < projects[i].max) return i + 1;
    }
    return null;
  }

  useFrame((state, delta) => {
    const maxWidth = 125;
    state.camera.position.copy(new THREE.Vector3(data.offset * maxWidth, 4.4, 6.3));
    state.camera.lookAt(new THREE.Vector3(0.0 + data.offset * maxWidth, 2.6, -8.3));

    const active = getActiveProject(data.el.scrollLeft);
    if (active !== activeProject) {
      setActiveProject(active);
    }
  });

  return (
    <>
      <color attach="background" args={["white"]} />
      <ambientLight intensity={1} />
      {projects.map((project, i) => {
        return (
          <group key={i} position={[23 + 25 * i, 0, 0]} rotation={rotation}>
            <Particles
              position={[0, 3, 0.101]}
              texture={project.texture}
              image={project.image}
              index={i + 1}
            />
            <GlassPortal />
          </group>
        );
      })}
      <Floor />
      <Scroll html>
        <ContextBridge>
          <Main width={width} scrollElement={data.el} />
        </ContextBridge>
      </Scroll>
    </>
  );
}

softShadows();
