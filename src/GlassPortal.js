import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";
import Glass from "./Glass";

export default function GlassPortal({ position, rotation }) {
  return (
    <group>
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
      <group position={position} rotation={rotation}>
        <Glass position={[0, 3, -0.4]} scale={[1.21, 1.136, 1]} />
        <Glass position={[0, 3, -0.2]} scale={[1.1, 1.066, 1]} />
        <Glass position={[0, 3, 0]} scale={1} />
      </group>
    </group>
  );
}
