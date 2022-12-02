import { useControls } from "leva";
import {
  useHelper,
  RandomizedLight,
  AccumulativeShadows,
  Scroll,
  ScrollControls,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import Floor from "./Floor";
import GlassPortal from "./GlassPortal";
import Portal from "./Portal";

import * as THREE from "three";
import "./style.css";

export default function Scene() {
  const directionalLight = useRef();

  const { cameraPosition, lookAtPosition } = useControls("camera", {
    cameraPosition: { value: [0.0, 4.4, 6.3], step: 0.1 },
    lookAtPosition: { value: [0.0, 2.6, -8.3], step: 0.1 },
  });

  useFrame((state, delta) => {
    state.camera.position.copy(
      new THREE.Vector3(cameraPosition[0], cameraPosition[1], cameraPosition[2])
    );
    state.camera.lookAt(new THREE.Vector3(lookAtPosition[0], lookAtPosition[1], lookAtPosition[2]));
    console.log(state.camera);
  });

  useHelper(directionalLight, THREE.DirectionalLightHelper, 1);
  return (
    <>
      <ScrollControls horizontal damping={4} pages={4}>
        <Scroll>
          <color attach="background" args={["white"]} />
          {/* <pointLight position={[-20, 10, 25]} /> */}
          <AccumulativeShadows position={[0, 0.001, 0]} opacity={0.5}>
            <RandomizedLight
              position={[0, 4, 10]}
              amount={6}
              radius={20}
              ambient={0.5}
              intensity={1}
              bias={0.01}
            />
          </AccumulativeShadows>
          <ambientLight intensity={1} />
          {/* <Portal portalPosition={[0, 0.5, 0]} />
      <Portal portalPosition={[0, 0.5, -20]} />
      <Portal portalPosition={[0, 0.5, -40]} />
    <Portal portalPosition={[0, 0.5, -60]} /> */}
          {/* <gridHelper args={[50, 50, "#4D089A", "#4D089A"]} position={[0, 0, 0]} /> */}
          <GlassPortal position={[0, 0, 0]} rotation={[0, Math.PI / 6, 0]} />
          <Floor />
        </Scroll>
      </ScrollControls>
    </>
  );
}
