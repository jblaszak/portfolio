import { BakeShadows, useContextBridge } from "@react-three/drei";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { SectionContext } from "./SectionContext";
import { useContext } from "react";
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
  const { setCurrSection, targetSection } = useContext(SectionContext);
  const { width, height } = useThree((state) => state.size);

  const projects = [
    { texture: ppcTexture, image: ppc },
    { texture: cfpTexture, image: cfpImage },
    { texture: starshipTexture, image: starshipImage },
    { texture: qoorTexture, image: qoorImage },
  ];

  const maxSections = projects.length + 2;

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

  useFrame((state, delta) => {
    // const maxWidth = 125;
    // state.camera.position.copy(new THREE.Vector3(data.offset * maxWidth, 4.4, 6.3));
    // state.camera.lookAt(new THREE.Vector3(0.0 + data.offset * maxWidth, 2.6, -8.3));
    // set appropriate section if currPos +- range matches;
    // const currPos = data.offset * (maxSections - 1);
    // const firstDigit = getFirstDigit(currPos);
    // const range = 0.25;
    // if (getFirstDigit(currPos + range) > firstDigit) {
    //   setCurrSection(getFirstDigit(currPos + range));
    // } else if (getFirstDigit(currPos - range) < firstDigit) {
    //   setCurrSection(firstDigit);
    // } else {
    //   setCurrSection(null);
    // }
  });

  return (
    <>
      <color attach="background" args={["white"]} />
      <ambientLight intensity={1} />
      {projects.map((project, i) => {
        return (
          <group key={i} position={[portalPosition + 25 * (i - 1), 0, -3]} rotation={rotation}>
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
    </>
  );
}
