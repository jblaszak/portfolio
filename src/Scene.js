import { Scroll, ScrollControls } from "@react-three/drei";
import Floor from "./Floor";
import GlassPortal from "./GlassPortal";
import Main from "./Interface/Main";
import "./style.css";

// import { useControls } from "leva";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";

export default function Scene() {
  // const { cameraPosition, lookAtPosition } = useControls("camera", {
  //   cameraPosition: { value: [0.0, 4.4, 6.3], step: 0.1 },
  //   lookAtPosition: { value: [0.0, 2.6, -8.3], step: 0.1 },
  // });

  // useFrame((state, delta) => {
  //   state.camera.position.copy(
  //     new THREE.Vector3(cameraPosition[0], cameraPosition[1], cameraPosition[2])
  //   );
  //   state.camera.lookAt(
  //     new THREE.Vector3(lookAtPosition[0] + cameraPosition[0], lookAtPosition[1], lookAtPosition[2])
  //   );
  //   console.log(state.camera);
  // });

  return (
    <>
      <ScrollControls horizontal damping={4} pages={4}>
        <color attach="background" args={["white"]} />
        <ambientLight intensity={1} />
        <Scroll>
          <GlassPortal position={[0, 0, 0]} rotation={[0, Math.PI / 6, 0]} />
        </Scroll>
        <Floor />
        <Scroll html>
          <Main />
        </Scroll>
      </ScrollControls>
    </>
  );
}
