import { Scroll, softShadows, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { CanvasContext } from "./CanvasContext";
import { useContext, useEffect, useState } from "react";
import * as THREE from "three";

import Floor from "./Floor";
import GlassPortal from "./GlassPortal";
import Main from "./Interface/Main";

import "./style.css";

export default function Scene() {
  const { width, height } = useThree((state) => state.size);
  const { setWidth, setHeight, setScrollElement } = useContext(CanvasContext);
  const data = useScroll();
  const [activeProject, setActiveProject] = useState(null);

  const projectArray = [
    { num: 1, min: width, max: width * 1.25 },
    { num: 2, min: width * 2, max: width * 2.25 },
    { num: 3, min: width * 3, max: width * 3.25 },
    { num: 4, min: width * 4, max: width * 4.25 },
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
    for (const project of projectArray) {
      if (pos > project.min && pos < project.max) return project.num;
    }
    return null;
  }

  useFrame((state, delta) => {
    const maxWidth = 125;
    state.camera.position.copy(new THREE.Vector3(data.offset * maxWidth, 4.4, 6.3));
    state.camera.lookAt(new THREE.Vector3(0.0 + data.offset * maxWidth, 2.6, -8.3));

    const active = getActiveProject(data.el.scrollLeft);
    if (active !== activeProject) setActiveProject(active);
  });

  return (
    <>
      {/* <OrbitControls makeDefault /> */}
      <color attach="background" args={["white"]} />
      <ambientLight intensity={1} />
      <GlassPortal position={[23, 0, 0]} rotation={[0, Math.PI / 6, 0]} />
      <GlassPortal position={[48, 0, 0]} rotation={[0, Math.PI / 6, 0]} />
      <GlassPortal position={[73, 0, 0]} rotation={[0, Math.PI / 6, 0]} />
      <GlassPortal position={[98, 0, 0]} rotation={[0, Math.PI / 6, 0]} />
      <Floor />
      <Scroll html>
        <Main activeProject={activeProject} />
      </Scroll>
    </>
  );
}

softShadows();
