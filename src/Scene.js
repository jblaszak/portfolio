import { Scroll, softShadows, useScroll } from "@react-three/drei";

import Floor from "./Floor";
import GlassPortal from "./GlassPortal";
import Main from "./Interface/Main";

import "./style.css";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Scene() {
  const data = useScroll();
  // const cameraInitialPosition =
  // const { cameraPosition, lookAtPosition } = useControls("camera", {
  //   cameraPosition: { value: [0.0, 4.4, 6.3], step: 0.1 },
  //   lookAtPosition: { value: [0.0, 2.6, -8.3], step: 0.1 },
  // });

  useFrame((state, delta) => {
    state.camera.position.copy(new THREE.Vector3(data.offset * 110, 4.4, 6.3));
    state.camera.lookAt(new THREE.Vector3(0.0 + data.offset * 110, 2.6, -8.3));
    // console.log(state.camera);
  });

  return (
    <>
      {/* <OrbitControls makeDefault /> */}

      <color attach="background" args={["white"]} />
      <ambientLight intensity={1} />
      <GlassPortal position={[23, 0, 0]} rotation={[0, Math.PI / 6, 0]} />
      <GlassPortal position={[41.5, 0, 0]} rotation={[0, Math.PI / 6, 0]} />
      <GlassPortal position={[63, 0, 0]} rotation={[0, Math.PI / 6, 0]} />
      <GlassPortal position={[84.5, 0, 0]} rotation={[0, Math.PI / 6, 0]} />
      <Floor />
      <Scroll html>
        <Main />
      </Scroll>
      {/* </ScrollControls> */}
    </>
  );
}

softShadows();
