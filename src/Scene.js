import Floor from "./Floor";
import GlassPortal from "./GlassPortal";
import Portal from "./Portal";
import { useHelper, RandomizedLight, AccumulativeShadows } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import "./style.css";

export default function Scene() {
  const directionalLight = useRef();

  useHelper(directionalLight, THREE.DirectionalLightHelper, 1);
  return (
    <>
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
      <GlassPortal position={[0, 0, 0]} />
      <Floor />
    </>
  );
}
