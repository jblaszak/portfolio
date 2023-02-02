import Glass from "./Glass";
import { useLoader } from "@react-three/fiber";
import shadowImage from "./assets/portal_shadow.jpg";
import { useRef } from "react";
import * as THREE from "three";

export default function GlassPortal({ position, image }) {
  const shadowTexture = useLoader(THREE.TextureLoader, shadowImage);
  const portalRef = useRef();

  const planeSize = [4, 6, 0.2];

  return (
    <>
      <group ref={portalRef} position={position}>
        <mesh position={[-4.5, -0.001, -15]} scale={[14, 30, 1]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry />
          <meshStandardMaterial
            color={"black"}
            alphaMap={shadowTexture}
            opacity={0.25}
            transparent
          />
        </mesh>
        <Glass position={[0, 3.3, -0.4]} scale={[1.21, 1.1, 1]} planeSize={planeSize} />
        <Glass position={[0, 3.15, -0.2]} scale={[1.1, 1.05, 1]} planeSize={planeSize} />
        <Glass position={[0, 3, 0]} scale={1} planeSize={planeSize} />
      </group>
    </>
  );
}
