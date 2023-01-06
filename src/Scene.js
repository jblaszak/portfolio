// import { BakeShadows, Scroll, softShadows, useScroll, useContextBridge } from "@react-three/drei";
import { BakeShadows, Scroll, useScroll, useContextBridge } from "@react-three/drei";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { ActiveProjectContext } from "./ActiveProjectContext";
import { CanvasContext } from "./CanvasContext";
import { VideoContext } from "./VideoContext";
import { useContext, useEffect } from "react";
import * as THREE from "three";
import ppc from "./assets/ppc.png";
import ppc_small from "./assets/ppc_xsmall.png";
import qoor from "./assets/qoor.png";
import qoor_small from "./assets/qoor_xsmall.png";
import cfp from "./assets/cfp.png";
import cfp_small from "./assets/cfp_xsmall.png";
import starship from "./assets/starship.png";
import starship_small from "./assets/starship_xsmall.png";

import Floor from "./Floor";
import GlassPortal from "./GlassPortal";
import Main from "./Interface/Main";

import "./style.css";
import Particles from "./Particles";

export default function Scene() {
  const [
    ppcTexture,
    ppcImage,
    qoorTexture,
    qoorImage,
    cfpTexture,
    cfpImage,
    starshipTexture,
    starshipImage,
  ] = useLoader(THREE.TextureLoader, [
    ppc_small,
    ppc,
    qoor_small,
    qoor,
    cfp_small,
    cfp,
    starship_small,
    starship,
  ]);
  const { width } = useThree((state) => state.size);
  const { setWidth, setScrollElement } = useContext(CanvasContext);
  const ContextBridge = useContextBridge(CanvasContext, VideoContext, ActiveProjectContext);
  const data = useScroll();
  const { activeProject, setActiveProject } = useContext(ActiveProjectContext);

  const projects = [
    { min: width * 0.9, max: width * 1.15, texture: ppcTexture, image: ppcImage },
    { min: width * 1.9, max: width * 2.15, texture: cfpTexture, image: cfpImage },
    { min: width * 2.9, max: width * 3.15, texture: starshipTexture, image: starshipImage },
    { min: width * 3.9, max: width * 4.15, texture: qoorTexture, image: qoorImage },
  ];

  // some math, 25 at < 500px width, 23 at > 1080px width, otherwise linearly interpolate between
  // y = mx + b
  // pos = -(2/(1080-500)*width) + 25
  // pos = -width/290 + 25
  // pos = -(width - 500)/290 + 25, shift to start moving at width 500
  const portalPosition = width < 500 ? 25 : width > 1080 ? 23 : -(width - 500) / 290 + 25;
  const rotation = [0, Math.PI / 6, 0];

  useEffect(() => {
    setWidth(width);
    setScrollElement(data.el);
  }, [width, data.el, setWidth, setScrollElement]);

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
          <group key={i} position={[portalPosition + 25 * i, 0, 0]} rotation={rotation}>
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
      <BakeShadows />
      <Scroll html>
        <ContextBridge>
          <Main />
        </ContextBridge>
      </Scroll>
    </>
  );
}

// softShadows();
