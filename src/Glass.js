import { useState } from "react";
import { useSpring, a } from "@react-spring/three";

export default function Glass({ position, scale, planeSize }) {
  const [hovered, setHovered] = useState(false);
  const { color } = useSpring({ color: hovered ? "#B9FFBE" : "lightblue" });

  return (
    <mesh
      scale={scale}
      position={position}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
    >
      <boxGeometry args={planeSize} />
      {/* THIS MATERIAL CAUSES INITIAL LAG SPIKE WHEN FIRST ENTERING SCREEN */}
      {/* <a.meshStandardMaterial roughness={1} transparent opacity={0.6} color={color} /> */}
      <a.meshBasicMaterial roughness={1} transparent opacity={0.4} color={color} />
    </mesh>
  );
}
