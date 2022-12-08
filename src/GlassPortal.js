// import { RandomizedLight } from "@react-three/drei";
import Glass from "./Glass";
import { BakeShadows, useHelper } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useRef } from "react";

export default function GlassPortal({ position, rotation }) {
  const lightRef = useRef();
  const portalRef = useRef();
  useHelper(lightRef, THREE.DirectionalLightHelper, 1);

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
          shadow-camera-near={1}
          shadow-camera-far={100}
          shadow-camera-top={8}
          shadow-camera-right={4}
          shadow-camera-bottom={-1}
          shadow-camera-left={-4}
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
