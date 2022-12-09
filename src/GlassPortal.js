// import { RandomizedLight } from "@react-three/drei";
import Glass from "./Glass";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useControls } from "leva";

export default function GlassPortal({ position, rotation }) {
  const lightRef = useRef();
  const portalRef = useRef();

  // const { near, far, top, right, bottom, left } = useControls("camera", {
  //   near: {
  //     value: 1,
  //     min: 0,
  //     max: 10,
  //     step: 0.1,
  //     onChange: (x) => {
  //       lightRef.current.shadow.camera.near = x;
  //       lightRef.current.shadow.camera.updateProjectionMatrix();
  //     },
  //   },
  //   far: {
  //     value: 100,
  //     min: 10,
  //     max: 200,
  //     step: 1,
  //     onChange: (x) => {
  //       lightRef.current.shadow.camera.far = x;
  //       lightRef.current.shadow.camera.updateProjectionMatrix();
  //     },
  //   },
  //   top: {
  //     value: 8,
  //     min: 1,
  //     max: 20,
  //     step: 0.1,
  //     onChange: (x) => {
  //       lightRef.current.shadow.camera.top = x;
  //       lightRef.current.shadow.camera.updateProjectionMatrix();
  //     },
  //   },
  //   right: {
  //     value: 4,
  //     min: 1,
  //     max: 20,
  //     step: 0.1,
  //     onChange: (x) => {
  //       lightRef.current.shadow.camera.right = x;
  //       lightRef.current.shadow.camera.updateProjectionMatrix();
  //     },
  //   },
  //   bottom: {
  //     value: -1,
  //     min: -20,
  //     max: -1,
  //     step: 0.1,
  //     onChange: (x) => {
  //       lightRef.current.shadow.camera.bottom = x;
  //       lightRef.current.shadow.camera.updateProjectionMatrix();
  //     },
  //   },
  //   left: {
  //     value: -4,
  //     min: -20,
  //     max: -1,
  //     step: 0.1,
  //     onChange: (x) => {
  //       lightRef.current.shadow.camera.left = x;
  //       lightRef.current.shadow.camera.updateProjectionMatrix();
  //     },
  //   },
  // });

  useEffect(() => {
    lightRef.current.target = portalRef.current;
  }, []);

  return (
    <>
      <group ref={portalRef} position={position}>
        <directionalLight
          ref={lightRef}
          castShadow
          position={[0, 5, 5]}
          intensity={0}
          target={portalRef.current}
          shadow-bias={-0.0005}
          shadow-mapSize={[512, 512]}
          shadow-camera-near={1.0}
          shadow-camera-far={90}
          shadow-camera-top={6.4}
          shadow-camera-right={5.1}
          shadow-camera-bottom={-1.0}
          shadow-camera-left={-4.8}
          // shadow-camera-near={near}
          // shadow-camera-far={far}
          // shadow-camera-top={top}
          // shadow-camera-right={right}
          // shadow-camera-bottom={bottom}
          // shadow-camera-left={left}
        />
        <group rotation={rotation}>
          <Glass position={[0, 3, -0.4]} scale={[1.21, 1.136, 1]} />
          <Glass position={[0, 3, -0.2]} scale={[1.1, 1.066, 1]} />
          <Glass position={[0, 3, 0]} scale={1} />
        </group>
      </group>
      {/* <BakeShadows /> */}
    </>
  );
}
